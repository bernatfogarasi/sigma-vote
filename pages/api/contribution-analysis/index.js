import connect from "database/connect";
import ContributionAnalysis from "models/ContributionAnalysis";
const bcrypt = require("bcrypt");
const crypto = require("crypto");
import fs from "fs";
import { SMTPClient } from "emailjs";
import { shuffle } from "utils/algorithms";

connect();

const GET = async (request, response) => {
  const { id, voterId, token } = request.query;

  try {
    var { voters } = await ContributionAnalysis.findById(id);
  } catch (error) {
    return response.status(400).send({ message: "Your id is not valid." });
  }

  const voter = voters.find(({ _id }) => _id.toString() === voterId);
  if (!voter)
    return response
      .status(404)
      .send({ message: "You were not invited to this poll." });

  const match = await bcrypt.compare(token, voter.hash);
  if (!match)
    return response
      .status(403)
      .send({ message: "Your token is not valid. Please check the URL." });

  if (voter.voted)
    return response.status(403).send({ message: "You have already voted." });

  voters = shuffle(voters)
    .filter(({ _id }) => _id.toString() !== voterId)
    .map(({ _id, name }) => ({ _id, name }));

  console.log(voter);

  response.send({ voters });
};

const POST = async (request, response) => {
  var { voters, title, description } = request.body;

  try {
    if (!voters?.length)
      return response
        .status(400)
        .send({ message: "No voters were specified." });

    voters = shuffle(voters);

    voters = await Promise.all(
      voters.map(async (voter) => {
        const token = crypto.randomBytes(20).toString("hex");
        const privateId = crypto.randomBytes(10).toString("hex");
        console.log(token);
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(token, salt);
        console.log(hash);
        return { ...voter, hash, token, privateId };
      })
    );

    var contributionAnalysis = new ContributionAnalysis({
      title,
      description,
      voters: voters.map(({ email, name, hash, privateId }) => ({
        email,
        name,
        hash,
        privateId,
      })),
    });

    contributionAnalysis = await contributionAnalysis.save();

    const path = require("path");

    const htmlPath = path.resolve(process.cwd(), "public/email.html");

    var html = fs.readFileSync(htmlPath, "utf-8");

    const client = new SMTPClient({
      user: process.env.EMAIL_ADDRESS,
      password: process.env.EMAIL_PASSWORD,
      // host: "smtp.gmail.com",
      host: "smtp.gmail.com",
      // ssl: true,
      tls: true,
      authentication: "PLAIN",
    });

    const { id, voters: votersSaved } = contributionAnalysis;
    const base = `${request.headers.origin}/contribution-analysis/`;

    await Promise.all(
      voters.map(async ({ email, name, token }, index) => {
        console.log("test-loop");
        const queryString = new URLSearchParams({
          id,
          voterId: votersSaved[index]._id,
          token,
        });

        try {
          const message = await client.sendAsync({
            from: `SigmaVote <${email}>`,
            to: email,
            subject: `Voting invitation for ${name}`,
            attachment: [
              {
                data: html
                  .replaceAll("[URL_VOTE]", `${base}vote?${queryString}`)
                  .replaceAll("[URL_RESULTS]", `${base}results?${queryString}`)
                  .replaceAll("[TITLE]", title)
                  .replaceAll("[DESCRIPTION]", description)
                  .replaceAll("[NAME]", name),
                alternative: true,
              },
            ],
          });
        } catch (error) {
          return response
            .status(500)
            .send({ message: "Could not send email.", error });
        }
      })
    );
  } catch (error) {
    return response
      .status(500)
      .send({ message: "Unknown error", error: { error, html } });
  }

  response.json({ message: "Poll created successfully." });
};

const handler = async (request, response) => {
  await { GET, POST }[request.method](request, response);
};

export default handler;

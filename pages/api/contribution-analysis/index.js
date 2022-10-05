import connect from "database/connect";
import ContributionAnalysis from "models/ContributionAnalysis";
import { shuffle } from "utils/algorithms";

const bcrypt = require("bcrypt");
const crypto = require("crypto");
const SibApiV3Sdk = require("sib-api-v3-sdk");

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

  return response.send({ voters });
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

    const defaultClient = SibApiV3Sdk.ApiClient.instance;
    var apiKey = defaultClient.authentications["api-key"];
    apiKey.apiKey = process.env.SENDINBLUE_API_KEY;
    var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
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
          await apiInstance.sendTransacEmail({
            to: [{ email }],
            templateId: 1,
            params: {
              "{name}": name,
              "{title}": title,
              "{description}": description,
              "{url_vote}": `${base}vote?${queryString}`,
              "{url_results}": `${base}results?${queryString}`,
            },
          });
        } catch (error) {
          console.log(error);
          return response
            .status(500)
            .send({ message: "Could not send email.", error });
        }
      })
    );
  } catch (error) {
    console.log(error);
    return response.status(500).send({ message: "Unknown error", error });
  }

  return response.json({ message: "Poll created successfully." });
};

const handler = async (request, response) => {
  return await { GET, POST }[request.method](request, response);
};

export default handler;

import connect from "database/connect";
import ContributionAnalysis from "models/ContributionAnalysis";
const bcrypt = require("bcrypt");

connect();

const POST = async (request, response) => {
  const votes = request.body;

  const { id, voterId, token } = request.query;

  const contributionAnalysis = await ContributionAnalysis.findById(id);

  var { voters } = contributionAnalysis;

  const voter = voters.find(({ _id }) => _id.toString() === voterId);
  if (!voter) return response.status(404).send({ message: "voter not found" });

  const match = await bcrypt.compare(token, voter.hash);
  if (!match) return response.status(403).send({ message: "token not valid" });

  if (voter.voted)
    return response.status(403).send({ message: "already voted" });

  Object.entries(votes).map(
    ([id, points]) =>
      (contributionAnalysis.voters.filter(
        ({ _id }) => _id.toString() === id
      )[0].points += points)
  );

  contributionAnalysis.voters.find(({ _id }) => _id === voter._id).voted = true;

  await contributionAnalysis.save();

  response.status(200).json({ message: "success" });
};

const handler = async (request, response) => {
  await { POST }[request.method](request, response);
};

export default handler;

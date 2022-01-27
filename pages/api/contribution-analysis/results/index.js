import connect from "database/connect";
import ContributionAnalysis from "models/ContributionAnalysis";
const bcrypt = require("bcrypt");

connect();

const GET = async (request, response) => {
  const votes = request.body;

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
      .send({ message: "Only participants can view the results. of a poll." });

  const match = await bcrypt.compare(token, voter.hash);
  if (!match)
    return response
      .status(403)
      .send({ message: "Your token is not valid. Please check the URL." });

  const votersNotVoted = voters.filter(({ voted }) => !voted);
  if (votersNotVoted?.length)
    return response.status(403).send({
      message: `Waiting for ${votersNotVoted?.length} more votes.`,
    });

  voters = voters.map(({ name, points }) => ({
    name,
    points,
  }));

  response.status(200).json({ voters });
};

const handler = async (request, response) => {
  await { GET }[request.method](request, response);
};

export default handler;

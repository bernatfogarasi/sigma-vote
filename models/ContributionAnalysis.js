const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  voters: [
    {
      privateId: { type: String, required: true },
      hash: { type: String, required: true },
      email: { type: String, required: true },
      name: { type: String, required: true },
      points: { type: Number, default: 0 },
      voted: { type: Boolean, default: false },
    },
  ],
  title: { type: String, required: true },
  description: { type: String },
});

module.exports =
  mongoose.models.ContributionAnalysis ||
  mongoose.model("ContributionAnalysis", schema);

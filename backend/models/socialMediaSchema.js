const mongoose = require("mongoose");

const socialMediaSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    date: Date,
    subreddit: String,
    text: String,
    url: String,
    flood_label: Number,
    lat: Number,
    lon: Number,
  },
  {
    collection: "Social_Media_Analysis",
    strict: false, // Allow fields not defined in schema
  }
);

module.exports = mongoose.model("SocialMedia", socialMediaSchema);

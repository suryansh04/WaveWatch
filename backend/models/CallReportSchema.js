const mongoose = require("mongoose");

const callReportSchema = new mongoose.Schema({
  reporterName: String,
  hazardType: String,
  location: String,
  description: String,
  source: { type: String, default: "phone-call" },
  createdAt: { type: Date, default: Date.now },
});

const CallReport = mongoose.model("CallReport", callReportSchema);
module.exports = CallReport;

const express = require("express");
const { check } = require("express-validator");

const router = express.Router();
const {
  getAllReports,
  getNearbyReports,
  updateVerificationStatus,
} = require("../controllers/reportController");

//Reports Route
router.route("/").get(getAllReports);
router.route("/verify/:id").patch(updateVerificationStatus);
module.exports = router;

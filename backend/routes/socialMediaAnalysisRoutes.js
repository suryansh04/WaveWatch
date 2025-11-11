const express = require("express");
const router = express.Router();
const {
  getSocialMediaPosts,
  getSocialMediaStats,
} = require("../controllers/socialMediaAnalysisController");
// SOS trigger: frontend calls this endpoint
router.get("/posts", getSocialMediaPosts);
router.get("/stats", getSocialMediaStats);
module.exports = router;

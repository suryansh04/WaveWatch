// routes/callReportRoutes.js
const express = require("express");
const router = express.Router();
const {
  getAllCallReports,
  getCallReportById,
  createCallReport,
  vapiWebhook,
} = require("../controllers/callReportController");

router.get("/reports", getAllCallReports);

router.get("/reports/:id", getCallReportById);

// Standard API to create a call report (manual)
router.post("/reports", createCallReport);

// Vapi will POST call/transcript data here
router.post("/webhook", vapiWebhook);

module.exports = router;

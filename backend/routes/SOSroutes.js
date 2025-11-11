const express = require("express");
const router = express.Router();
const { sosController } = require("../controllers/SOScontroller");
router.post("/sos", sosController);

module.exports = router;

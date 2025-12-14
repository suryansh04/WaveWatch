const CallReport = require("../models/CallReportSchema");

// Manual report (already there)
exports.createCallReport = async (req, res) => {
  try {
    const { name, hazardType, location, description } = req.body;

    const newReport = await CallReport.create({
      reporterName: name,
      hazardType,
      location,
      description,
      source: "phone-call",
    });

    res.status(201).json({ success: true, data: newReport });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

exports.getAllCallReports = async (req, res) => {
  try {
    const { hazardType } = req.query;
    const filter = {};

    if (hazardType) {
      // use case-insensitive regex match
      filter.hazardType = { $regex: new RegExp(hazardType, "i") };
    }

    const reports = await CallReport.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: reports });
  } catch (err) {
    console.error("Error fetching reports:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

exports.getCallReportById = async (req, res) => {
  try {
    const report = await CallReport.findById(req.params.id);
    if (!report)
      return res.status(404).json({ success: false, error: "Not found" });
    res.status(200).json({ success: true, data: report });
  } catch (err) {
    console.error("Error fetching report by id:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// exports.vapiWebhook = async (req, res) => {
//   try {
//     const event = req.body;
//     // console.log(event);
//     console.log(event.message.analysis);
//     const reporterName =
//       event.message.analysis.structuredData?.name || "Unknown";
//     const hazardType =
//       event.message.analysis.structuredData?.hazardType || "General";
//     const location =
//       event.message.analysis.structuredData?.location || "Unknown";
//     const description =
//       event.message.analysis.structuredData?.description ||
//       "No description provided";
//     const newReport = await CallReport.create({
//       reporterName: reporterName || "Unknown",
//       hazardType,
//       location,
//       description,
//       source: "phone-call",
//     });

//     // console.log("✅ Call Report saved:", newReport._id);
//     return res.status(201).json({ success: true });
//   } catch (err) {
//     console.error("❌ Webhook Error:", err);
//     return res.status(500).json({ success: false, error: err.message });
//   }
// };

// exports.vapiWebhook = async (req, res) => {
//   try {
//     const { type, call, timestamp } = req.body;

//     console.log(`Webhook received: ${type} at ${timestamp}`);

//     // Only process end-of-call-report events which contain the structured data
//     if (type === "call-ended") {
//       const event = req.body;

//       // Extract structured data from the analysis object
//       const structuredData = event.analysis?.structuredData || {};

//       const reporterName = structuredData.name || "Unknown";
//       const hazardType = structuredData.hazardType || "General";
//       const location = structuredData.location || "Unknown";
//       const description =
//         structuredData.description || "No description provided";

//       // Extract additional useful information
//       const phoneNumber = event.customer?.number || "Unknown";
//       const callDuration = event.durationSeconds || 0;
//       const transcript = event.transcript || "";
//       const recordingUrl = event.recordingUrl || "";

//       console.log("📊 Extracted Data:", {
//         reporterName,
//         hazardType,
//         location,
//         description,
//         phoneNumber,
//         callDuration,
//       });

//       // Save to database
//       const newReport = await CallReport.create({
//         reporterName,
//         hazardType,
//         location,
//         description,
//         source: "phone-call",
//         phoneNumber,
//         callDuration,
//         transcript,
//         recordingUrl,
//         callId: event.call?.id,
//       });

//       console.log("✅ Call Report saved:", newReport._id);

//       return res.status(201).json({
//         success: true,
//         reportId: newReport._id,
//         message: "Report saved successfully",
//       });
//     } else {
//       // For other webhook types, just acknowledge receipt
//       console.log(`ℹ️ Event type '${type}' - no action taken`);
//       return res.status(200).json({
//         success: true,
//         message: `Event '${type}' received`,
//       });
//     }
//   } catch (err) {
//     console.error("❌ Webhook Error:", err);
//     return res.status(500).json({
//       success: false,
//       error: err.message,
//     });
//   }
// };
exports.vapiWebhook = async (req, res) => {
  try {
    console.log("Webhook payload:", JSON.stringify(req.body, null, 2));

    // VAPI sends data nested under 'message' property
    const event = req.body.message || req.body;
    const type = event.type;
    const timestamp = event.timestamp;

    console.log(`Webhook received: ${type} at ${timestamp}`);

    // The correct event type is 'end-of-call-report' (not 'call-ended')
    if (type === "end-of-call-report") {
      // Extract structured data from the analysis object
      const structuredData = event.analysis?.structuredData || {};

      const reporterName = structuredData.name || "Unknown";
      const hazardType = structuredData.hazardType || "General";
      const location = structuredData.location || "Unknown";
      const description =
        structuredData.description || "No description provided";

      // Extract additional useful information
      // const phoneNumber = event.customer?.number || "Unknown";
      // const callDuration = event.durationSeconds || 0;
      // const transcript = event.transcript || "";
      // const recordingUrl = event.recordingUrl || "";

      console.log("📊 Extracted Data:", {
        reporterName,
        hazardType,
        location,
        description,
        // phoneNumber,
        // callDuration,
      });

      // Only save if we have meaningful data
      if (reporterName !== "Unknown" || hazardType !== "General") {
        const newReport = await CallReport.create({
          reporterName,
          hazardType,
          location,
          description,
          source: "phone-call",
          // phoneNumber,
          // callDuration,
          // transcript,
          // recordingUrl,
          // callId: event.call?.id,
        });

        console.log("✅ Call Report saved:", newReport._id);

        return res.status(201).json({
          success: true,
          reportId: newReport._id,
          message: "Report saved successfully",
        });
      } else {
        console.log("⚠️ No meaningful data to save (call ended too early)");
        return res.status(200).json({
          success: true,
          message: "Call ended without complete data",
        });
      }
    } else {
      // For other webhook types, just acknowledge receipt
      console.log(`ℹ️ Event type '${type}' - no action taken`);
      return res.status(200).json({
        success: true,
        message: `Event '${type}' received`,
      });
    }
  } catch (err) {
    console.error("❌ Webhook Error:", err);
    console.error("Error stack:", err.stack);
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

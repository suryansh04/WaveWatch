const axios = require("axios");

exports.sosController = async (req, res) => {
  try {
    const response = await axios.post(
      "https://api.vapi.ai/call",
      {
        assistantId: process.env.VAPI_ASSISTANT_ID,
        type: "outboundPhoneCall", // ✅ correct type
        phoneNumberId: process.env.VAPI_NUMBER_ID, // ✅ your Twilio/Vapi number ID
        customer: {
          number: process.env.MY_PHONE, // ✅ phone to call
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.VAPI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("📞 Outbound call started:", response.data);
    res.json({ success: true, callId: response.data.id });
  } catch (err) {
    console.error("❌ SOS Vapi error:", err.response?.data || err.message);
    res.status(500).json({ error: "Call initiation failed" });
  }
};

//------------------------------------------------------CHECK -------------------------------------------------------------------------------

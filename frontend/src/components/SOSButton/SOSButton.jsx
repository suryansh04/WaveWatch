import React, { useState } from "react";
import axios from "axios";

const SOSButton = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const triggerSOS = async () => {
    setLoading(true);
    setStatus("");
    try {
      const res = await axios.post(
        "https://f37e8bd39d0f.ngrok-free.app/call/sos" // your backend endpoint
      );
      setStatus("✅ SOS call triggered! Check your phone.");
      console.log("Call started:", res.data);
    } catch (err) {
      console.error("SOS Error:", err);
      setStatus("❌ Failed to start SOS call.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <button
        onClick={triggerSOS}
        disabled={loading}
        style={{
          backgroundColor: "#e63946",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          padding: "12px 24px",
          fontSize: "18px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        {loading ? "Calling..." : "🚨 SOS"}
      </button>
      {status && <p style={{ marginTop: "1rem" }}>{status}</p>}
    </div>
  );
};

export default SOSButton;

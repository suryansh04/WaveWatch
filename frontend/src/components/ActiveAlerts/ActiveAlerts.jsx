import React, { useState, useEffect } from "react";
import axios from "axios";
import { AlertTriangle, Clock, MapPin } from "lucide-react";
import "./ActiveAlerts.css";

const ActiveAlerts = () => {
  const [alertsData, setAlertsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  };

  // Function to map alert types and add severity
  const mapAlertData = (backendAlert) => {
    let severity;
    switch (backendAlert.type) {
      case "Red Alert":
        severity = "Warning";
        break;
      case "Orange Alert":
        severity = "Caution";
        break;
      case "Yellow Alert":
        severity = "Advisory";
        break;
      default:
        severity = "Warning";
    }

    return {
      id: backendAlert._id,
      type: backendAlert.type,
      severity: severity,
      title: backendAlert.title,
      date: formatDate(backendAlert.createdAt),
      location: backendAlert.location,
    };
  };

  // Fetch alerts from backend
  const fetchAlerts = async () => {
    try {
      setLoading(true);
      // Replace with your actual API endpoint
      const response = await axios.get("http://localhost:3000/alerts");

      if (response.data.success) {
        const mappedAlerts = response.data.data
          .filter((alert) => alert.isActive)
          .map(mapAlertData);
        setAlertsData(mappedAlerts);
      } else {
        setError("Failed to fetch alerts");
      }
    } catch (err) {
      setError("Error connecting to server");
      console.error("Error fetching alerts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();

    // Set up polling for real-time updates (every 30 seconds)
    const interval = setInterval(fetchAlerts, 30000);

    return () => clearInterval(interval);
  }, []);

  const getAlertStyles = (alertType) => {
    switch (alertType) {
      case "Red Alert":
        return {
          headerBg: "#dc2626",
          contentBg: "#fef2f2",
          iconColor: "#dc2626",
        };
      case "Orange Alert":
        return {
          headerBg: "#ea580c",
          contentBg: "#fff7ed",
          iconColor: "#ea580c",
        };
      case "Yellow Alert":
        return {
          headerBg: "#ca8a04",
          contentBg: "#fefce8",
          iconColor: "#ca8a04",
        };
      default:
        return {
          headerBg: "#dc2626",
          contentBg: "#fef2f2",
          iconColor: "#dc2626",
        };
    }
  };

  if (loading) {
    return (
      <div className="activeAlert-container">
        <h2 className="activeAlert-title">Active Alerts</h2>
        <div className="activeAlert-loading">Loading alerts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="activeAlert-container">
        <h2 className="activeAlert-title">Active Alerts</h2>
        <div className="activeAlert-error">{error}</div>
      </div>
    );
  }

  return (
    <div className="activeAlert-container">
      <h2 className="activeAlert-title">Active Alerts</h2>

      <div className="activeAlert-scrollContainer">
        {alertsData.length === 0 ? (
          <div className="activeAlert-empty">No active alerts</div>
        ) : (
          alertsData.map((alert) => {
            const styles = getAlertStyles(alert.type);

            return (
              <div key={alert.id} className="activeAlert-card">
                <div
                  className="activeAlert-header"
                  style={{ background: styles.headerBg }}
                >
                  <span className="activeAlert-badge">{alert.type}</span>
                </div>

                <div
                  className="activeAlert-content"
                  style={{ background: styles.contentBg }}
                >
                  <div className="activeAlert-iconTitle">
                    <AlertTriangle
                      className="activeAlert-warningIcon"
                      size={20}
                      style={{ color: styles.iconColor }}
                    />
                    <span
                      className="activeAlert-type"
                      style={{ color: styles.iconColor }}
                    >
                      {alert.severity}
                    </span>
                    <div className="activeAlert-time">
                      <Clock size={16} />
                      <span>{alert.date}</span>
                    </div>
                  </div>

                  <h3 className="activeAlert-alertTitle">{alert.title}</h3>

                  <div className="activeAlert-location">
                    <MapPin size={16} />
                    <span>{alert.location}</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ActiveAlerts;

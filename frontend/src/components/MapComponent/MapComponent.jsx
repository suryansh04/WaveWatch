import React, { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import "./MapComponent.css";

// Fix for default markers in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const MapComponent = () => {
  const mapRef = useRef(null);
  const leafletMapRef = useRef(null);
  const markersRef = useRef([]);

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const urgencyColors = {
    High: "#dc2626",
    Medium: "#f59e0b",
    Low: "#16a34a",
  };

  // Fetch reports from API
  const fetchReports = async () => {
    try {
      setLoading(true);
      // Replace with your actual API endpoint
      const response = await axios.get("http://localhost:3000/reports");
      setReports(response.data.reports || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching reports:", err);
      setError("Failed to fetch reports");
    } finally {
      setLoading(false);
    }
  };

  // Initialize map
  useEffect(() => {
    if (mapRef.current && !leafletMapRef.current) {
      leafletMapRef.current = L.map(mapRef.current).setView(
        [28.6139, 77.209], // Delhi coordinates as default
        10
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(leafletMapRef.current);
    }

    fetchReports();

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, []);

  // Create custom marker icon
  const createCustomIcon = (report) => {
    const color = urgencyColors[report.urgency] || "#6b7280";

    return L.divIcon({
      html: `
      <div class="pin-marker" style="color: ${color}">
        <svg width="24" height="32" viewBox="0 0 24 32" fill="currentColor">
          <path d="M12 0C5.373 0 0 5.373 0 12c0 9 12 20 12 20s12-11 12-20c0-6.627-5.373-12-12-12zm0 16c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z"/>
        </svg>
      </div>
    `,
      className: "custom-pin-icon",
      iconSize: [24, 32],
      iconAnchor: [12, 32],
    });
  };

  // Update markers on map
  useEffect(() => {
    if (!leafletMapRef.current) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => {
      leafletMapRef.current.removeLayer(marker);
    });
    markersRef.current = [];

    // Add individual markers with simple popup
    reports.forEach((report) => {
      if (report.location && report.location.coordinates) {
        const [lng, lat] = report.location.coordinates;
        const marker = L.marker([lat, lng], {
          icon: createCustomIcon(report),
        });

        // Simple popup without "See in Detail" button
        const popupContent = `
          <div class="marker-popup">
            <h3>${report.type}</h3>
            <p><strong>Urgency:</strong> <span class="urgency-${report.urgency.toLowerCase()}">${
          report.urgency
        }</span></p>
            <p><strong>Description:</strong> ${
              report.description || "No description available"
            }</p>
            <p><strong>Reported:</strong> ${new Date(
              report.reportedAt
            ).toLocaleString()}</p>
            <p><strong>Verified:</strong> ${
              report.isVerified ? "✅ Yes" : "❌ No"
            }</p>
            <p><strong>Report ID:</strong> ${report._id.slice(-8)}</p>
          </div>
        `;

        marker.bindPopup(popupContent);
        marker.addTo(leafletMapRef.current);
        markersRef.current.push(marker);
      }
    });

    // Auto-fit map to show all markers
    if (markersRef.current.length > 0) {
      const group = new L.featureGroup(markersRef.current);
      leafletMapRef.current.fitBounds(group.getBounds().pad(0.1));
    }
  }, [reports]);

  return (
    <div className="map-component">
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>Loading reports...</p>
        </div>
      )}

      {error && (
        <div className="error-overlay">
          <p>Error: {error}</p>
          <button onClick={fetchReports} className="retry-btn">
            Retry
          </button>
        </div>
      )}

      <div ref={mapRef} className="leaflet-map"></div>
    </div>
  );
};

export default MapComponent;

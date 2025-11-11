// import React from "react";
// import { FileText, Waves, Mountain, Zap } from "lucide-react";
// import "./StatsCards.css";

// const StatsCards = () => {
//   const statsData = [
//     {
//       title: "Verified Reports",
//       count: "100",
//       icon: FileText,
//       color: "#3b82f6",
//     },
//     {
//       title: "Unverified Reports",
//       count: "80",
//       icon: FileText,
//       color: "#3b82f6",
//     },

//     {
//       title: "Total Reports",
//       count: "150",
//       icon: FileText,
//       color: "#3b82f6",
//     },
//     {
//       title: "Tsunami",
//       count: "45",
//       icon: Waves,
//       color: "#06b6d4",
//     },
//     {
//       title: "High Waves",
//       count: "30",
//       icon: Mountain,
//       color: "#10b981",
//     },
//     {
//       title: "Storm Surge",
//       count: "20",
//       icon: Zap,
//       color: "#f59e0b",
//     },
//   ];

//   return (
//     <div className="stats-cards-container">
//       {statsData.map((stat, index) => (
//         <div key={index} className="stats-card">
//           <div className="stats-card-content">
//             <div className="stats-info">
//               <h3 className="stats-title">{stat.title}</h3>
//               <p className="stats-count">{stat.count}</p>
//             </div>
//             <div
//               className="stats-icon"
//               style={{ backgroundColor: `${stat.color}20`, color: stat.color }}
//             >
//               <stat.icon size={24} />
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default StatsCards;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FileText, Waves, Mountain, Zap } from "lucide-react";
import "./StatsCards.css";

const StatsCards = () => {
  const [statsData, setStatsData] = useState([
    {
      title: "Verified Reports",
      count: "0",
      icon: FileText,
      color: "#3b82f6",
    },
    {
      title: "Unverified Reports",
      count: "0",
      icon: FileText,
      color: "#3b82f6",
    },
    {
      title: "Total Reports",
      count: "0",
      icon: FileText,
      color: "#3b82f6",
    },
    {
      title: "Tsunami",
      count: "0",
      icon: Waves,
      color: "#06b6d4",
    },
    {
      title: "High Waves",
      count: "0",
      icon: Mountain,
      color: "#10b981",
    },
    {
      title: "Storm Surge",
      count: "0",
      icon: Zap,
      color: "#f59e0b",
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to calculate stats from reports
  const calculateStats = (reports) => {
    const verifiedCount = reports.filter((report) => report.isVerified).length;
    const unverifiedCount = reports.filter(
      (report) => !report.isVerified
    ).length;
    const totalCount = reports.length;

    // Count by type (case insensitive matching)
    const tsunamiCount = reports.filter((report) =>
      report.type.toLowerCase().includes("tsunami")
    ).length;

    const highWavesCount = reports.filter(
      (report) =>
        report.type.toLowerCase().includes("high waves") ||
        report.type.toLowerCase().includes("wave")
    ).length;

    const stormSurgeCount = reports.filter(
      (report) =>
        report.type.toLowerCase().includes("storm surge") ||
        report.type.toLowerCase().includes("surge") ||
        report.type.toLowerCase().includes("swell surges")
    ).length;

    return [
      {
        title: "Verified Reports",
        count: verifiedCount.toString(),
        icon: FileText,
        color: "#3b82f6",
      },
      {
        title: "Unverified Reports",
        count: unverifiedCount.toString(),
        icon: FileText,
        color: "#3b82f6",
      },
      {
        title: "Total Reports",
        count: totalCount.toString(),
        icon: FileText,
        color: "#3b82f6",
      },
      {
        title: "Tsunami",
        count: tsunamiCount.toString(),
        icon: Waves,
        color: "#06b6d4",
      },
      {
        title: "High Waves",
        count: highWavesCount.toString(),
        icon: Mountain,
        color: "#10b981",
      },
      {
        title: "Storm Surge",
        count: stormSurgeCount.toString(),
        icon: Zap,
        color: "#f59e0b",
      },
    ];
  };

  // Fetch reports from backend
  const fetchReports = async () => {
    try {
      setLoading(true);

      const response = await axios.get("http://localhost:3000/reports");

      if (response.data.reports) {
        const calculatedStats = calculateStats(response.data.reports);
        setStatsData(calculatedStats);
      } else {
        setError("Failed to fetch reports");
      }
    } catch (err) {
      setError("Error connecting to server");
      console.error("Error fetching reports:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();

    // Set up polling for real-time updates (every 30 seconds)
    const interval = setInterval(fetchReports, 30000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="stats-cards-container">
        {statsData.map((stat, index) => (
          <div key={index} className="stats-card stats-loading">
            <div className="stats-card-content">
              <div className="stats-info">
                <h3 className="stats-title">{stat.title}</h3>
                <p className="stats-count">...</p>
              </div>
              <div
                className="stats-icon"
                style={{
                  backgroundColor: `${stat.color}20`,
                  color: stat.color,
                }}
              >
                <stat.icon size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="stats-cards-container">
        <div className="stats-error">{error}</div>
      </div>
    );
  }

  return (
    <div className="stats-cards-container">
      {statsData.map((stat, index) => (
        <div key={index} className="stats-card">
          <div className="stats-card-content">
            <div className="stats-info">
              <h3 className="stats-title">{stat.title}</h3>
              <p className="stats-count">{stat.count}</p>
            </div>
            <div
              className="stats-icon"
              style={{ backgroundColor: `${stat.color}20`, color: stat.color }}
            >
              <stat.icon size={24} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;

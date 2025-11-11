// import React, { useState, useEffect } from "react";
// import {
//   Phone,
//   MapPin,
//   Clock,
//   AlertTriangle,
//   User,
//   FileText,
// } from "lucide-react";
// import "./CallReports.css";

// // If you want to override API base, define REACT_APP_API_URL in frontend .env
// const API_BASE = "http://localhost:3000/api/v1/callReports";

// const CallReports = () => {
//   const [reports, setReports] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [filter, setFilter] = useState("all");

//   // fetch from backend
//   const fetchReports = async (hazardType) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const url =
//         hazardType && hazardType !== "all"
//           ? `${API_BASE}/reports?hazardType=${encodeURIComponent(hazardType)}`
//           : `${API_BASE}/reports`;
//       const res = await fetch(url);
//       if (!res.ok) {
//         const body = await res.json().catch(() => ({}));
//         throw new Error(body.error || `HTTP ${res.status}`);
//       }
//       const json = await res.json();
//       setReports(json.data || []);
//     } catch (err) {
//       console.error("Fetch reports error:", err);
//       setError(err.message || "Failed to load reports");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // initial fetch & fetch on filter change
//   useEffect(() => {
//     // map simple filter keywords to hazard types stored in DB
//     const mapFilterToHazard = (f) => {
//       if (f === "tide") return "unusual tide";
//       if (f === "storm") return "storm surge";
//       if (f === "tsunami") return "tsunami";
//       if (f === "flooding") return "flooding";
//       return null;
//     };

//     const hazardType = mapFilterToHazard(filter);
//     fetchReports(hazardType);
//   }, [filter]);

//   const formatDate = (dateString) => {
//     try {
//       const date = new Date(dateString);
//       return date.toLocaleString("en-US", {
//         year: "numeric",
//         month: "short",
//         day: "numeric",
//         hour: "2-digit",
//         minute: "2-digit",
//       });
//     } catch {
//       return dateString || "-";
//     }
//   };

//   const getHazardTypeColor = (hazardType) => {
//     const colors = {
//       tsunami: "#dc2626",
//       "unusual tide": "#f59e0b",
//       "storm surge": "#7c3aed",
//       flooding: "#2563eb",
//       default: "#6b7280",
//     };
//     return colors[(hazardType || "").toLowerCase()] || colors.default;
//   };

//   const filteredReports = reports; // backend already filtered when requested

//   if (loading) {
//     return (
//       <div className="call-reports-container">
//         <div className="loading-state">
//           <div className="loading-spinner"></div>
//           <p>Loading call reports...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="call-reports-container">
//         <div className="error-state">
//           <AlertTriangle size={48} />
//           <h3>Error Loading Reports</h3>
//           <p>{error}</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="call-reports-container">
//       {/* Header */}
//       <div className="call-reports-header">
//         <div className="header-content">
//           <h1 className="page-title">Call Reports</h1>
//           <p className="page-subtitle">
//             Monitor emergency reports received via phone calls
//           </p>
//         </div>
//         <div className="header-stats">
//           <div className="stat-card">
//             <Phone className="stat-icon" />
//             <div className="stat-content">
//               <span className="stat-number">{reports.length}</span>
//               <span className="stat-label">Total Reports</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="filters-section">
//         <div className="filter-buttons">
//           <button
//             className={`filter-btn ${filter === "all" ? "active" : ""}`}
//             onClick={() => setFilter("all")}
//           >
//             All Reports
//           </button>
//           <button
//             className={`filter-btn ${filter === "tsunami" ? "active" : ""}`}
//             onClick={() => setFilter("tsunami")}
//           >
//             Tsunami
//           </button>
//           <button
//             className={`filter-btn ${filter === "tide" ? "active" : ""}`}
//             onClick={() => setFilter("tide")}
//           >
//             Tides
//           </button>
//           <button
//             className={`filter-btn ${filter === "storm" ? "active" : ""}`}
//             onClick={() => setFilter("storm")}
//           >
//             Storms
//           </button>
//           <button
//             className={`filter-btn ${filter === "flooding" ? "active" : ""}`}
//             onClick={() => setFilter("flooding")}
//           >
//             Flooding
//           </button>
//         </div>
//       </div>

//       {/* Reports List */}
//       <div className="reports-section">
//         {filteredReports.length === 0 ? (
//           <div className="empty-state">
//             <Phone size={64} className="empty-icon" />
//             <h3>No Call Reports Found</h3>
//             <p>No phone call reports match your current filter criteria.</p>
//           </div>
//         ) : (
//           <div className="reports-grid">
//             {filteredReports.map((report) => (
//               <div key={report._id} className="report-card">
//                 <div className="report-header">
//                   <div className="report-type">
//                     <div
//                       className="hazard-indicator"
//                       style={{
//                         backgroundColor: getHazardTypeColor(report.hazardType),
//                       }}
//                     />
//                     <span className="hazard-type">{report.hazardType}</span>
//                   </div>
//                   <div className="report-source">
//                     <Phone size={16} />
//                     <span>{report.source || "Phone Call"}</span>
//                   </div>
//                 </div>

//                 <div className="report-content">
//                   <div className="reporter-info">
//                     <User size={16} className="info-icon" />
//                     <span className="reporter-name">{report.reporterName}</span>
//                   </div>

//                   <div className="location-info">
//                     <MapPin size={16} className="info-icon" />
//                     <span className="location">{report.location}</span>
//                   </div>

//                   <div className="description-section">
//                     <FileText size={16} className="info-icon" />
//                     <p className="description">{report.description}</p>
//                   </div>

//                   <div className="timestamp-info">
//                     <Clock size={16} className="info-icon" />
//                     <span className="timestamp">
//                       {formatDate(report.createdAt)}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="report-actions">
//                   <button className="action-btn primary">View Details</button>
//                   <button className="action-btn secondary">Create Alert</button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CallReports;
import React, { useState, useEffect } from "react";
import {
  Phone,
  MapPin,
  Clock,
  AlertTriangle,
  User,
  FileText,
} from "lucide-react";
import "./CallReports.css";

// If you want to override API base, define REACT_APP_API_URL in frontend .env
const API_BASE = "http://localhost:3000/api/v1/callReports";

const CallReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  // fetch from backend
  const fetchReports = async (hazardType) => {
    setLoading(true);
    setError(null);
    try {
      const url =
        hazardType && hazardType !== "all"
          ? `${API_BASE}/reports?hazardType=${encodeURIComponent(hazardType)}`
          : `${API_BASE}/reports`;
      const res = await fetch(url);
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `HTTP ${res.status}`);
      }
      const json = await res.json();
      setReports(json.data || []);
    } catch (err) {
      console.error("Fetch reports error:", err);
      setError(err.message || "Failed to load reports");
    } finally {
      setLoading(false);
    }
  };

  // initial fetch & fetch on filter change
  useEffect(() => {
    // map simple filter keywords to hazard types stored in DB
    const mapFilterToHazard = (f) => {
      if (f === "tide") return "unusual tide";
      if (f === "storm") return "storm surge";
      if (f === "tsunami") return "tsunami";
      if (f === "flooding") return "flooding";
      return null;
    };

    const hazardType = mapFilterToHazard(filter);
    fetchReports(hazardType);
  }, [filter]);

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateString || "-";
    }
  };

  const getHazardTypeColor = (hazardType) => {
    const colors = {
      tsunami: "#dc2626",
      "unusual tide": "#f59e0b",
      "storm surge": "#7c3aed",
      flooding: "#2563eb",
      default: "#6b7280",
    };
    return colors[(hazardType || "").toLowerCase()] || colors.default;
  };

  const filteredReports = reports; // backend already filtered when requested

  if (loading) {
    return (
      <div className="callReports-container">
        <div className="callReports-loadingState">
          <div className="callReports-loadingSpinner"></div>
          <p>Loading call reports...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="callReports-container">
        <div className="callReports-errorState">
          <AlertTriangle size={48} />
          <h3>Error Loading Reports</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="callReports-container">
      {/* Header */}
      <div className="callReports-header">
        <div className="callReports-headerContent">
          <h1 className="callReports-pageTitle">Call Reports</h1>
          <p className="callReports-pageSubtitle">
            Monitor emergency reports received via phone calls
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="callReports-statsCardsSection">
        <div className="callReports-statsCard">
          <div className="callReports-statsNumber">{reports.length}</div>
          <div className="callReports-statsLabel">Total Reports</div>
        </div>
        <div className="callReports-statsCard">
          <div className="callReports-statsNumber">
            {reports.filter((r) => r.hazardType === "tsunami").length}
          </div>
          <div className="callReports-statsLabel">Tsunami Reports</div>
        </div>
        <div className="callReports-statsCard">
          <div className="callReports-statsNumber">
            {reports.filter((r) => r.hazardType === "unusual tide").length}
          </div>
          <div className="callReports-statsLabel">Tide Reports</div>
        </div>
        <div className="callReports-statsCard">
          <div className="callReports-statsNumber">
            {reports.filter((r) => r.hazardType === "storm surge").length}
          </div>
          <div className="callReports-statsLabel">Storm Reports</div>
        </div>
      </div>

      {/* Filters */}
      <div className="callReports-filtersSection">
        <div className="callReports-filterButtons">
          <button
            className={`callReports-filterBtn ${
              filter === "all" ? "callReports-active" : ""
            }`}
            onClick={() => setFilter("all")}
          >
            All Reports
          </button>
          <button
            className={`callReports-filterBtn ${
              filter === "tsunami" ? "callReports-active" : ""
            }`}
            onClick={() => setFilter("tsunami")}
          >
            Tsunami
          </button>
          <button
            className={`callReports-filterBtn ${
              filter === "tide" ? "callReports-active" : ""
            }`}
            onClick={() => setFilter("tide")}
          >
            Tides
          </button>
          <button
            className={`callReports-filterBtn ${
              filter === "storm" ? "callReports-active" : ""
            }`}
            onClick={() => setFilter("storm")}
          >
            Storms
          </button>
          <button
            className={`callReports-filterBtn ${
              filter === "flooding" ? "callReports-active" : ""
            }`}
            onClick={() => setFilter("flooding")}
          >
            Flooding
          </button>
        </div>
      </div>

      {/* Reports List */}
      <div className="callReports-reportsSection">
        {filteredReports.length === 0 ? (
          <div className="callReports-emptyState">
            <Phone size={64} className="callReports-emptyIcon" />
            <h3>No Call Reports Found</h3>
            <p>No phone call reports match your current filter criteria.</p>
          </div>
        ) : (
          <div className="callReports-reportsGrid">
            {filteredReports.map((report) => (
              <div key={report._id} className="callReports-reportCard">
                <div className="callReports-reportHeader">
                  <div className="callReports-reportType">
                    <div
                      className="callReports-hazardIndicator"
                      style={{
                        backgroundColor: getHazardTypeColor(report.hazardType),
                      }}
                    />
                    <span className="callReports-hazardType">
                      {report.hazardType}
                    </span>
                  </div>
                  <div className="callReports-reportSource">
                    <Phone size={16} />
                    <span>{report.source || "Phone Call"}</span>
                  </div>
                </div>

                <div className="callReports-reportContent">
                  <div className="callReports-reporterInfo">
                    <User size={16} className="callReports-infoIcon" />
                    <span className="callReports-reporterName">
                      {report.reporterName}
                    </span>
                  </div>

                  <div className="callReports-locationInfo">
                    <MapPin size={16} className="callReports-infoIcon" />
                    <span className="callReports-location">
                      {report.location}
                    </span>
                  </div>

                  <div className="callReports-descriptionSection">
                    <FileText size={16} className="callReports-infoIcon" />
                    <p className="callReports-description">
                      {report.description}
                    </p>
                  </div>

                  <div className="callReports-timestampInfo">
                    <Clock size={16} className="callReports-infoIcon" />
                    <span className="callReports-timestamp">
                      {formatDate(report.createdAt)}
                    </span>
                  </div>
                </div>

                <div className="callReports-reportActions">
                  <button className="callReports-actionBtn callReports-primary">
                    View Details
                  </button>
                  <button className="callReports-actionBtn callReports-secondary">
                    Create Alert
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CallReports;

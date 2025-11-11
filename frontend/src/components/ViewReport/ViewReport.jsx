// "use client";

// import { useState, useEffect } from "react";
// import axios from "axios";
// import "./ViewReport.css";

// const ViewReports = () => {
//   const [reports, setReports] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [filters, setFilters] = useState({
//     type: "",
//     urgency: "",
//     isVerified: "",
//   });
//   const [sortBy, setSortBy] = useState("-reportedAt");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedReport, setSelectedReport] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   // Fetch reports from API
//   const fetchReports = async () => {
//     try {
//       setLoading(true);
//       const queryParams = new URLSearchParams();

//       // Add filters
//       Object.keys(filters).forEach((key) => {
//         if (filters[key]) {
//           queryParams.append(key, filters[key]);
//         }
//       });

//       // Add sorting
//       if (sortBy) {
//         queryParams.append("sort", sortBy);
//       }

//       const response = await axios.get(
//         `http://localhost:3000/reports?${queryParams.toString()}`
//       );

//       if (response.data && response.data.reports) {
//         setReports(response.data.reports);
//       }
//       setError("");
//     } catch (err) {
//       setError("Failed to fetch reports. Please try again.");
//       console.error("Error fetching reports:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Toggle verification status
//   const toggleVerification = async (reportId, currentStatus) => {
//     try {
//       const response = await axios.patch(
//         `http://localhost:3000/reports/verify/${reportId}/`,
//         {
//           isVerified: !currentStatus,
//         }
//       );

//       if (response.data.success) {
//         // Update local state
//         setReports((prevReports) =>
//           prevReports.map((report) =>
//             report._id === reportId
//               ? { ...report, isVerified: !currentStatus }
//               : report
//           )
//         );

//         // Update modal if open
//         if (selectedReport && selectedReport._id === reportId) {
//           setSelectedReport((prev) => ({
//             ...prev,
//             isVerified: !currentStatus,
//           }));
//         }
//       }
//     } catch (err) {
//       setError("Failed to update verification status.");
//       console.error("Error updating verification:", err);
//     }
//   };

//   // Handle filter changes
//   const handleFilterChange = (filterType, value) => {
//     setFilters((prev) => ({
//       ...prev,
//       [filterType]: value,
//     }));
//     setCurrentPage(1);
//   };

//   // Handle sort change
//   const handleSortChange = (value) => {
//     setSortBy(value);
//     setCurrentPage(1);
//   };

//   // Reset filters
//   const resetFilters = () => {
//     setFilters({
//       type: "",
//       urgency: "",
//       isVerified: "",
//     });
//     setSortBy("-reportedAt");
//     setCurrentPage(1);
//   };

//   // Open modal
//   const openModal = (report) => {
//     setSelectedReport(report);
//     setShowModal(true);
//   };

//   // Close modal
//   const closeModal = () => {
//     setShowModal(false);
//     setSelectedReport(null);
//   };

//   // Format date
//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   // Get urgency class
//   const getUrgencyClass = (urgency) => {
//     switch (urgency.toLowerCase()) {
//       case "high":
//         return "view-reports-comp-urgency-high";
//       case "medium":
//         return "view-reports-comp-urgency-medium";
//       case "low":
//         return "view-reports-comp-urgency-low";
//       default:
//         return "";
//     }
//   };

//   // Load reports on component mount and filter/sort changes
//   useEffect(() => {
//     fetchReports();
//   }, [filters, sortBy]);

//   if (loading) {
//     return (
//       <div className="view-reports-comp-main-container">
//         <div className="view-reports-comp-loading-spinner">
//           <div className="view-reports-comp-spinner"></div>
//           <p>Loading reports...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="view-reports-comp-main-container">
//       <div className="view-reports-comp-header">
//         <h1>Reports Management</h1>
//         <p>Manage and verify incident reports</p>
//       </div>

//       {error && (
//         <div className="view-reports-comp-error-message">
//           <span>⚠️ {error}</span>
//           <button onClick={() => setError("")}>×</button>
//         </div>
//       )}

//       {/* Filters and Controls */}
//       <div className="view-reports-comp-controls">
//         <div className="view-reports-comp-filters-section">
//           <div className="view-reports-comp-filter-group">
//             <label>Type:</label>
//             <input
//               type="text"
//               placeholder="Filter by type"
//               value={filters.type}
//               onChange={(e) => handleFilterChange("type", e.target.value)}
//             />
//           </div>

//           <div className="view-reports-comp-filter-group">
//             <label>Urgency:</label>
//             <select
//               value={filters.urgency}
//               onChange={(e) => handleFilterChange("urgency", e.target.value)}
//             >
//               <option value="">All</option>
//               <option value="High">High</option>
//               <option value="Medium">Medium</option>
//               <option value="Low">Low</option>
//             </select>
//           </div>

//           <div className="view-reports-comp-filter-group">
//             <label>Status:</label>
//             <select
//               value={filters.isVerified}
//               onChange={(e) => handleFilterChange("isVerified", e.target.value)}
//             >
//               <option value="">All</option>
//               <option value="true">Verified</option>
//               <option value="false">Unverified</option>
//             </select>
//           </div>

//           <div className="view-reports-comp-filter-group">
//             <label>Sort by:</label>
//             <select
//               value={sortBy}
//               onChange={(e) => handleSortChange(e.target.value)}
//             >
//               <option value="-reportedAt">Newest First</option>
//               <option value="reportedAt">Oldest First</option>
//               <option value="urgency">Urgency</option>
//               <option value="type">Type</option>
//               <option value="isVerified">Verification Status</option>
//             </select>
//           </div>

//           <button
//             className="view-reports-comp-reset-btn"
//             onClick={resetFilters}
//           >
//             Reset Filters
//           </button>
//         </div>

//         <div className="view-reports-comp-stats">
//           <div className="view-reports-comp-stat">
//             <span className="view-reports-comp-stat-number">
//               {reports.length}
//             </span>
//             <span className="view-reports-comp-stat-label">Total Reports</span>
//           </div>
//           <div className="view-reports-comp-stat">
//             <span className="view-reports-comp-stat-number">
//               {reports.filter((r) => r.isVerified).length}
//             </span>
//             <span className="view-reports-comp-stat-label">Verified</span>
//           </div>
//           <div className="view-reports-comp-stat">
//             <span className="view-reports-comp-stat-number">
//               {reports.filter((r) => !r.isVerified).length}
//             </span>
//             <span className="view-reports-comp-stat-label">Pending</span>
//           </div>
//         </div>
//       </div>

//       {/* Reports Grid */}
//       {reports.length === 0 ? (
//         <div className="view-reports-comp-no-reports">
//           <p>No reports found matching your criteria.</p>
//         </div>
//       ) : (
//         <div className="view-reports-comp-grid">
//           {reports.map((report) => (
//             <div key={report._id} className="view-reports-comp-card">
//               <div className="view-reports-comp-card-header">
//                 <div className="view-reports-comp-type">{report.type}</div>
//                 <div
//                   className={`view-reports-comp-urgency-badge ${getUrgencyClass(
//                     report.urgency
//                   )}`}
//                 >
//                   {report.urgency}
//                 </div>
//               </div>

//               <div className="view-reports-comp-content">
//                 <p className="view-reports-comp-description">
//                   {report.description?.substring(0, 100)}
//                   {report.description?.length > 100 && "..."}
//                 </p>

//                 <div className="view-reports-comp-meta">
//                   <div className="view-reports-comp-date">
//                     📅 {formatDate(report.reportedAt)}
//                   </div>
//                   <div className="view-reports-comp-location">
//                     📍 {report.location.coordinates[1].toFixed(4)},{" "}
//                     {report.location.coordinates[0].toFixed(4)}
//                   </div>
//                   {report.reportedBy && (
//                     <div className="view-reports-comp-user">
//                       👤 {report.reportedBy.name}
//                     </div>
//                   )}
//                 </div>

//                 {report.mediaUrl && report.mediaUrl.length > 0 && (
//                   <div className="view-reports-comp-media-indicator">
//                     📷 {report.mediaUrl.length} media file(s)
//                   </div>
//                 )}
//               </div>

//               <div className="view-reports-comp-actions">
//                 <div
//                   className={`view-reports-comp-verification-status ${
//                     report.isVerified
//                       ? "view-reports-comp-verified"
//                       : "view-reports-comp-unverified"
//                   }`}
//                 >
//                   {report.isVerified ? "✅ Verified" : "⏳ Pending"}
//                 </div>

//                 <div className="view-reports-comp-action-buttons">
//                   <button
//                     className="view-reports-comp-view-btn"
//                     onClick={() => openModal(report)}
//                   >
//                     View Details
//                   </button>

//                   <button
//                     className={`view-reports-comp-verify-btn ${
//                       report.isVerified
//                         ? "view-reports-comp-unverify"
//                         : "view-reports-comp-verify"
//                     }`}
//                     onClick={() =>
//                       toggleVerification(report._id, report.isVerified)
//                     }
//                   >
//                     {report.isVerified ? "Unverify" : "Verify"}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Modal for Report Details */}
//       {showModal && selectedReport && (
//         <div className="view-reports-comp-modal-overlay" onClick={closeModal}>
//           <div
//             className="view-reports-comp-modal-content"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="view-reports-comp-modal-header">
//               <h2>Report Details</h2>
//               <button
//                 className="view-reports-comp-close-btn"
//                 onClick={closeModal}
//               >
//                 ×
//               </button>
//             </div>

//             <div className="view-reports-comp-modal-body">
//               <div className="view-reports-comp-detail-section">
//                 <h3>Basic Information</h3>
//                 <div className="view-reports-comp-detail-grid">
//                   <div className="view-reports-comp-detail-item">
//                     <label>Type:</label>
//                     <span>{selectedReport.type}</span>
//                   </div>
//                   <div className="view-reports-comp-detail-item">
//                     <label>Urgency:</label>
//                     <span
//                       className={`view-reports-comp-urgency-badge ${getUrgencyClass(
//                         selectedReport.urgency
//                       )}`}
//                     >
//                       {selectedReport.urgency}
//                     </span>
//                   </div>
//                   <div className="view-reports-comp-detail-item">
//                     <label>Status:</label>
//                     <span
//                       className={`view-reports-comp-verification-status ${
//                         selectedReport.isVerified
//                           ? "view-reports-comp-verified"
//                           : "view-reports-comp-unverified"
//                       }`}
//                     >
//                       {selectedReport.isVerified ? "✅ Verified" : "⏳ Pending"}
//                     </span>
//                   </div>
//                   <div className="view-reports-comp-detail-item">
//                     <label>Reported At:</label>
//                     <span>{formatDate(selectedReport.reportedAt)}</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="view-reports-comp-detail-section">
//                 <h3>Description</h3>
//                 <p>{selectedReport.description || "No description provided"}</p>
//               </div>

//               <div className="view-reports-comp-detail-section">
//                 <h3>Location</h3>
//                 <p>
//                   Coordinates:{" "}
//                   {selectedReport.location.coordinates[1].toFixed(6)},{" "}
//                   {selectedReport.location.coordinates[0].toFixed(6)}
//                 </p>
//               </div>

//               {selectedReport.reportedBy && (
//                 <div className="view-reports-comp-detail-section">
//                   <h3>Reported By</h3>
//                   <div className="view-reports-comp-user-info">
//                     <p>
//                       <strong>Name:</strong> {selectedReport.reportedBy.name}
//                     </p>
//                     <p>
//                       <strong>Email:</strong> {selectedReport.reportedBy.email}
//                     </p>
//                   </div>
//                 </div>
//               )}

//               {selectedReport.mediaUrl &&
//                 selectedReport.mediaUrl.length > 0 && (
//                   <div className="view-reports-comp-detail-section">
//                     <h3>Media Files</h3>
//                     <div className="view-reports-comp-media-grid">
//                       {selectedReport.mediaUrl.map((url, index) => (
//                         <div
//                           key={index}
//                           className="view-reports-comp-media-item"
//                         >
//                           <img
//                             src={url || "/placeholder.svg"}
//                             alt={`Report media ${index + 1}`}
//                             onError={(e) => {
//                               e.target.style.display = "none";
//                             }}
//                           />
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//             </div>

//             <div className="view-reports-comp-modal-footer">
//               <button
//                 className={`view-reports-comp-verify-btn ${
//                   selectedReport.isVerified
//                     ? "view-reports-comp-unverify"
//                     : "view-reports-comp-verify"
//                 }`}
//                 onClick={() =>
//                   toggleVerification(
//                     selectedReport._id,
//                     selectedReport.isVerified
//                   )
//                 }
//               >
//                 {selectedReport.isVerified
//                   ? "Unverify Report"
//                   : "Verify Report"}
//               </button>
//               <button
//                 className="view-reports-comp-cancel-btn"
//                 onClick={closeModal}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ViewReports;

// viewReports.jsx

//----------------------------------------------------------------NEW CODE --------------------------------------------------------------------------

"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import {
  Search,
  Filter,
  Calendar,
  MapPin,
  User,
  Image,
  CheckCircle,
  Hourglass,
  Eye,
  Check,
  X,
  Tag,
  AlertTriangle,
} from "lucide-react";
import "./ViewReport.css";

const ViewReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    type: "",
    urgency: "",
    isVerified: "",
  });
  const [sortBy, setSortBy] = useState("-reportedAt");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch reports from API
  const fetchReports = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();

      // Add filters
      Object.keys(filters).forEach((key) => {
        if (filters[key]) {
          queryParams.append(key, filters[key]);
        }
      });

      // Add sorting
      if (sortBy) {
        queryParams.append("sort", sortBy);
      }

      const response = await axios.get(
        `http://localhost:3000/reports?${queryParams.toString()}`
      );

      if (response.data && response.data.reports) {
        setReports(response.data.reports);
      }
      setError("");
    } catch (err) {
      setError("Failed to fetch reports. Please try again.");
      console.error("Error fetching reports:", err);
    } finally {
      setLoading(false);
    }
  };

  // Toggle verification status
  const toggleVerification = async (reportId, currentStatus) => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/reports/verify/${reportId}/`,
        {
          isVerified: !currentStatus,
        }
      );

      if (response.data.success) {
        // Update local state
        setReports((prevReports) =>
          prevReports.map((report) =>
            report._id === reportId
              ? { ...report, isVerified: !currentStatus }
              : report
          )
        );

        // Update modal if open
        if (selectedReport && selectedReport._id === reportId) {
          setSelectedReport((prev) => ({
            ...prev,
            isVerified: !currentStatus,
          }));
        }
      }
    } catch (err) {
      setError("Failed to update verification status.");
      console.error("Error updating verification:", err);
    }
  };

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
    setCurrentPage(1);
  };

  // Handle sort change
  const handleSortChange = (value) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      type: "",
      urgency: "",
      isVerified: "",
    });
    setSortBy("-reportedAt");
    setCurrentPage(1);
  };

  // Open modal
  const openModal = (report) => {
    setSelectedReport(report);
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedReport(null);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get urgency class
  const getUrgencyClass = (urgency) => {
    if (!urgency) return "";
    switch (urgency.toLowerCase()) {
      case "high":
        return "view-reports-comp-urgency-high";
      case "medium":
        return "view-reports-comp-urgency-medium";
      case "low":
        return "view-reports-comp-urgency-low";
      default:
        return "";
    }
  };

  // Load reports on component mount and filter/sort changes
  useEffect(() => {
    fetchReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, sortBy]);

  if (loading) {
    return (
      <div className="view-reports-comp-main-container">
        <div className="view-reports-comp-loading-spinner">
          <div className="view-reports-comp-spinner"></div>
          <p>Loading reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="view-reports-comp-main-container">
      <div className="view-reports-comp-header">
        <h1>
          <Tag size={28} style={{ verticalAlign: "middle", marginRight: 8 }} />
          Reports Management
        </h1>
        <p>
          <AlertTriangle
            size={16}
            style={{ verticalAlign: "middle", marginRight: 8 }}
          />
          Manage and verify incident reports
        </p>
      </div>

      {error && (
        <div className="view-reports-comp-error-message">
          <span>
            <AlertTriangle size={16} style={{ marginRight: 8 }} />
            {error}
          </span>
          <button onClick={() => setError("")}>
            <X size={18} />
          </button>
        </div>
      )}

      {/* Filters and Controls */}
      <div className="view-reports-comp-controls">
        <div className="view-reports-comp-filters-section">
          <div className="view-reports-comp-filter-group">
            <label>
              <Search size={14} style={{ marginRight: 8 }} />
              Type:
            </label>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input
                type="text"
                placeholder="Filter by type"
                value={filters.type}
                onChange={(e) => handleFilterChange("type", e.target.value)}
              />
            </div>
          </div>

          <div className="view-reports-comp-filter-group">
            <label>
              <Filter size={14} style={{ marginRight: 8 }} />
              Urgency:
            </label>
            <select
              value={filters.urgency}
              onChange={(e) => handleFilterChange("urgency", e.target.value)}
            >
              <option value="">All</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="view-reports-comp-filter-group">
            <label>
              <CheckCircle size={14} style={{ marginRight: 8 }} />
              Status:
            </label>
            <select
              value={filters.isVerified}
              onChange={(e) => handleFilterChange("isVerified", e.target.value)}
            >
              <option value="">All</option>
              <option value="true">Verified</option>
              <option value="false">Unverified</option>
            </select>
          </div>

          <div className="view-reports-comp-filter-group">
            <label>
              <Calendar size={14} style={{ marginRight: 8 }} />
              Sort by:
            </label>
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
            >
              <option value="-reportedAt">Newest First</option>
              <option value="reportedAt">Oldest First</option>
              <option value="urgency">Urgency</option>
              <option value="type">Type</option>
              <option value="isVerified">Verification Status</option>
            </select>
          </div>

          {/* <button
            className="view-reports-comp-reset-btn"
            onClick={resetFilters}
          >
            <X size={16} style={{ marginRight: 8 }} />
            Reset Filters
          </button> */}
        </div>

        <div className="view-reports-comp-stats">
          <div className="view-reports-comp-stat">
            <span className="view-reports-comp-stat-number">
              {reports.length}
            </span>
            <span className="view-reports-comp-stat-label">
              <Eye size={14} style={{ marginRight: 6 }} />
              Total Reports
            </span>
          </div>
          <div className="view-reports-comp-stat">
            <span className="view-reports-comp-stat-number">
              {reports.filter((r) => r.isVerified).length}
            </span>
            <span className="view-reports-comp-stat-label">
              <CheckCircle size={14} style={{ marginRight: 6 }} />
              Verified
            </span>
          </div>
          <div className="view-reports-comp-stat">
            <span className="view-reports-comp-stat-number">
              {reports.filter((r) => !r.isVerified).length}
            </span>
            <span className="view-reports-comp-stat-label">
              <Hourglass size={14} style={{ marginRight: 6 }} />
              Pending
            </span>
          </div>
        </div>
      </div>

      {/* Reports Grid */}
      {reports.length === 0 ? (
        <div className="view-reports-comp-no-reports">
          <p>No reports found matching your criteria.</p>
        </div>
      ) : (
        <div className="view-reports-comp-grid">
          {reports.map((report) => (
            <div key={report._id} className="view-reports-comp-card">
              <div className="view-reports-comp-card-header">
                <div className="view-reports-comp-type">
                  <Tag
                    size={14}
                    style={{ verticalAlign: "middle", marginRight: 8 }}
                  />
                  {report.type}
                </div>
                <div
                  className={`view-reports-comp-urgency-badge ${getUrgencyClass(
                    report.urgency
                  )}`}
                >
                  {report.urgency}
                </div>
              </div>

              <div className="view-reports-comp-content">
                <p className="view-reports-comp-description">
                  {report.description?.substring(0, 100)}
                  {report.description?.length > 100 && "..."}
                </p>

                <div className="view-reports-comp-meta">
                  <div className="view-reports-comp-date">
                    <Calendar
                      size={14}
                      style={{ marginRight: 8, verticalAlign: "middle" }}
                    />
                    {formatDate(report.reportedAt)}
                  </div>
                  <div className="view-reports-comp-location">
                    <MapPin
                      size={14}
                      style={{ marginRight: 8, verticalAlign: "middle" }}
                    />
                    {report.location.coordinates[1].toFixed(4)},{" "}
                    {report.location.coordinates[0].toFixed(4)}
                  </div>
                  {report.reportedBy && (
                    <div className="view-reports-comp-user">
                      <User
                        size={14}
                        style={{ marginRight: 8, verticalAlign: "middle" }}
                      />
                      {report.reportedBy.name}
                    </div>
                  )}
                </div>

                {report.mediaUrl && report.mediaUrl.length > 0 && (
                  <div className="view-reports-comp-media-indicator">
                    <Image
                      size={14}
                      style={{ marginRight: 8, verticalAlign: "middle" }}
                    />
                    {report.mediaUrl.length} media file(s)
                  </div>
                )}
              </div>

              <div className="view-reports-comp-actions">
                <div
                  className={`view-reports-comp-verification-status ${
                    report.isVerified
                      ? "view-reports-comp-verified"
                      : "view-reports-comp-unverified"
                  }`}
                >
                  {report.isVerified ? (
                    <>
                      <CheckCircle size={14} style={{ marginRight: 8 }} />
                      Verified
                    </>
                  ) : (
                    <>
                      <Hourglass size={14} style={{ marginRight: 8 }} />
                      Pending
                    </>
                  )}
                </div>

                <div className="view-reports-comp-action-buttons">
                  <button
                    className="view-reports-comp-view-btn"
                    onClick={() => openModal(report)}
                  >
                    <Eye size={14} style={{ marginRight: 8 }} />
                    View Details
                  </button>

                  <button
                    className={`view-reports-comp-verify-btn ${
                      report.isVerified
                        ? "view-reports-comp-unverify"
                        : "view-reports-comp-verify"
                    }`}
                    onClick={() =>
                      toggleVerification(report._id, report.isVerified)
                    }
                  >
                    {report.isVerified ? (
                      <>
                        <X size={14} style={{ marginRight: 8 }} />
                        Unverify
                      </>
                    ) : (
                      <>
                        <Check size={14} style={{ marginRight: 8 }} />
                        Verify
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for Report Details */}
      {showModal && selectedReport && (
        <div className="view-reports-comp-modal-overlay" onClick={closeModal}>
          <div
            className="view-reports-comp-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="view-reports-comp-modal-header">
              <h2>
                <Tag
                  size={20}
                  style={{ marginRight: 8, verticalAlign: "middle" }}
                />
                Report Details
              </h2>
              <button
                className="view-reports-comp-close-btn"
                onClick={closeModal}
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <div className="view-reports-comp-modal-body">
              <div className="view-reports-comp-detail-section">
                <h3>
                  <Tag
                    size={16}
                    style={{ marginRight: 8, verticalAlign: "middle" }}
                  />
                  Basic Information
                </h3>
                <div className="view-reports-comp-detail-grid">
                  <div className="view-reports-comp-detail-item">
                    <label>
                      <Tag size={14} style={{ marginRight: 8 }} />
                      Type:
                    </label>
                    <span>{selectedReport.type}</span>
                  </div>
                  <div className="view-reports-comp-detail-item">
                    <label>
                      <Filter size={14} style={{ marginRight: 8 }} />
                      Urgency:
                    </label>
                    <span
                      className={`view-reports-comp-urgency-badge ${getUrgencyClass(
                        selectedReport.urgency
                      )}`}
                    >
                      {selectedReport.urgency}
                    </span>
                  </div>
                  <div className="view-reports-comp-detail-item">
                    <label>
                      <CheckCircle size={14} style={{ marginRight: 8 }} />
                      Status:
                    </label>
                    <span
                      className={`view-reports-comp-verification-status ${
                        selectedReport.isVerified
                          ? "view-reports-comp-verified"
                          : "view-reports-comp-unverified"
                      }`}
                    >
                      {selectedReport.isVerified ? " Verified" : " Pending"}
                    </span>
                  </div>
                  <div className="view-reports-comp-detail-item">
                    <label>
                      <Calendar size={14} style={{ marginRight: 8 }} />
                      Reported At:
                    </label>
                    <span>{formatDate(selectedReport.reportedAt)}</span>
                  </div>
                </div>
              </div>

              <div className="view-reports-comp-detail-section">
                <h3>
                  <AlertTriangle size={16} style={{ marginRight: 8 }} />
                  Description
                </h3>
                <p>{selectedReport.description || "No description provided"}</p>
              </div>

              <div className="view-reports-comp-detail-section">
                <h3>
                  <MapPin size={16} style={{ marginRight: 8 }} />
                  Location
                </h3>
                <p>
                  Coordinates:{" "}
                  {selectedReport.location.coordinates[1].toFixed(6)},{" "}
                  {selectedReport.location.coordinates[0].toFixed(6)}
                </p>
              </div>

              {selectedReport.reportedBy && (
                <div className="view-reports-comp-detail-section">
                  <h3>
                    <User size={16} style={{ marginRight: 8 }} />
                    Reported By
                  </h3>
                  <div className="view-reports-comp-user-info">
                    <p>
                      <strong>Name:</strong> {selectedReport.reportedBy.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {selectedReport.reportedBy.email}
                    </p>
                  </div>
                </div>
              )}

              {selectedReport.mediaUrl &&
                selectedReport.mediaUrl.length > 0 && (
                  <div className="view-reports-comp-detail-section">
                    <h3>
                      <Image size={16} style={{ marginRight: 8 }} />
                      Media Files
                    </h3>
                    <div className="view-reports-comp-media-grid">
                      {selectedReport.mediaUrl.map((url, index) => (
                        <div
                          key={index}
                          className="view-reports-comp-media-item"
                        >
                          <img
                            src={url || "/placeholder.svg"}
                            alt={`Report media ${index + 1}`}
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>

            <div className="view-reports-comp-modal-footer">
              <button
                className={`view-reports-comp-verify-btn ${
                  selectedReport.isVerified
                    ? "view-reports-comp-unverify"
                    : "view-reports-comp-verify"
                }`}
                onClick={() =>
                  toggleVerification(
                    selectedReport._id,
                    selectedReport.isVerified
                  )
                }
              >
                {selectedReport.isVerified ? (
                  <>
                    <X size={14} style={{ marginRight: 8 }} />
                    Unverify Report
                  </>
                ) : (
                  <>
                    <Check size={14} style={{ marginRight: 8 }} />
                    Verify Report
                  </>
                )}
              </button>
              <button
                className="view-reports-comp-cancel-btn"
                onClick={closeModal}
              >
                <X size={14} style={{ marginRight: 8 }} />
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewReports;

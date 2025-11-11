// // // // components/AlertComponent.jsx
// // // import React, { useState, useEffect } from "react";
// // // import axios from "axios";
// // // import {
// // //   AlertTriangle,
// // //   Plus,
// // //   Edit,
// // //   Trash2,
// // //   MapPin,
// // //   Calendar,
// // //   ToggleLeft,
// // //   ToggleRight,
// // //   Save,
// // //   X,
// // // } from "lucide-react";
// // // import "./AlertComponent.css";

// // // const AlertComponent = () => {
// // //   const [alerts, setAlerts] = useState([]);
// // //   const [showForm, setShowForm] = useState(false);
// // //   const [editingAlert, setEditingAlert] = useState(null);
// // //   const [loading, setLoading] = useState(false);
// // //   const [formData, setFormData] = useState({
// // //     type: "Red Alert",
// // //     title: "",
// // //     location: "",
// // //     description: "",
// // //   });

// // //   const API_BASE_URL = "http://localhost:3000/alerts";

// // //   // Fetch all alerts
// // //   const fetchAlerts = async () => {
// // //     try {
// // //       setLoading(true);
// // //       const response = await axios.get(API_BASE_URL);
// // //       setAlerts(response.data.data);
// // //     } catch (error) {
// // //       console.error("Error fetching alerts:", error);
// // //       alert("Failed to fetch alerts");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchAlerts();
// // //   }, []);

// // //   // Handle form input changes
// // //   const handleInputChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setFormData((prev) => ({
// // //       ...prev,
// // //       [name]: value,
// // //     }));
// // //   };

// // //   // Reset form
// // //   const resetForm = () => {
// // //     setFormData({
// // //       type: "Red Alert",
// // //       title: "",
// // //       location: "",
// // //       description: "",
// // //     });
// // //     setShowForm(false);
// // //     setEditingAlert(null);
// // //   };

// // //   // Create new alert
// // //   const createAlert = async (e) => {
// // //     e.preventDefault();
// // //     try {
// // //       setLoading(true);
// // //       await axios.post(API_BASE_URL, formData);
// // //       fetchAlerts();
// // //       resetForm();
// // //       alert("Alert created successfully!");
// // //     } catch (error) {
// // //       console.error("Error creating alert:", error);
// // //       alert("Failed to create alert");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // Update alert
// // //   const updateAlert = async (e) => {
// // //     e.preventDefault();
// // //     try {
// // //       setLoading(true);
// // //       await axios.put(`${API_BASE_URL}/${editingAlert}`, formData);
// // //       fetchAlerts();
// // //       resetForm();
// // //       alert("Alert updated successfully!");
// // //     } catch (error) {
// // //       console.error("Error updating alert:", error);
// // //       alert("Failed to update alert");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // Delete alert
// // //   const deleteAlert = async (id) => {
// // //     if (window.confirm("Are you sure you want to delete this alert?")) {
// // //       try {
// // //         setLoading(true);
// // //         await axios.delete(`${API_BASE_URL}/${id}`);
// // //         fetchAlerts();
// // //         alert("Alert deleted successfully!");
// // //       } catch (error) {
// // //         console.error("Error deleting alert:", error);
// // //         alert("Failed to delete alert");
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     }
// // //   };

// // //   // Toggle alert status
// // //   const toggleAlertStatus = async (id) => {
// // //     try {
// // //       await axios.patch(`${API_BASE_URL}/${id}/toggle`);
// // //       fetchAlerts();
// // //     } catch (error) {
// // //       console.error("Error toggling alert status:", error);
// // //       alert("Failed to update alert status");
// // //     }
// // //   };

// // //   // Start editing
// // //   const startEdit = (alert) => {
// // //     setEditingAlert(alert._id);
// // //     setFormData({
// // //       type: alert.type,
// // //       title: alert.title,
// // //       location: alert.location,
// // //       description: alert.description || "",
// // //     });
// // //     setShowForm(true);
// // //   };

// // //   // Format date
// // //   const formatDate = (dateString) => {
// // //     return new Date(dateString).toLocaleDateString("en-GB", {
// // //       day: "2-digit",
// // //       month: "short",
// // //       year: "numeric",
// // //     });
// // //   };

// // //   return (
// // //     <div className="alert-container">
// // //       <div className="alert-header">
// // //         <h1>Alert Management System</h1>
// // //         <button
// // //           className="btn btn-primary"
// // //           onClick={() => setShowForm(true)}
// // //           disabled={loading}
// // //         >
// // //           <Plus size={20} />
// // //           Create New Alert
// // //         </button>
// // //       </div>

// // //       {/* Alert Form */}
// // //       {showForm && (
// // //         <div className="alert-form-overlay">
// // //           <div className="alert-form">
// // //             <div className="form-header">
// // //               <h2>{editingAlert ? "Edit Alert" : "Create New Alert"}</h2>
// // //               <button className="btn-close" onClick={resetForm}>
// // //                 <X size={20} />
// // //               </button>
// // //             </div>

// // //             <form onSubmit={editingAlert ? updateAlert : createAlert}>
// // //               <div className="form-group">
// // //                 <label htmlFor="type">Alert Type</label>
// // //                 <select
// // //                   id="type"
// // //                   name="type"
// // //                   value={formData.type}
// // //                   onChange={handleInputChange}
// // //                   required
// // //                 >
// // //                   <option value="Red Alert">Red Alert</option>
// // //                   <option value="Orange Alert">Orange Alert</option>
// // //                   <option value="Yellow Alert">Yellow Alert</option>
// // //                   <option value="Green Alert">Green Alert</option>
// // //                 </select>
// // //               </div>

// // //               <div className="form-group">
// // //                 <label htmlFor="title">Alert Title</label>
// // //                 <input
// // //                   type="text"
// // //                   id="title"
// // //                   name="title"
// // //                   value={formData.title}
// // //                   onChange={handleInputChange}
// // //                   placeholder="e.g., High Wave Alert"
// // //                   required
// // //                 />
// // //               </div>

// // //               <div className="form-group">
// // //                 <label htmlFor="location">Location</label>
// // //                 <input
// // //                   type="text"
// // //                   id="location"
// // //                   name="location"
// // //                   value={formData.location}
// // //                   onChange={handleInputChange}
// // //                   placeholder="e.g., Marina Beach, Chennai"
// // //                   required
// // //                 />
// // //               </div>

// // //               <div className="form-group">
// // //                 <label htmlFor="description">Description (Optional)</label>
// // //                 <textarea
// // //                   id="description"
// // //                   name="description"
// // //                   value={formData.description}
// // //                   onChange={handleInputChange}
// // //                   placeholder="Additional details about the alert..."
// // //                   rows="3"
// // //                 />
// // //               </div>

// // //               <div className="form-actions">
// // //                 <button
// // //                   type="button"
// // //                   className="btn btn-secondary"
// // //                   onClick={resetForm}
// // //                   disabled={loading}
// // //                 >
// // //                   Cancel
// // //                 </button>
// // //                 <button
// // //                   type="submit"
// // //                   className="btn btn-primary"
// // //                   disabled={loading}
// // //                 >
// // //                   <Save size={16} />
// // //                   {editingAlert ? "Update Alert" : "Create Alert"}
// // //                 </button>
// // //               </div>
// // //             </form>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* Loading state */}
// // //       {loading && <div className="loading">Loading...</div>}

// // //       {/* Alerts List */}
// // //       <div className="alerts-grid">
// // //         {alerts.map((alert) => (
// // //           <div
// // //             key={alert._id}
// // //             className={`alert-card ${alert.type
// // //               .toLowerCase()
// // //               .replace(" ", "-")} ${!alert.isActive ? "inactive" : ""}`}
// // //           >
// // //             <div className="alert-card-header">
// // //               <div className="alert-type">
// // //                 <AlertTriangle size={20} />
// // //                 {alert.type}
// // //               </div>
// // //               <div className="alert-date">
// // //                 <Calendar size={16} />
// // //                 {formatDate(alert.createdAt)}
// // //               </div>
// // //             </div>

// // //             <h3 className="alert-title">{alert.title}</h3>

// // //             <div className="alert-location">
// // //               <MapPin size={16} />
// // //               {alert.location}
// // //             </div>

// // //             {alert.description && (
// // //               <p className="alert-description">{alert.description}</p>
// // //             )}

// // //             <div className="alert-actions">
// // //               <button
// // //                 className="btn-action"
// // //                 onClick={() => toggleAlertStatus(alert._id)}
// // //                 title={alert.isActive ? "Deactivate" : "Activate"}
// // //               >
// // //                 {alert.isActive ? (
// // //                   <ToggleRight size={20} />
// // //                 ) : (
// // //                   <ToggleLeft size={20} />
// // //                 )}
// // //               </button>

// // //               <button
// // //                 className="btn-action"
// // //                 onClick={() => startEdit(alert)}
// // //                 title="Edit Alert"
// // //               >
// // //                 <Edit size={18} />
// // //               </button>

// // //               <button
// // //                 className="btn-action btn-danger"
// // //                 onClick={() => deleteAlert(alert._id)}
// // //                 title="Delete Alert"
// // //               >
// // //                 <Trash2 size={18} />
// // //               </button>
// // //             </div>

// // //             {!alert.isActive && <div className="inactive-badge">Inactive</div>}
// // //           </div>
// // //         ))}
// // //       </div>

// // //       {alerts.length === 0 && !loading && (
// // //         <div className="empty-state">
// // //           <AlertTriangle size={48} />
// // //           <h3>No alerts found</h3>
// // //           <p>Create your first alert to get started</p>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default AlertComponent;
// // //---------------------------------------------------NEW CODE----------------------------------------------------------------------------------
// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import {
// //   AlertTriangle,
// //   Plus,
// //   Edit,
// //   Trash2,
// //   MapPin,
// //   Calendar,
// //   ToggleLeft,
// //   ToggleRight,
// //   Save,
// //   X,
// //   RefreshCw,
// // } from "lucide-react";
// // import "./AlertComponent.css";

// // const AlertComponent = () => {
// //   const [alerts, setAlerts] = useState([]);
// //   const [showForm, setShowForm] = useState(false);
// //   const [editingAlert, setEditingAlert] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(null);
// //   const [formData, setFormData] = useState({
// //     type: "Red Alert",
// //     title: "",
// //     location: "",
// //     description: "",
// //   });

// //   const API_BASE_URL = "http://localhost:3000/alerts";

// //   // Fetch all alerts
// //   const fetchAlerts = async () => {
// //     try {
// //       setLoading(true);
// //       setError(null);
// //       const response = await axios.get(API_BASE_URL);
// //       setAlerts(response.data.data || []);
// //     } catch (error) {
// //       console.error("Error fetching alerts:", error);
// //       setError(
// //         "Failed to fetch alerts. Please check if the server is running."
// //       );
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchAlerts();
// //   }, []);

// //   // Handle form input changes
// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({
// //       ...prev,
// //       [name]: value,
// //     }));
// //   };

// //   // Reset form
// //   const resetForm = () => {
// //     setFormData({
// //       type: "Red Alert",
// //       title: "",
// //       location: "",
// //       description: "",
// //     });
// //     setShowForm(false);
// //     setEditingAlert(null);
// //     setError(null);
// //   };

// //   // Show success message
// //   const showSuccessMessage = (message) => {
// //     // You can replace this with a proper toast notification
// //     alert(message);
// //   };

// //   // Create new alert
// //   const createAlert = async (e) => {
// //     e.preventDefault();
// //     try {
// //       setLoading(true);
// //       setError(null);
// //       await axios.post(API_BASE_URL, formData);
// //       await fetchAlerts();
// //       resetForm();
// //       showSuccessMessage("Alert created successfully!");
// //     } catch (error) {
// //       console.error("Error creating alert:", error);
// //       setError("Failed to create alert. Please try again.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Update alert
// //   const updateAlert = async (e) => {
// //     e.preventDefault();
// //     try {
// //       setLoading(true);
// //       setError(null);
// //       await axios.put(`${API_BASE_URL}/${editingAlert}`, formData);
// //       await fetchAlerts();
// //       resetForm();
// //       showSuccessMessage("Alert updated successfully!");
// //     } catch (error) {
// //       console.error("Error updating alert:", error);
// //       setError("Failed to update alert. Please try again.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Delete alert
// //   const deleteAlert = async (id) => {
// //     if (window.confirm("Are you sure you want to delete this alert?")) {
// //       try {
// //         setLoading(true);
// //         await axios.delete(`${API_BASE_URL}/${id}`);
// //         await fetchAlerts();
// //         showSuccessMessage("Alert deleted successfully!");
// //       } catch (error) {
// //         console.error("Error deleting alert:", error);
// //         setError("Failed to delete alert. Please try again.");
// //       } finally {
// //         setLoading(false);
// //       }
// //     }
// //   };

// //   // Toggle alert status
// //   const toggleAlertStatus = async (id) => {
// //     try {
// //       await axios.patch(`${API_BASE_URL}/${id}/toggle`);
// //       await fetchAlerts();
// //     } catch (error) {
// //       console.error("Error toggling alert status:", error);
// //       setError("Failed to update alert status. Please try again.");
// //     }
// //   };

// //   // Start editing
// //   const startEdit = (alert) => {
// //     setEditingAlert(alert._id);
// //     setFormData({
// //       type: alert.type,
// //       title: alert.title,
// //       location: alert.location,
// //       description: alert.description || "",
// //     });
// //     setShowForm(true);
// //   };

// //   // Format date
// //   const formatDate = (dateString) => {
// //     return new Date(dateString).toLocaleDateString("en-GB", {
// //       day: "2-digit",
// //       month: "short",
// //       year: "numeric",
// //     });
// //   };

// //   return (
// //     <div className="alert-main-container">
// //       <div className="alert-content">
// //         <div className="alert-header">
// //           <div className="alert-title-section">
// //             <h1>Alert Management System</h1>
// //             <p className="alert-subtitle">Manage and monitor safety alerts</p>
// //           </div>
// //           <div className="alert-actions-section">
// //             <button
// //               className="btn btn-refresh"
// //               onClick={fetchAlerts}
// //               disabled={loading}
// //               title="Refresh alerts"
// //             >
// //               <RefreshCw size={18} className={loading ? "spinning" : ""} />
// //               Refresh
// //             </button>
// //             <button
// //               className="btn btn-primary"
// //               onClick={() => setShowForm(true)}
// //               disabled={loading}
// //             >
// //               <Plus size={20} />
// //               Create New Alert
// //             </button>
// //           </div>
// //         </div>

// //         {/* Error Message */}
// //         {error && (
// //           <div className="error-message">
// //             <AlertTriangle size={20} />
// //             {error}
// //             <button className="error-close" onClick={() => setError(null)}>
// //               <X size={16} />
// //             </button>
// //           </div>
// //         )}

// //         {/* Alert Form Modal */}
// //         {showForm && (
// //           <div className="alert-form-overlay">
// //             <div className="alert-form">
// //               <div className="form-header">
// //                 <h2>{editingAlert ? "Edit Alert" : "Create New Alert"}</h2>
// //                 <button className="btn-close" onClick={resetForm} type="button">
// //                   <X size={20} />
// //                 </button>
// //               </div>

// //               <form onSubmit={editingAlert ? updateAlert : createAlert}>
// //                 <div className="form-group">
// //                   <label htmlFor="type">Alert Type *</label>
// //                   <select
// //                     id="type"
// //                     name="type"
// //                     value={formData.type}
// //                     onChange={handleInputChange}
// //                     required
// //                     className="form-select"
// //                   >
// //                     <option value="Red Alert">Red Alert</option>
// //                     <option value="Orange Alert">Orange Alert</option>
// //                     <option value="Yellow Alert">Yellow Alert</option>
// //                     <option value="Green Alert">Green Alert</option>
// //                   </select>
// //                 </div>

// //                 <div className="form-group">
// //                   <label htmlFor="title">Alert Title *</label>
// //                   <input
// //                     type="text"
// //                     id="title"
// //                     name="title"
// //                     value={formData.title}
// //                     onChange={handleInputChange}
// //                     placeholder="e.g., High Wave Alert, Tsunami Warning"
// //                     required
// //                     className="form-input"
// //                   />
// //                 </div>

// //                 <div className="form-group">
// //                   <label htmlFor="location">Location *</label>
// //                   <input
// //                     type="text"
// //                     id="location"
// //                     name="location"
// //                     value={formData.location}
// //                     onChange={handleInputChange}
// //                     placeholder="e.g., Marina Beach, Chennai, Tamil Nadu"
// //                     required
// //                     className="form-input"
// //                   />
// //                 </div>

// //                 <div className="form-group">
// //                   <label htmlFor="description">Description (Optional)</label>
// //                   <textarea
// //                     id="description"
// //                     name="description"
// //                     value={formData.description}
// //                     onChange={handleInputChange}
// //                     placeholder="Additional details about the alert, safety measures, expected duration..."
// //                     rows="4"
// //                     className="form-textarea"
// //                   />
// //                 </div>

// //                 <div className="form-actions">
// //                   <button
// //                     type="button"
// //                     className="btn btn-secondary"
// //                     onClick={resetForm}
// //                     disabled={loading}
// //                   >
// //                     Cancel
// //                   </button>
// //                   <button
// //                     type="submit"
// //                     className="btn btn-primary"
// //                     disabled={loading}
// //                   >
// //                     <Save size={16} />
// //                     {editingAlert ? "Update Alert" : "Create Alert"}
// //                   </button>
// //                 </div>
// //               </form>
// //             </div>
// //           </div>
// //         )}

// //         {/* Loading state */}
// //         {loading && alerts.length === 0 && (
// //           <div className="loading-container">
// //             <RefreshCw size={24} className="spinning" />
// //             <p>Loading alerts...</p>
// //           </div>
// //         )}

// //         {/* Alerts Grid */}
// //         <div className="alerts-grid">
// //           {alerts.map((alert) => (
// //             <div
// //               key={alert._id}
// //               className={`alert-card ${alert.type
// //                 .toLowerCase()
// //                 .replace(" ", "-")} ${!alert.isActive ? "inactive" : ""}`}
// //             >
// //               <div className="alert-card-header">
// //                 <div className="alert-type">
// //                   <AlertTriangle size={18} />
// //                   <span>{alert.type}</span>
// //                 </div>
// //                 <div className="alert-date">
// //                   <Calendar size={14} />
// //                   <span>{formatDate(alert.createdAt)}</span>
// //                 </div>
// //               </div>

// //               <h3 className="alert-title">{alert.title}</h3>

// //               <div className="alert-location">
// //                 <MapPin size={16} />
// //                 <span>{alert.location}</span>
// //               </div>

// //               {alert.description && (
// //                 <p className="alert-description">{alert.description}</p>
// //               )}

// //               <div className="alert-actions">
// //                 <button
// //                   className={`btn-action ${
// //                     alert.isActive ? "active" : "inactive"
// //                   }`}
// //                   onClick={() => toggleAlertStatus(alert._id)}
// //                   title={alert.isActive ? "Deactivate Alert" : "Activate Alert"}
// //                 >
// //                   {alert.isActive ? (
// //                     <ToggleRight size={18} />
// //                   ) : (
// //                     <ToggleLeft size={18} />
// //                   )}
// //                 </button>

// //                 <button
// //                   className="btn-action edit"
// //                   onClick={() => startEdit(alert)}
// //                   title="Edit Alert"
// //                 >
// //                   <Edit size={16} />
// //                 </button>

// //                 <button
// //                   className="btn-action delete"
// //                   onClick={() => deleteAlert(alert._id)}
// //                   title="Delete Alert"
// //                 >
// //                   <Trash2 size={16} />
// //                 </button>
// //               </div>

// //               {!alert.isActive && (
// //                 <div className="inactive-badge">Inactive</div>
// //               )}
// //             </div>
// //           ))}
// //         </div>

// //         {/* Empty State */}
// //         {alerts.length === 0 && !loading && (
// //           <div className="empty-state">
// //             <div className="empty-state-icon">
// //               <AlertTriangle size={64} />
// //             </div>
// //             <h3>No alerts found</h3>
// //             <p>Create your first alert to start monitoring safety conditions</p>
// //             <button
// //               className="btn btn-primary"
// //               onClick={() => setShowForm(true)}
// //             >
// //               <Plus size={20} />
// //               Create First Alert
// //             </button>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default AlertComponent;

// // components/AlertComponent.jsx
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   AlertTriangle,
//   Plus,
//   Edit,
//   Trash2,
//   MapPin,
//   Calendar,
//   ToggleLeft,
//   ToggleRight,
//   Save,
//   X,
//   RefreshCw,
//   Eye,
//   EyeOff,
// } from "lucide-react";
// import "./AlertComponent.css";

// const AlertComponent = () => {
//   const [alerts, setAlerts] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [editingAlert, setEditingAlert] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const [formData, setFormData] = useState({
//     type: "Red Alert",
//     title: "",
//     location: "",
//     description: "",
//   });

//   const API_BASE_URL = "http://localhost:3000/alerts";

//   // Auto-hide messages after 3 seconds
//   useEffect(() => {
//     if (error || success) {
//       const timer = setTimeout(() => {
//         setError(null);
//         setSuccess(null);
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [error, success]);

//   // Fetch all alerts
//   const fetchAlerts = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await axios.get(API_BASE_URL);
//       setAlerts(response.data.data || []);
//     } catch (error) {
//       console.error("Error fetching alerts:", error);
//       setError("Failed to fetch alerts. Please check your connection.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAlerts();
//   }, []);

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Reset form
//   const resetForm = () => {
//     setFormData({
//       type: "Red Alert",
//       title: "",
//       location: "",
//       description: "",
//     });
//     setShowForm(false);
//     setEditingAlert(null);
//     setError(null);
//   };

//   // Show success message
//   const showSuccessMessage = (message) => {
//     setSuccess(message);
//   };

//   // Create new alert
//   const createAlert = async (e) => {
//     e.preventDefault();

//     // Basic validation
//     if (!formData.title.trim() || !formData.location.trim()) {
//       setError("Title and location are required fields.");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError(null);
//       await axios.post(API_BASE_URL, formData);
//       await fetchAlerts();
//       resetForm();
//       showSuccessMessage("Alert created successfully!");
//     } catch (error) {
//       console.error("Error creating alert:", error);
//       setError(
//         error.response?.data?.message ||
//           "Failed to create alert. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Update alert
//   const updateAlert = async (e) => {
//     e.preventDefault();

//     // Basic validation
//     if (!formData.title.trim() || !formData.location.trim()) {
//       setError("Title and location are required fields.");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError(null);
//       await axios.put(`${API_BASE_URL}/${editingAlert}`, formData);
//       await fetchAlerts();
//       resetForm();
//       showSuccessMessage("Alert updated successfully!");
//     } catch (error) {
//       console.error("Error updating alert:", error);
//       setError(
//         error.response?.data?.message ||
//           "Failed to update alert. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Delete alert
//   const deleteAlert = async (id, title) => {
//     if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
//       try {
//         setLoading(true);
//         await axios.delete(`${API_BASE_URL}/${id}`);
//         await fetchAlerts();
//         showSuccessMessage("Alert deleted successfully!");
//       } catch (error) {
//         console.error("Error deleting alert:", error);
//         setError("Failed to delete alert. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   // Toggle alert status
//   const toggleAlertStatus = async (id) => {
//     try {
//       await axios.patch(`${API_BASE_URL}/${id}/toggle`);
//       await fetchAlerts();
//     } catch (error) {
//       console.error("Error toggling alert status:", error);
//       setError("Failed to update alert status. Please try again.");
//     }
//   };

//   // Start editing
//   const startEdit = (alert) => {
//     setEditingAlert(alert._id);
//     setFormData({
//       type: alert.type,
//       title: alert.title,
//       location: alert.location,
//       description: alert.description || "",
//     });
//     setShowForm(true);
//   };

//   // Format date
//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString("en-GB", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     });
//   };

//   // Get alert type color class
//   const getAlertColorClass = (type) => {
//     return type.toLowerCase().replace(" ", "-");
//   };

//   return (
//     <div className="alert-container">
//       {/* Header Section */}
//       <div className="alert-header">
//         <div className="header-left">
//           <h1>Alert Management System</h1>
//           <p className="header-subtitle">Monitor and manage emergency alerts</p>
//         </div>
//         <div className="header-actions">
//           <button
//             className="btn btn-refresh"
//             onClick={fetchAlerts}
//             disabled={loading}
//             title="Refresh alerts"
//           >
//             <RefreshCw size={18} className={loading ? "spinning" : ""} />
//           </button>
//           <button
//             className="btn btn-primary"
//             onClick={() => setShowForm(true)}
//             disabled={loading}
//           >
//             <Plus size={20} />
//             Create New Alert
//           </button>
//         </div>
//       </div>

//       {/* Success/Error Messages */}
//       {success && (
//         <div className="message message-success">
//           <span>{success}</span>
//           <button onClick={() => setSuccess(null)} className="message-close">
//             <X size={16} />
//           </button>
//         </div>
//       )}

//       {error && (
//         <div className="message message-error">
//           <span>{error}</span>
//           <button onClick={() => setError(null)} className="message-close">
//             <X size={16} />
//           </button>
//         </div>
//       )}

//       {/* Alert Form Modal */}
//       {showForm && (
//         <div
//           className="alert-form-overlay"
//           onClick={(e) => e.target === e.currentTarget && resetForm()}
//         >
//           <div className="alert-form">
//             <div className="form-header">
//               <h2>{editingAlert ? "Edit Alert" : "Create New Alert"}</h2>
//               <button className="btn-close" onClick={resetForm} type="button">
//                 <X size={20} />
//               </button>
//             </div>

//             <form onSubmit={editingAlert ? updateAlert : createAlert}>
//               <div className="form-group">
//                 <label htmlFor="type">Alert Type *</label>
//                 <select
//                   id="type"
//                   name="type"
//                   value={formData.type}
//                   onChange={handleInputChange}
//                   required
//                   className="form-select"
//                 >
//                   <option value="Red Alert">Red Alert</option>
//                   <option value="Orange Alert">Orange Alert</option>
//                   <option value="Yellow Alert">Yellow Alert</option>
//                   <option value="Green Alert">Green Alert</option>
//                 </select>
//               </div>

//               <div className="form-group">
//                 <label htmlFor="title">Alert Title *</label>
//                 <input
//                   type="text"
//                   id="title"
//                   name="title"
//                   value={formData.title}
//                   onChange={handleInputChange}
//                   placeholder="e.g., High Wave Alert"
//                   required
//                   className="form-input"
//                 />
//               </div>

//               <div className="form-group">
//                 <label htmlFor="location">Location *</label>
//                 <input
//                   type="text"
//                   id="location"
//                   name="location"
//                   value={formData.location}
//                   onChange={handleInputChange}
//                   placeholder="e.g., Marina Beach, Chennai, Tamil Nadu"
//                   required
//                   className="form-input"
//                 />
//               </div>

//               <div className="form-group">
//                 <label htmlFor="description">Description</label>
//                 <textarea
//                   id="description"
//                   name="description"
//                   value={formData.description}
//                   onChange={handleInputChange}
//                   placeholder="Additional details about the alert..."
//                   rows="4"
//                   className="form-textarea"
//                 />
//               </div>

//               <div className="form-actions">
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   onClick={resetForm}
//                   disabled={loading}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="btn btn-primary"
//                   disabled={loading}
//                 >
//                   <Save size={16} />
//                   {loading
//                     ? "Saving..."
//                     : editingAlert
//                     ? "Update Alert"
//                     : "Create Alert"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Stats Overview */}
//       <div className="stats-overview">
//         <div className="stat-card">
//           <div className="stat-number">{alerts.length}</div>
//           <div className="stat-label">Total Alerts</div>
//         </div>
//         <div className="stat-card">
//           <div className="stat-number">
//             {alerts.filter((a) => a.isActive).length}
//           </div>
//           <div className="stat-label">Active Alerts</div>
//         </div>
//         <div className="stat-card">
//           <div className="stat-number">
//             {alerts.filter((a) => !a.isActive).length}
//           </div>
//           <div className="stat-label">Inactive Alerts</div>
//         </div>
//         <div className="stat-card">
//           <div className="stat-number">
//             {alerts.filter((a) => a.type === "Red Alert").length}
//           </div>
//           <div className="stat-label">Red Alerts</div>
//         </div>
//       </div>

//       {/* Loading State */}
//       {loading && alerts.length === 0 && (
//         <div className="loading-state">
//           <RefreshCw size={24} className="spinning" />
//           <p>Loading alerts...</p>
//         </div>
//       )}

//       {/* Alerts Grid */}
//       <div className="alerts-grid">
//         {alerts.map((alert) => (
//           <div
//             key={alert._id}
//             className={`alert-card ${getAlertColorClass(alert.type)} ${
//               !alert.isActive ? "inactive" : ""
//             }`}
//           >
//             <div className="alert-card-header">
//               <div className="alert-type">
//                 <AlertTriangle size={18} />
//                 <span>{alert.type}</span>
//               </div>
//               <div className="alert-date">
//                 <Calendar size={14} />
//                 <span>{formatDate(alert.createdAt)}</span>
//               </div>
//             </div>

//             <h3 className="alert-title">{alert.title}</h3>

//             <div className="alert-location">
//               <MapPin size={14} />
//               <span>{alert.location}</span>
//             </div>

//             {alert.description && (
//               <p className="alert-description">{alert.description}</p>
//             )}

//             <div className="alert-actions">
//               <button
//                 className={`btn-action ${
//                   alert.isActive ? "active" : "inactive"
//                 }`}
//                 onClick={() => toggleAlertStatus(alert._id)}
//                 title={alert.isActive ? "Deactivate Alert" : "Activate Alert"}
//               >
//                 {alert.isActive ? <Eye size={16} /> : <EyeOff size={16} />}
//               </button>

//               <button
//                 className="btn-action edit"
//                 onClick={() => startEdit(alert)}
//                 title="Edit Alert"
//               >
//                 <Edit size={16} />
//               </button>

//               <button
//                 className="btn-action delete"
//                 onClick={() => deleteAlert(alert._id, alert.title)}
//                 title="Delete Alert"
//               >
//                 <Trash2 size={16} />
//               </button>
//             </div>

//             {!alert.isActive && <div className="inactive-badge">Inactive</div>}
//           </div>
//         ))}
//       </div>

//       {/* Empty State */}
//       {alerts.length === 0 && !loading && (
//         <div className="empty-state">
//           <AlertTriangle size={48} />
//           <h3>No alerts found</h3>
//           <p>
//             Create your first alert to get started with the monitoring system
//           </p>
//           <button className="btn btn-primary" onClick={() => setShowForm(true)}>
//             <Plus size={20} />
//             Create First Alert
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AlertComponent;

//-------------------------------------------------NEW CODE-----------------------------------------------------------------------------------

"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import {
  AlertTriangle,
  Plus,
  Edit,
  Trash2,
  MapPin,
  Calendar,
  Save,
  X,
  RefreshCw,
  Eye,
  EyeOff,
} from "lucide-react";
import "./AlertComponent.css";

const AlertComponent = () => {
  const [alerts, setAlerts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingAlert, setEditingAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [formData, setFormData] = useState({
    type: "Red Alert",
    title: "",
    location: "",
    description: "",
  });

  const API_BASE_URL = "http://localhost:3000/alerts";

  // Auto-hide messages after 3 seconds
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError(null);
        setSuccess(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  // Fetch all alerts
  const fetchAlerts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(API_BASE_URL);
      setAlerts(response.data.data || []);
    } catch (error) {
      console.error("Error fetching alerts:", error);
      setError("Failed to fetch alerts. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      type: "Red Alert",
      title: "",
      location: "",
      description: "",
    });
    setShowForm(false);
    setEditingAlert(null);
    setError(null);
  };

  // Show success message
  const showSuccessMessage = (message) => {
    setSuccess(message);
  };

  // Create new alert
  const createAlert = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.title.trim() || !formData.location.trim()) {
      setError("Title and location are required fields.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await axios.post(API_BASE_URL, formData);
      await fetchAlerts();
      resetForm();
      showSuccessMessage("Alert created successfully!");
    } catch (error) {
      console.error("Error creating alert:", error);
      setError(
        error.response?.data?.message ||
          "Failed to create alert. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Update alert
  const updateAlert = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.title.trim() || !formData.location.trim()) {
      setError("Title and location are required fields.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await axios.put(`${API_BASE_URL}/${editingAlert}`, formData);
      await fetchAlerts();
      resetForm();
      showSuccessMessage("Alert updated successfully!");
    } catch (error) {
      console.error("Error updating alert:", error);
      setError(
        error.response?.data?.message ||
          "Failed to update alert. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Delete alert
  const deleteAlert = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        setLoading(true);
        await axios.delete(`${API_BASE_URL}/${id}`);
        await fetchAlerts();
        showSuccessMessage("Alert deleted successfully!");
      } catch (error) {
        console.error("Error deleting alert:", error);
        setError("Failed to delete alert. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  // Toggle alert status
  const toggleAlertStatus = async (id) => {
    try {
      await axios.patch(`${API_BASE_URL}/${id}/toggle`);
      await fetchAlerts();
    } catch (error) {
      console.error("Error toggling alert status:", error);
      setError("Failed to update alert status. Please try again.");
    }
  };

  // Start editing
  const startEdit = (alert) => {
    setEditingAlert(alert._id);
    setFormData({
      type: alert.type,
      title: alert.title,
      location: alert.location,
      description: alert.description || "",
    });
    setShowForm(true);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Get alert type color class
  const getAlertColorClass = (type) => {
    return type.toLowerCase().replace(" ", "-");
  };

  return (
    <div className="alert-component-container">
      {/* Header Section */}
      <div className="alert-component-header">
        <div className="alert-component-header-left">
          <h1>Alert Management System</h1>
          <p className="alert-component-header-subtitle">
            Monitor and manage emergency alerts
          </p>
        </div>
        <div className="alert-component-header-actions">
          <button
            className="alert-component-btn alert-component-btn-refresh"
            onClick={fetchAlerts}
            disabled={loading}
            title="Refresh alerts"
          >
            <RefreshCw
              size={18}
              className={loading ? "alert-component-spinning" : ""}
            />
          </button>
          <button
            className="alert-component-btn alert-component-btn-primary"
            onClick={() => setShowForm(true)}
            disabled={loading}
          >
            <Plus size={20} />
            Create New Alert
          </button>
        </div>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="alert-component-message alert-component-message-success">
          <span>{success}</span>
          <button
            onClick={() => setSuccess(null)}
            className="alert-component-message-close"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {error && (
        <div className="alert-component-message alert-component-message-error">
          <span>{error}</span>
          <button
            onClick={() => setError(null)}
            className="alert-component-message-close"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Alert Form Modal */}
      {showForm && (
        <div
          className="alert-component-form-overlay"
          onClick={(e) => e.target === e.currentTarget && resetForm()}
        >
          <div className="alert-component-form">
            <div className="alert-component-form-header">
              <h2>{editingAlert ? "Edit Alert" : "Create New Alert"}</h2>
              <button
                className="alert-component-btn-close"
                onClick={resetForm}
                type="button"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={editingAlert ? updateAlert : createAlert}>
              <div className="alert-component-form-group">
                <label htmlFor="type">Alert Type *</label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                  className="alert-component-form-select"
                >
                  <option value="Red Alert">Red Alert</option>
                  <option value="Orange Alert">Orange Alert</option>
                  <option value="Yellow Alert">Yellow Alert</option>
                  <option value="Green Alert">Green Alert</option>
                </select>
              </div>

              <div className="alert-component-form-group">
                <label htmlFor="title">Alert Title *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., High Wave Alert"
                  required
                  className="alert-component-form-input"
                />
              </div>

              <div className="alert-component-form-group">
                <label htmlFor="location">Location *</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g., Marina Beach, Chennai, Tamil Nadu"
                  required
                  className="alert-component-form-input"
                />
              </div>

              <div className="alert-component-form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Additional details about the alert..."
                  rows="4"
                  className="alert-component-form-textarea"
                />
              </div>

              <div className="alert-component-form-actions">
                <button
                  type="button"
                  className="alert-component-btn alert-component-btn-secondary"
                  onClick={resetForm}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="alert-component-btn alert-component-btn-primary"
                  disabled={loading}
                >
                  <Save size={16} />
                  {loading
                    ? "Saving..."
                    : editingAlert
                    ? "Update Alert"
                    : "Create Alert"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Stats Overview */}
      <div className="alert-component-stats-overview">
        <div className="alert-component-stat-card">
          <div className="alert-component-stat-number">{alerts.length}</div>
          <div className="alert-component-stat-label">Total Alerts</div>
        </div>
        <div className="alert-component-stat-card">
          <div className="alert-component-stat-number">
            {alerts.filter((a) => a.isActive).length}
          </div>
          <div className="alert-component-stat-label">Active Alerts</div>
        </div>
        <div className="alert-component-stat-card">
          <div className="alert-component-stat-number">
            {alerts.filter((a) => !a.isActive).length}
          </div>
          <div className="alert-component-stat-label">Inactive Alerts</div>
        </div>
        <div className="alert-component-stat-card">
          <div className="alert-component-stat-number">
            {alerts.filter((a) => a.type === "Red Alert").length}
          </div>
          <div className="alert-component-stat-label">Red Alerts</div>
        </div>
      </div>

      {/* Loading State */}
      {loading && alerts.length === 0 && (
        <div className="alert-component-loading-state">
          <RefreshCw size={24} className="alert-component-spinning" />
          <p>Loading alerts...</p>
        </div>
      )}

      {/* Alerts Grid */}
      <div className="alert-component-alerts-grid">
        {alerts.map((alert) => (
          <div
            key={alert._id}
            className={`alert-component-alert-card alert-component-${getAlertColorClass(
              alert.type
            )} ${!alert.isActive ? "alert-component-inactive" : ""}`}
          >
            <div className="alert-component-alert-card-header">
              <div className="alert-component-alert-type">
                <AlertTriangle size={18} />
                <span>{alert.type}</span>
              </div>
              <div className="alert-component-alert-date">
                <Calendar size={14} />
                <span>{formatDate(alert.createdAt)}</span>
              </div>
            </div>

            <h3 className="alert-component-alert-title">{alert.title}</h3>

            <div className="alert-component-alert-location">
              <MapPin size={14} />
              <span>{alert.location}</span>
            </div>

            {alert.description && (
              <p className="alert-component-alert-description">
                {alert.description}
              </p>
            )}

            <div className="alert-component-alert-actions">
              <button
                className={`alert-component-btn-action ${
                  alert.isActive
                    ? "alert-component-active"
                    : "alert-component-inactive"
                }`}
                onClick={() => toggleAlertStatus(alert._id)}
                title={alert.isActive ? "Deactivate Alert" : "Activate Alert"}
              >
                {alert.isActive ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>

              <button
                className="alert-component-btn-action alert-component-edit"
                onClick={() => startEdit(alert)}
                title="Edit Alert"
              >
                <Edit size={16} />
              </button>

              <button
                className="alert-component-btn-action alert-component-delete"
                onClick={() => deleteAlert(alert._id, alert.title)}
                title="Delete Alert"
              >
                <Trash2 size={16} />
              </button>
            </div>

            {!alert.isActive && (
              <div className="alert-component-inactive-badge">Inactive</div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {alerts.length === 0 && !loading && (
        <div className="alert-component-empty-state">
          <AlertTriangle size={48} />
          <h3>No alerts found</h3>
          <p>
            Create your first alert to get started with the monitoring system
          </p>
          <button
            className="alert-component-btn alert-component-btn-primary"
            onClick={() => setShowForm(true)}
          >
            <Plus size={20} />
            Create First Alert
          </button>
        </div>
      )}
    </div>
  );
};

export default AlertComponent;

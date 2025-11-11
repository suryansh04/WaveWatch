// import React, { useState } from "react";
// import { ChevronDown, Bell, Settings, User, LogOut } from "lucide-react";
// import "./Header.css";

// const Header = () => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   // Close dropdown when clicking outside
//   const closeDropdown = () => {
//     setIsDropdownOpen(false);
//   };

//   return (
//     <header className="header">
//       <div className="header-content">
//         {/* Welcome Section */}
//         <div className="header-welcome">
//           <h1 className="welcome-text">Welcome Admin,👋</h1>
//           <p className="welcome-subtitle">
//             Monitor ocean safety and manage alerts
//           </p>
//         </div>

//         {/* Header Actions */}
//         <div className="header-actions">
//           {/* Notifications */}
//           {/* <button className="notification-btn">
//             <Bell size={20} />
//             <span className="notification-badge">3</span> */}
//           {/* </button> */}

//           {/* User Profile Dropdown */}
//           <div className="user-profile-container">
//             <button className="user-profile-btn" onClick={toggleDropdown}>
//               <div className="user-avatar">
//                 <img
//                   src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&auto=format&q=60"
//                   alt="Admin Avatar"
//                   className="avatar-image"
//                 />
//               </div>
//               <div className="user-info">
//                 <span className="user-name">Admin</span>
//                 <span className="user-role">Administrator</span>
//               </div>
//               <ChevronDown
//                 size={16}
//                 className={`dropdown-arrow ${
//                   isDropdownOpen ? "dropdown-arrow-open" : ""
//                 }`}
//               />
//             </button>

//             {/* Dropdown Menu */}
//             {isDropdownOpen && (
//               <>
//                 <div className="dropdown-overlay" onClick={closeDropdown}></div>
//                 <div className="dropdown-menu">
//                   <div className="dropdown-header">
//                     <div className="dropdown-avatar">
//                       <img
//                         src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&auto=format&q=60"
//                         alt="Admin Avatar"
//                       />
//                     </div>
//                     <div className="dropdown-user-info">
//                       <span className="dropdown-name">Administrator</span>
//                     </div>
//                   </div>

//                   <div className="dropdown-divider"></div>

//                   <div className="dropdown-divider"></div>

//                   <div className="dropdown-items">
//                     <a href="#" className="dropdown-item logout-item">
//                       <LogOut size={16} />
//                       <span>Sign Out</span>
//                     </a>
//                   </div>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

//-----------------------------NEW CODE ------------------------------------

import React, { useState } from "react";
import { ChevronDown, Bell, Settings, User, LogOut } from "lucide-react";
import "./Header.css";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <header className="hero-header">
      <div className="hero-header-content">
        {/* Welcome Section */}
        <div className="hero-header-welcome">
          <h1 className="hero-header-welcome-text">Welcome Admin,👋</h1>
          <p className="hero-header-welcome-subtitle">
            Monitor ocean safety and manage alerts
          </p>
        </div>

        {/* Header Actions */}
        <div className="hero-header-actions">
          {/* Notifications */}
          {/* <button className="hero-header-notification-btn">
            <Bell size={20} />
            <span className="hero-header-notification-badge">3</span> */}
          {/* </button> */}

          {/* User Profile Dropdown */}
          <div className="hero-header-user-profile-container">
            <button
              className="hero-header-user-profile-btn"
              onClick={toggleDropdown}
            >
              <div className="hero-header-user-avatar">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&auto=format&q=60"
                  alt="Admin Avatar"
                  className="hero-header-avatar-image"
                />
              </div>
              <div className="hero-header-user-info">
                <span className="hero-header-user-name">Admin</span>
                <span className="hero-header-user-role">Administrator</span>
              </div>
              <ChevronDown
                size={16}
                className={`hero-header-dropdown-arrow ${
                  isDropdownOpen ? "hero-header-dropdown-arrow-open" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <>
                <div
                  className="hero-header-dropdown-overlay"
                  onClick={closeDropdown}
                ></div>
                <div className="hero-header-dropdown-menu">
                  <div className="hero-header-dropdown-header">
                    <div className="hero-header-dropdown-avatar">
                      <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&auto=format&q=60"
                        alt="Admin Avatar"
                      />
                    </div>
                    <div className="hero-header-dropdown-user-info">
                      <span className="hero-header-dropdown-name">
                        Administrator
                      </span>
                    </div>
                  </div>

                  <div className="hero-header-dropdown-divider"></div>

                  <div className="hero-header-dropdown-divider"></div>

                  <div className="hero-header-dropdown-items">
                    <a
                      href="#"
                      className="hero-header-dropdown-item hero-header-logout-item"
                    >
                      <LogOut size={16} />
                      <span>Sign Out</span>
                    </a>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

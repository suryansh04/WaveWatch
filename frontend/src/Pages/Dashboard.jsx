import React from "react";
import Header from "../components/Header/Header";
import ActiveAlerts from "../components/ActiveAlerts/ActiveAlerts";
import StatsCards from "../components/StatsCards/StatsCards";
import MapComponent from "../components/MapComponent/MapComponent";
import LineChartComponent from "../components/LineCharts/LineChartComponent";
import { Line, LineChart } from "recharts";
const Dashboard = () => {
  return (
    <div>
      <Header />
      <div className="main-content">
        <div className="left-section">
          <ActiveAlerts />
          <div className="map-container">
            <MapComponent />
          </div>
        </div>

        <div className="right-section">
          <StatsCards />
          <LineChartComponent />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

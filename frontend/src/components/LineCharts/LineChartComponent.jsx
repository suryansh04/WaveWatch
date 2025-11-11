import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./LineChartComponent.css";

const LineChartComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE = "http://localhost:3000";

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/reports`);
        const json = await res.json();

        // The controller returns: { message: "...", reports: [...] }
        const reports = json.reports || [];

        // Count reports by reportedAt date (converted to local date string)
        const counts = {};
        reports.forEach((r) => {
          // handle different possible field names: reportedAt or createdAt
          const ts = r.reportedAt || r.createdAt || r.reportedAt;
          const d = ts ? new Date(ts) : null;
          const date = d ? d.toLocaleDateString() : "Unknown";
          counts[date] = (counts[date] || 0) + 1;
        });

        // Transform to array sorted by date (ascending)
        const formatted = Object.keys(counts)
          .map((dateStr) => {
            // try to convert back to Date for sorting; fallback to the string
            const parts = dateStr.split("/");
            // Can't reliably parse localized strings, so use original reports to build Date array
            return { date: dateStr, reports: counts[dateStr] };
          })
          // sort by date by converting to Date object where possible (month/day/year or day/month/year vary by locale)
          .sort((a, b) => {
            // Try parsing with Date — if fails, keep string compare
            const da = new Date(a.date);
            const db = new Date(b.date);
            if (!isNaN(da) && !isNaN(db)) return da - db;
            return a.date.localeCompare(b.date);
          });

        // If very few dates, optionally fill last 7 days with zeros (helps chart look consistent)
        if (formatted.length === 0) {
          // no data - show placeholders
          setData([{ date: "No data", reports: 0 }]);
        } else {
          setData(formatted);
        }
      } catch (err) {
        console.error("Error fetching reports for chart:", err);
        setData([{ date: "Error", reports: 0 }]);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [API_BASE]);

  return (
    <div className="line-chart-card">
      <div className="line-chart-header">
        <h3>Alerts Over Time</h3>
        <p className="line-chart-sub">Number of reports by date</p>
      </div>

      <div className="line-chart-body">
        {loading ? (
          <div className="chart-loading">Loading chart...</div>
        ) : (
          <ResponsiveContainer width="100%" height={320}>
            <LineChart
              data={data}
              margin={{ top: 10, right: 20, left: -10, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="reports"
                stroke="#0ea5e9" /* sky-500 */
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default LineChartComponent;

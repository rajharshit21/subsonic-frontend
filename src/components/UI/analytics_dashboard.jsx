// Location: frontend/src/components/analytics_dashboard.jsx

import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function AnalyticsDashboard() {
  const [filterStats, setFilterStats] = useState([]);
  const [dailyStats, setDailyStats] = useState([]);
  const [sessionTable, setSessionTable] = useState([]);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filterName, setFilterName] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    fetch("/analytics/filters")
      .then((res) => res.json())
      .then((data) =>
        setFilterStats(
          Object.entries(data).map(([name, count]) => ({ name, count }))
        )
      );

    fetch("/analytics/daily")
      .then((res) => res.json())
      .then((data) =>
        setDailyStats(data.map(([date, count]) => ({ date, count })))
      );

    fetchSessions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchSessions = () => {
    const params = new URLSearchParams();
    if (startDate) params.append("start_date", startDate);
    if (endDate) params.append("end_date", endDate);
    if (filterName) params.append("filter_name", filterName);
    if (userId) params.append("user_id", userId);

    fetch(`/analytics/sessions?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => setSessionTable(data));
  };

  return (
    <section
      id="analytics"
      className="p-6 sm:p-8 bg-[#2D283E] text-[#D1D7E0] rounded-2xl shadow-xl max-w-6xl mx-auto space-y-10"
    >
      <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
        📊 SubSonic Analytics Dashboard
      </h1>

      {/* Filters */}
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex flex-col">
          <label className="text-sm mb-1">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-3 py-2 rounded bg-[#D1D7E0] text-black"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm mb-1">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="px-3 py-2 rounded bg-[#D1D7E0] text-black"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm mb-1">Filter Name</label>
          <input
            type="text"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            placeholder="clarity, pitch..."
            className="px-3 py-2 rounded bg-[#D1D7E0] text-black"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm mb-1">User ID</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="optional"
            className="px-3 py-2 rounded bg-[#D1D7E0] text-black"
          />
        </div>
      </div>

      <button
        onClick={fetchSessions}
        className="mt-4 w-full sm:w-auto bg-[#802BB1] hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-xl"
      >
        Apply Filters
      </button>

      {/* Filter Usage Bar Chart */}
      <div>
        <h2 className="text-xl font-semibold mb-4">🔧 Filter Usage</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={filterStats}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="name" stroke="#D1D7E0" />
            <YAxis stroke="#D1D7E0" />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#56E39F" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Daily Usage Line Chart */}
      <div>
        <h2 className="text-xl font-semibold mb-4">📅 Daily Transformations</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dailyStats}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="date" stroke="#D1D7E0" />
            <YAxis stroke="#D1D7E0" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#FFCB74" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Session Table */}
      <div>
        <h2 className="text-xl font-semibold mb-4">🕒 Session Logs</h2>
        <div className="overflow-auto max-h-[420px] border border-[#444] rounded-lg">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-[#1F1B2A] sticky top-0 text-[#D1D7E0]">
              <tr>
                <th className="p-2 border border-[#333]">Date</th>
                <th className="p-2 border border-[#333]">User</th>
                <th className="p-2 border border-[#333]">Filters</th>
                <th className="p-2 border border-[#333]">Duration</th>
                <th className="p-2 border border-[#333]">Prompt</th>
              </tr>
            </thead>
            <tbody>
              {sessionTable.map((s) => (
                <tr key={s.id} className="hover:bg-[#3A3350]">
                  <td className="p-2 border border-[#333]">
                    {new Date(s.timestamp).toLocaleDateString()}
                  </td>
                  <td className="p-2 border border-[#333]">
                    {s.user_id || "Guest"}
                  </td>
                  <td className="p-2 border border-[#333]">
                    {s.filters_applied}
                  </td>
                  <td className="p-2 border border-[#333]">
                    {s.duration.toFixed(2)}s
                  </td>
                  <td className="p-2 border border-[#333]">
                    {s.style_prompt || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

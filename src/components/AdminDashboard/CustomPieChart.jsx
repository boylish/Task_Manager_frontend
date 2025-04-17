import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const STATUS_COLORS = {
  Pending: "#F87171",        // red
  "In Progress": "#FBBF24",  // yellow
  Completed: "#34D399",      // green
};

const CustomPieChart = ({ data = [] }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return <p className="text-center text-gray-500">No data available</p>;
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <ResponsiveContainer width="100%" height={325}>
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="status"
            cx="50%"
            cy="50%"
            outerRadius={70}
            innerRadius={40}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={STATUS_COLORS[entry.status] || "#8884d8"}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => [`${value}`, name]}
            contentStyle={{ fontSize: "10px" }}
          />
          <Legend
            verticalAlign="bottom"
            align="center"
            iconType="circle"
            wrapperStyle={{
              fontSize: "10px",
              marginTop: "10px",
              padding: "0 10px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomPieChart;

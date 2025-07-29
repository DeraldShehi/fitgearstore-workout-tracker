import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip);

const ProgressChart = ({ workouts }) => {
  const [weeklyData, setWeeklyData] = useState({});

  useEffect(() => {
    const data = {};
    workouts.forEach((w) => {
      const day = new Date(w.date).toLocaleDateString("en-US", {
        weekday: "short",
      });
      data[day] = (data[day] || 0) + 1;
    });
    setWeeklyData(data);
  }, [workouts]);

  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Workouts",
        data: [
          weeklyData["Mon"] || 0,
          weeklyData["Tue"] || 0,
          weeklyData["Wed"] || 0,
          weeklyData["Thu"] || 0,
          weeklyData["Fri"] || 0,
          weeklyData["Sat"] || 0,
          weeklyData["Sun"] || 0,
        ],
        backgroundColor: "#3b82f6",
        borderRadius: 6,
      },
    ],
  };

  return (
    <div className="bg-blue-50 p-4 rounded-xl shadow">
      <h2 className="font-semibold text-xl text-blue-700 mb-3">
        Weekly Progress
      </h2>
      <Bar data={chartData} />
    </div>
  );
};

export default ProgressChart;

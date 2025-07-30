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

const ProgressChart = ({ workouts, darkMode }) => {
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
        backgroundColor: darkMode ? "#60a5fa" : "#3b82f6",
        borderRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        backgroundColor: darkMode ? "#374151" : "#ffffff",
        titleColor: darkMode ? "#ffffff" : "#1f2937",
        bodyColor: darkMode ? "#ffffff" : "#1f2937",
        borderColor: darkMode ? "#6b7280" : "#e5e7eb",
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: darkMode ? "#d1d5db" : "#374151",
        },
        grid: {
          color: darkMode ? "#4b5563" : "#e5e7eb",
        },
      },
      x: {
        ticks: {
          color: darkMode ? "#d1d5db" : "#374151",
        },
        grid: {
          color: darkMode ? "#4b5563" : "#e5e7eb",
        },
      },
    },
  };

  return (
    <div className={`card ${darkMode ? "dark-mode" : ""}`}>
      <h2 className={`card-title ${darkMode ? "dark-mode" : ""}`}>
        Weekly Progress
      </h2>
      <div className="chart-container">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default ProgressChart;

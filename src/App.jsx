import { useEffect, useState } from "react";
import WorkoutForm from "./components/WorkoutForm";
import WorkoutList from "./components/WorkoutList";
import ProgressChart from "./components/ProgressChart";
import { db, ref, set, push, onValue, remove } from "./firebase";

const App = () => {
  const [workouts, setWorkouts] = useState([]);

  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem("darkMode");
    return stored ? JSON.parse(stored) : false;
  });

  useEffect(() => {
    const workoutsRef = ref(db, "workouts");
    onValue(workoutsRef, (snapshot) => {
      const data = snapshot.val();
      const loaded = data
        ? Object.entries(data).map(([id, val]) => ({ id, ...val }))
        : [];
      setWorkouts(loaded);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const addWorkout = (workout) => {
    const workoutsRef = ref(db, "workouts");
    push(workoutsRef, {
      ...workout,
      date: new Date().toISOString(),
    });
  };

  const deleteWorkout = (id) => {
    const workoutRef = ref(db, `workouts/${id}`);
    remove(workoutRef);
  };

  const resetAll = () => {
    if (confirm("Are you sure you want to delete all workouts?")) {
      const workoutsRef = ref(db, "workouts");
      remove(workoutsRef);
    }
  };

  return (
    <div
      className={`min-h-screen px-4 py-8 ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-br from-blue-50 to-blue-200 text-gray-900"
      }`}
    >
      <div className="w-full max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-center text-orange-700 dark:text-orange-700 w-full">
            🏋️ FitGearStore - Workout Tracker App
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="ml-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded shadow"
          >
            {darkMode ? "🌞 Light" : "🌙 Dark"}
          </button>
        </div>
        <WorkoutForm onAdd={addWorkout} />
        <WorkoutList workouts={workouts} onDelete={deleteWorkout} />
        <div className="text-right">
          <button
            onClick={resetAll}
            className="text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Reset All
          </button>
        </div>
        <ProgressChart workouts={workouts} />
      </div>
    </div>
  );
};

export default App;

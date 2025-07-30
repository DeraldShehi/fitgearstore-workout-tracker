import { useEffect, useState } from "react";
import WorkoutForm from "./components/WorkoutForm";
import WorkoutList from "./components/WorkoutList";
import ProgressChart from "./components/ProgressChart";
import { db, ref, push, onValue, remove } from "./components/firebase";
import "./index.css";

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
    <div className={`app-container ${darkMode ? "dark-mode" : "light-mode"}`}>
      <div className={`main-wrapper ${darkMode ? "dark-mode" : ""}`}>
        <div className="content-space">
          <div className="header">
            <h1 className="app-title">🏋️ FitGearStore - Workout Tracker App</h1>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`theme-toggle ${darkMode ? "dark-mode" : ""}`}
            >
              {darkMode ? "🌞 Light" : "🌙 Dark"}
            </button>
          </div>

          <WorkoutForm onAdd={addWorkout} darkMode={darkMode} />
          <WorkoutList
            workouts={workouts}
            onDelete={deleteWorkout}
            darkMode={darkMode}
          />

          <div className="reset-container">
            <button onClick={resetAll} className="btn btn-danger">
              Reset All
            </button>
          </div>

          <ProgressChart workouts={workouts} darkMode={darkMode} />
        </div>
      </div>
    </div>
  );
};

export default App;

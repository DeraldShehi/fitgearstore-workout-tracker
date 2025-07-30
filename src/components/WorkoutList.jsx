const WorkoutList = ({ workouts, onDelete, darkMode }) => {
  return (
    <div className={`card ${darkMode ? "dark-mode" : ""}`}>
      <h2 className={`card-title ${darkMode ? "dark-mode" : ""}`}>
        Today's Workouts
      </h2>
      {workouts.length === 0 ? (
        <p className="empty-state">No workouts added yet.</p>
      ) : (
        <div className="workout-list">
          {workouts.map((w, i) => (
            <div
              key={i}
              className={`workout-item fade-in ${darkMode ? "dark-mode" : ""}`}
            >
              <span className={`workout-info ${darkMode ? "dark-mode" : ""}`}>
                {w.name} – {w.reps} reps × {w.weight} kg
              </span>
              <button onClick={() => onDelete(w.id)} className="btn-text">
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkoutList;

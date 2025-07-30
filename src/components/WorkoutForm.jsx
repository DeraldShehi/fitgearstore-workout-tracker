import { useState } from "react";

const WorkoutForm = ({ onAdd, darkMode }) => {
  const [name, setName] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !reps || !weight) return;
    onAdd({ name, reps: Number(reps), weight: Number(weight) });
    setName("");
    setReps("");
    setWeight("");
  };

  return (
    <form onSubmit={handleSubmit} className="workout-form">
      <div className="form-row">
        <input
          type="text"
          placeholder="Exercise"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`form-input ${darkMode ? "dark-mode" : ""}`}
        />
        <input
          type="number"
          placeholder="Reps"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          className={`form-input ${darkMode ? "dark-mode" : ""}`}
        />
        <input
          type="number"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className={`form-input ${darkMode ? "dark-mode" : ""}`}
        />
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </div>
    </form>
  );
};

export default WorkoutForm;

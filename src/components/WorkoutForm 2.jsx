import { useState } from "react";

const WorkoutForm = ({ onAdd }) => {
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Exercise"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 dark:text-white bg-white dark:bg-gray-700"
        />

        <input
          type="number"
          placeholder="Reps"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 dark:text-white bg-white dark:bg-gray-700"
        />

        <input
          type="number"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 dark:text-white bg-white dark:bg-gray-700"
        />

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-lg"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default WorkoutForm;

const WorkoutList = ({ workouts, onDelete }) => {
  return (
    <div className="bg-blue-50 p-4 rounded-xl shadow">
      <h2 className="font-semibold text-xl text-blue-700 mb-3">
        Today's Workouts
      </h2>
      {workouts.length === 0 ? (
        <p className="text-gray-500 italic">No workouts added yet.</p>
      ) : (
        <ul className="space-y-2">
          {workouts.map((w, i) => (
            <li
              key={i}
              className="flex justify-between items-center border border-blue-200 bg-white p-3 rounded-lg hover:shadow"
            >
              <span className="text-blue-800">
                {w.name} – {w.reps} reps × {w.weight} kg
              </span>
              <button
                onClick={() => onDelete(w.id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WorkoutList;

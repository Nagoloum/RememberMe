export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  return (
    <li className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo._id, !todo.completed)}
          className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
        />
        <span
          className={`text-lg ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}
        >
          {todo.title}
        </span>
      </div>

      <button
        onClick={() => onDelete(todo._id)}
        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700 transition"
      >
        Supprimer
      </button>
    </li>
  );
}
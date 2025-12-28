import { useState } from 'react';

export default function TodoForm({ addTodo }) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTodo(title.trim());
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-8">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Ajouter une nouvelle tâche..."
        className="flex-1 px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
      >
        Ajouter
      </button>
    </form>
  );
}
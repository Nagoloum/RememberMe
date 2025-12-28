import TodoItem from './TodoItem';

export default function TodoList({ todos, onToggle, onDelete }) {
  if (todos.length === 0) {
    return (
      <p className="text-center text-gray-500 text-lg mt-10">
        Aucune tâche pour le moment. Ajoutez-en une ! 🚀
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
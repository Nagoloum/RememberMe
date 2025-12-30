// src/pages/HomePage.jsx
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import { useState, useEffect } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../services/api';

export default function HomePage({ user, onLogout }) {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await getTodos();
                setTodos(response.data);
            } catch (err) {
                console.error('Erreur chargement todos:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchTodos();
    }, []);

    const addTodo = async (title) => {
        try {
            const response = await createTodo(title);
            setTodos([...todos, response.data]);
        } catch (err) {
            alert('Erreur lors de l’ajout de la tâche');
        }
    };

    const toggleComplete = async (id, completed) => {
        try {
            const response = await updateTodo(id, { completed });
            setTodos(todos.map(t => t._id === id ? response.data : t));
        } catch (err) {
            alert('Erreur lors de la mise à jour');
        }
    };

    const removeTodo = async (id) => {
        if (!window.confirm('Supprimer cette tâche ?')) return;
        try {
            await deleteTodo(id);
            setTodos(todos.filter(t => t._id !== id));
        } catch (err) {
            alert('Erreur lors de la suppression');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-4xl font-bold text-gray-800">Ma Todo List</h1>
                    <div className="text-right">
                        {/* <p className="text-lg text-gray-700">Bonjour, <span className="font-semibold">{user.name || user.email}</span></p> */}
                        <button
                            onClick={onLogout}
                            className="mt-2 text-red-600 hover:underline font-medium"
                        >
                            Déconnexion
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-10">
                    <TodoForm addTodo={addTodo} />

                    {loading ? (
                        <p className="text-center text-gray-600 text-lg">Chargement de vos tâches...</p>
                    ) : todos.length === 0 ? (
                        <p className="text-center text-gray-500 text-lg mt-10">
                            Aucune tâche pour le moment. Ajoutez-en une ci-dessus ! ✨
                        </p>
                    ) : (
                        <TodoList
                            todos={todos}
                            onToggle={toggleComplete}
                            onDelete={removeTodo}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
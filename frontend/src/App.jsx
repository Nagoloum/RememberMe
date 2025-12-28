import { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { getTodos, createTodo, updateTodo, deleteTodo } from './services/api';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);  // null = pas connecté
  const [isLogin, setIsLogin] = useState(true);  // true = formulaire login, false = register
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  // Vérifier s'il y a un token au chargement
  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
      fetchTodos();  // Charger les todos si déjà connecté
    }
  }, []);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const response = await getTodos();
      setTodos(response.data);
    } catch (err) {
      console.error(err);
      // Ne plus afficher d'alert ici, c'est normal si déconnecté
    } finally {
      setLoading(false);
    }
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    const url = isLogin ? 'http://localhost:5000/api/auth/login' : 'http://localhost:5000/api/auth/register';

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        fetchTodos();  // Charger les todos après connexion
      } else {
        alert(data.message || 'Erreur d’authentification');
      }
    } catch (err) {
      alert('Erreur de connexion au serveur');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setTodos([]);
  };

  const addTodo = async (title) => {
    try {
      const response = await createTodo(title);
      setTodos([...todos, response.data]);
    } catch (err) {
      alert('Erreur lors de l’ajout');
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

  // Si pas connecté → afficher formulaire login/register
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
          <h2 className="text-3xl font-bold text-center mb-8">
            {isLogin ? 'Connexion' : 'Inscription'}
          </h2>

          <form onSubmit={handleAuth} className="space-y-4">
            {!isLogin && (
              <input
                type="text"
                placeholder="Nom"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}

            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="password"
              placeholder="Mot de passe"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              minLength="6"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {isLogin ? 'Se connecter' : "S'inscrire"}
            </button>
          </form>

          <p className="text-center mt-6">
            {isLogin ? 'Pas de compte ?' : 'Déjà un compte ?'}{' '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 hover:underline font-medium"
            >
              {isLogin ? 'Inscription' : 'Connexion'}
            </button>
          </p>
        </div>
      </div>
    );
  }

  // Si connecté → afficher la Todo List
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800">Ma Todo List</h1>
          <div className="text-right">
            <p className="text-gray-600">Connecté : {user.name || user.email}</p>
            <button
              onClick={handleLogout}
              className="text-red-600 hover:underline mt-2"
            >
              Déconnexion
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <TodoForm addTodo={addTodo} />

          {loading ? (
            <p className="text-center text-gray-600">Chargement...</p>
          ) : (
            <TodoList todos={todos} onToggle={toggleComplete} onDelete={removeTodo} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
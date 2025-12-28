import axios from 'axios';

// Change cette URL si ton backend tourne sur un autre port
const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

const token = localStorage.getItem('token');
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Intercepteur pour gérer les erreurs globalement (optionnel mais propre)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const getTodos = () => api.get('/todos');
export const createTodo = (title) => api.post('/todos', { title });
export const updateTodo = (id, updates) => api.put(`/todos/${id}`, updates);
export const deleteTodo = (id) => api.delete(`/todos/${id}`);
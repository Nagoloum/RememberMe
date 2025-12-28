const Todo = require('../models/Todo');

// Récupérer toutes les tâches de l'utilisateur connecté
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Créer une nouvelle tâche
exports.createTodo = async (req, res) => {
  try {
    const todo = new Todo({
      title: req.body.title,
      user: req.userId
    });
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Mettre à jour une tâche (toggle completed ou modifier le titre)
exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, user: req.userId });

    if (!todo) {
      return res.status(404).json({ message: 'Tâche non trouvée ou accès refusé' });
    }

    // Mise à jour des champs autorisés
    if (req.body.title !== undefined) {
      todo.title = req.body.title;
    }
    if (req.body.completed !== undefined) {
      todo.completed = req.body.completed;
    }

    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Supprimer une tâche
exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.userId });

    if (!todo) {
      return res.status(404).json({ message: 'Tâche non trouvée ou accès refusé' });
    }

    res.json({ message: 'Tâche supprimée avec succès' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const model = require('../model/todo.model');

exports.getTodos = async (req, res) => {
  try {
    const result = await model.getTodos();
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ msg: 'Internal server error' });
  }
};

exports.getTodoById = async (req, res) => {
  try {
    const result = await model.getTodoById(req.params.id);
    if (!result.rows || result.rows.length === 0) return res.status(404).json({ msg: 'Not found' });
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ msg: 'Internal server error' });
  }
};

exports.createTodo = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title || typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({ msg: 'Title is required' });
    }
    const result = await model.createTodo(title);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ msg: 'Internal server error' });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { title, completed } = req.body;
    if (!title || typeof title !== 'string' || title.trim() === '' || typeof completed !== 'boolean') {
      return res.status(400).json({ msg: 'Invalid data' });
    }
    const result = await model.updateTodo(req.params.id, title, completed);
    if (!result.rows || result.rows.length === 0) return res.status(404).json({ msg: 'Not found' });
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ msg: 'Internal server error' });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const result = await model.deleteTodo(req.params.id);
    if (!result.rows || result.rows.length === 0) return res.status(404).json({ msg: 'Not found' });
    res.status(200).json({ msg: 'Deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Internal server error' });
  }
};
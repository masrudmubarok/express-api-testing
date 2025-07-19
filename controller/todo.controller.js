const model = require('../model/todo.model');

exports.getTodos = async (req, res) => {
  const result = await model.getTodos();
  res.json(result.rows);
};

exports.getTodo = async (req, res) => {
  const result = await model.getTodoById(req.params.id);
  if (result.rows.length === 0) return res.status(404).json({ msg: 'Not found' });
  res.json(result.rows[0]);
};

exports.createTodo = async (req, res) => {
  const { title } = req.body;
  const result = await model.createTodo(title);
  res.status(201).json(result.rows[0]);
};

exports.updateTodo = async (req, res) => {
  const { title, completed } = req.body;
  const result = await model.updateTodo(req.params.id, title, completed);
  if (result.rows.length === 0) return res.status(404).json({ msg: 'Not found' });
  res.json(result.rows[0]);
};

exports.deleteTodo = async (req, res) => {
  const result = await model.deleteTodo(req.params.id);
  if (result.rows.length === 0) return res.status(404).json({ msg: 'Not found' });
  res.json({ msg: 'Deleted' });
};
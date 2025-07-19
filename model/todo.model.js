const db = require('../config/db');

const getTodos = () => db.query('SELECT * FROM todos');
const getTodoById = (id) => db.query('SELECT * FROM todos WHERE id = $1', [id]);
const createTodo = (title) => db.query('INSERT INTO todos (title) VALUES ($1) RETURNING *', [title]);
const updateTodo = (id, title, completed) => db.query('UPDATE todos SET title = $1, completed = $2 WHERE id = $3 RETURNING *', [title, completed, id]);
const deleteTodo = (id) => db.query('DELETE FROM todos WHERE id = $1 RETURNING *', [id]);

module.exports = { getTodos, getTodoById, createTodo, updateTodo, deleteTodo };
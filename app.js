const express = require('express');
const app = express();
const todoRoutes = require('./route/todo.route');

app.use(express.json());
app.use('/api/todos', todoRoutes);

module.exports = app;
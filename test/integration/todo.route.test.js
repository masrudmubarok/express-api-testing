const request = require('supertest');
const app = require('../../app');
const db = require('../../config/db');

// beforeAll(async () => {
//   await db.query("DELETE FROM todos");
// });

let todoId;

test('POST /api/todos', async () => {
  const res = await request(app).post('/api/todos').send({ title: 'Integration Test Todo' });
  expect(res.statusCode).toBe(201);
  expect(res.body.title).toBe('Integration Test Todo');
  todoId = res.body.id;
});

test('GET /api/todos', async () => {
  const res = await request(app).get('/api/todos');
  expect(res.body.length).toBeGreaterThan(0);
});

test('PUT /api/todos/:id', async () => {
  const res = await request(app).put(`/api/todos/${todoId}`).send({ title: 'Updated', completed: true });
  expect(res.body.title).toBe('Updated');
  expect(res.body.completed).toBe(true);
});

test('DELETE /api/todos/:id', async () => {
  const res = await request(app).delete(`/api/todos/${todoId}`);
  expect(res.body.msg).toBe('Deleted');
});

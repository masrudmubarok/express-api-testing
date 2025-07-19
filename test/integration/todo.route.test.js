const request = require('supertest');
const app = require('../../app');
const db = require('../../config/db');

describe('Todos API General Integration', () => {
  let todoId;

//   beforeAll(async () => {
//     await db.query('DELETE FROM todos');
//   });

//   afterAll(async () => {
//     await db.query('DELETE FROM todos');
//     await db.end();
//   });

  it('should create a new todo', async () => {
    const res = await request(app)
      .post('/api/todos')
      .send({ title: 'Integration Test Todo' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('Integration Test Todo');
    expect(res.body.completed).toBe(false);
    todoId = res.body.id;
  });

  it('should fail to create todo without title', async () => {
    const res = await request(app)
      .post('/api/todos')
      .send({});
    expect(res.statusCode).toBe(400);
  });

  it('should fail to create todo with wrong type', async () => {
    const res = await request(app)
      .post('/api/todos')
      .send({ title: 123 });
    expect(res.statusCode).toBe(400);
  });

  it('should get all todos', async () => {
    const res = await request(app).get('/api/todos');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should get todo by id', async () => {
    const res = await request(app).get(`/api/todos/${todoId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', todoId);
  });

  it('should return 404 for non-existent id', async () => {
    const res = await request(app).get('/api/todos/999999');
    expect(res.statusCode).toBe(404);
  });

  it('should update todo', async () => {
    const res = await request(app)
      .put(`/api/todos/${todoId}`)
      .send({ title: 'Updated', completed: true });
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Updated');
    expect(res.body.completed).toBe(true);
  });

  it('should fail to update todo with empty title', async () => {
    const res = await request(app)
      .put(`/api/todos/${todoId}`)
      .send({ title: '', completed: true });
    expect(res.statusCode).toBe(400);
  });

  it('should fail to update todo with wrong type', async () => {
    const res = await request(app)
      .put(`/api/todos/${todoId}`)
      .send({ title: 123, completed: 'yes' });
    expect(res.statusCode).toBe(400);
  });

  it('should return 404 for update non-existent id', async () => {
    const res = await request(app)
      .put('/api/todos/999999')
      .send({ title: 'Updated', completed: true });
    expect(res.statusCode).toBe(404);
  });

  it('should delete todo', async () => {
    const res = await request(app).delete(`/api/todos/${todoId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.msg).toBe('Deleted');
  });

  it('should return 404 for delete non-existent id', async () => {
    const res = await request(app).delete('/api/todos/999999');
    expect(res.statusCode).toBe(404);
  });
});

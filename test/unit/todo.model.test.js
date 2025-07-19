const model = require('../../model/todo.model');

test('Create todo', async () => {
  const res = await model.createTodo('Unit Test Todo');
  expect(res.rows[0]).toHaveProperty('title', 'Unit Test Todo');
});

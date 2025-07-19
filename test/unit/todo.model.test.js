const model = require('../../model/todo.model');

jest.mock('../../config/db', () => {
  return {
    query: jest.fn(),
    end: jest.fn()
  };
});
const db = require('../../config/db');

describe('Todo Model Unit (Mocked DB)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a todo', async () => {
    db.query.mockResolvedValue({ rows: [{ id: 1, title: 'Unit Test Todo', completed: false }] });
    const res = await model.createTodo('Unit Test Todo');
    expect(db.query).toHaveBeenCalledWith(expect.stringContaining('INSERT'), ['Unit Test Todo']);
    expect(res.rows[0]).toHaveProperty('title', 'Unit Test Todo');
    expect(res.rows[0]).toHaveProperty('completed', false);
  });

  it('should get all todos', async () => {
    db.query.mockResolvedValue({ rows: [{ id: 1, title: 'Unit Test Todo', completed: false }] });
    const res = await model.getTodos();
    expect(db.query).toHaveBeenCalledWith(expect.stringContaining('SELECT'));
    expect(Array.isArray(res.rows)).toBe(true);
    expect(res.rows.length).toBeGreaterThan(0);
  });

  it('should get todo by id', async () => {
    db.query.mockResolvedValue({ rows: [{ id: 1, title: 'Unit Test Todo', completed: false }] });
    const res = await model.getTodoById(1);
    expect(db.query).toHaveBeenCalledWith(expect.stringContaining('WHERE id = $1'), [1]);
    expect(res.rows[0]).toHaveProperty('id', 1);
  });

  it('should update todo', async () => {
    db.query.mockResolvedValue({ rows: [{ id: 1, title: 'Updated Title', completed: true }] });
    const res = await model.updateTodo(1, 'Updated Title', true);
    expect(db.query).toHaveBeenCalledWith(expect.stringContaining('UPDATE'), ['Updated Title', true, 1]);
    expect(res.rows[0]).toHaveProperty('title', 'Updated Title');
    expect(res.rows[0]).toHaveProperty('completed', true);
  });

  it('should delete todo', async () => {
    db.query.mockResolvedValue({ rowCount: 1 });
    const res = await model.deleteTodo(1);
    expect(db.query).toHaveBeenCalledWith(expect.stringContaining('DELETE'), [1]);
    expect(res.rowCount).toBe(1);
  });

  it('should return empty for get non-existent todo', async () => {
    db.query.mockResolvedValue({ rows: [] });
    const res = await model.getTodoById(999999);
    expect(res.rows.length).toBe(0);
  });

  it('should not update non-existent todo', async () => {
    db.query.mockResolvedValue({ rows: [] });
    const res = await model.updateTodo(999999, 'Nope', false);
    expect(res.rows.length).toBe(0);
  });

  it('should not delete non-existent todo', async () => {
    db.query.mockResolvedValue({ rowCount: 0 });
    const res = await model.deleteTodo(999999);
    expect(res.rowCount).toBe(0);
  });

  it('should handle error when createTodo throws', async () => {
    db.query.mockRejectedValue(new Error('DB Error'));
    await expect(model.createTodo('Unit Test Todo')).rejects.toThrow('DB Error');
  });

  it('should handle error when getTodos throws', async () => {
    db.query.mockRejectedValue(new Error('DB Error'));
    await expect(model.getTodos()).rejects.toThrow('DB Error');
  });

  it('should handle error when getTodoById throws', async () => {
    db.query.mockRejectedValue(new Error('DB Error'));
    await expect(model.getTodoById(1)).rejects.toThrow('DB Error');
  });

  it('should handle error when updateTodo throws', async () => {
    db.query.mockRejectedValue(new Error('DB Error'));
    await expect(model.updateTodo(1, 'Updated Title', true)).rejects.toThrow('DB Error');
  });

  it('should handle error when deleteTodo throws', async () => {
    db.query.mockRejectedValue(new Error('DB Error'));
    await expect(model.deleteTodo(1)).rejects.toThrow('DB Error');
  });
});

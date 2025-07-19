const controller = require('../../controller/todo.controller');

jest.mock('../../model/todo.model', () => ({
  getTodos: jest.fn(),
  getTodoById: jest.fn(),
  createTodo: jest.fn(),
  updateTodo: jest.fn(),
  deleteTodo: jest.fn()
}));
const model = require('../../model/todo.model');

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};
const mockRequest = (body = {}, params = {}) => ({ body, params });

describe('Todo Controller Unit (Mocked Model)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should get all todos', async () => {
    model.getTodos.mockResolvedValue({ rows: [{ id: 1, title: 'Test', completed: false }] });
    const req = mockRequest();
    const res = mockResponse();
    await controller.getTodos(req, res);
    expect(model.getTodos).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ id: 1, title: 'Test', completed: false }]);
  });

  it('should get todo by id', async () => {
    model.getTodoById.mockResolvedValue({ rows: [{ id: 1, title: 'Test', completed: false }] });
    const req = mockRequest({}, { id: 1 });
    const res = mockResponse();
    await controller.getTodoById(req, res);
    expect(model.getTodoById).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ id: 1, title: 'Test', completed: false });
  });

  it('should return 404 for non-existent todo', async () => {
    model.getTodoById.mockResolvedValue({ rows: [] });
    const req = mockRequest({}, { id: 999999 });
    const res = mockResponse();
    await controller.getTodoById(req, res);
    expect(model.getTodoById).toHaveBeenCalledWith(999999);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Not found' });
  });

  it('should create a todo', async () => {
    model.createTodo.mockResolvedValue({ rows: [{ id: 2, title: 'New Controller Todo', completed: false }] });
    const req = mockRequest({ title: 'New Controller Todo' });
    const res = mockResponse();
    await controller.createTodo(req, res);
    expect(model.createTodo).toHaveBeenCalledWith('New Controller Todo');
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: 2, title: 'New Controller Todo', completed: false });
  });

  it('should fail to create todo without title', async () => {
    const req = mockRequest({});
    const res = mockResponse();
    await controller.createTodo(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Title is required' });
  });

  it('should update todo', async () => {
    model.updateTodo.mockResolvedValue({ rows: [{ id: 1, title: 'Updated Controller', completed: true }] });
    const req = mockRequest({ title: 'Updated Controller', completed: true }, { id: 1 });
    const res = mockResponse();
    await controller.updateTodo(req, res);
    expect(model.updateTodo).toHaveBeenCalledWith(1, 'Updated Controller', true);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ id: 1, title: 'Updated Controller', completed: true });
  });

  it('should return 404 for update non-existent todo', async () => {
    model.updateTodo.mockResolvedValue({ rows: [] });
    const req = mockRequest({ title: 'Nope', completed: false }, { id: 999999 });
    const res = mockResponse();
    await controller.updateTodo(req, res);
    expect(model.updateTodo).toHaveBeenCalledWith(999999, 'Nope', false);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Not found' });
  });

  it('should delete todo', async () => {
    model.deleteTodo.mockResolvedValue({ rows: [{}], rowCount: 1 });
    const req = mockRequest({}, { id: 1 });
    const res = mockResponse();
    await controller.deleteTodo(req, res);
    expect(model.deleteTodo).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Deleted' });
  });

  it('should return 404 for delete non-existent todo', async () => {
    model.deleteTodo.mockResolvedValue({ rowCount: 0 });
    const req = mockRequest({}, { id: 999999 });
    const res = mockResponse();
    await controller.deleteTodo(req, res);
    expect(model.deleteTodo).toHaveBeenCalledWith(999999);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Not found' });
  });

  it('should handle error when getTodos throws', async () => {
    model.getTodos.mockRejectedValue(new Error('DB Error'));
    const req = mockRequest();
    const res = mockResponse();
    await controller.getTodos(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Internal server error' });
  });

  it('should handle error when getTodoById throws', async () => {
    model.getTodoById.mockRejectedValue(new Error('DB Error'));
    const req = mockRequest({}, { id: 1 });
    const res = mockResponse();
    await controller.getTodoById(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Internal server error' });
  });

  it('should handle error when createTodo throws', async () => {
    model.createTodo.mockRejectedValue(new Error('DB Error'));
    const req = mockRequest({ title: 'New Controller Todo' });
    const res = mockResponse();
    await controller.createTodo(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Internal server error' });
  });

  it('should handle error when updateTodo throws', async () => {
    model.updateTodo.mockRejectedValue(new Error('DB Error'));
    const req = mockRequest({ title: 'Updated Controller', completed: true }, { id: 1 });
    const res = mockResponse();
    await controller.updateTodo(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Internal server error' });
  });

  it('should handle error when deleteTodo throws', async () => {
    model.deleteTodo.mockRejectedValue(new Error('DB Error'));
    const req = mockRequest({}, { id: 1 });
    const res = mockResponse();
    await controller.deleteTodo(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Internal server error' });
  });

  it('should fail to update todo with invalid id', async () => {
    model.updateTodo.mockResolvedValue({ rows: [] });
    const req = mockRequest({ title: 'Updated Controller', completed: true }, { id: null });
    const res = mockResponse();
    await controller.updateTodo(req, res);
    expect(model.updateTodo).toHaveBeenCalledWith(null, 'Updated Controller', true);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Not found' });
  });

  it('should fail to delete todo with invalid id', async () => {
    model.deleteTodo.mockResolvedValue({ rowCount: 0 });
    const req = mockRequest({}, { id: null });
    const res = mockResponse();
    await controller.deleteTodo(req, res);
    expect(model.deleteTodo).toHaveBeenCalledWith(null);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Not found' });
  });
});

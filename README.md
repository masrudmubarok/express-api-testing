# Express.js API with PostgreSQL – Focused on Testing

This is a simple RESTful API built with Express.js and PostgreSQL, designed primarily to demonstrate unit testing and integration testing workflows using Jest and Supertest.

## 📦 Features

- RESTful API structure (CRUD)
- PostgreSQL database integration via `pg`
- Unit testing with Jest
- Integration testing with Supertest
- Environment configuration with dotenv

## 🏗️ Project Structure

```
express-api-testing/
│
├── config/
│   └── db.js
├── controller/
│   └── todo.controller.js
├── model/
│   └── db.js
│   └── todo.model.js
├── route/
│   └── todo.routes.js
├── tests/
│   ├── unit/
│   │   └── todo.model.test.js
│   └── integration/
│       └── todo.route.test.js
├── .env
├── app.js
├── server.js
├── jest.config.js
└── README.md
```

## 🧪 Testing Goals

- **Unit Testing**: Isolate individual modules (controllers/models).
- **Integration Testing**: Ensure API endpoints work as expected, including DB interaction.

## 🛠️ Installation

```bash
git clone https://github.com/your-username/express-api-testing.git
cd express-api-testing
npm install
```

## 🧾 Configuration

Create a `.env` file in the root:

```
DATABASE_URL=postgresql://localhost:5432/your_db
PORT=3000
```

And a `.env.test` for testing:

```
DATABASE_URL=postgresql://localhost:5432/your_test_db
PORT=3001
```

## 🗃️ Run Migrations (if any)

You may set up tables manually or integrate with tools like `knex` or `sequelize`. For simplicity, assume you have a table like:

```sql
CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100),
  completed BOOLEAN DEFAULT false
);
```

## 🚀 Running the App

```bash
npm start
```

## 🧪 Running Tests

- Run unit tests:

```bash
npm run test:unit
```

- Run integration tests:

```bash
npm run test:integration
```

- Or all tests:

```bash
npm test
```

## 🧪 Testing Commands

### Unit Test
- Run unit tests for controller:
  ```bash
  npm test -- test/unit/todo.controller.test.js
  # or
  jest test/unit/todo.controller.test.js
  ```
- Run unit tests for model:
  ```bash
  npm test -- test/unit/todo.model.test.js
  # or
  jest test/unit/todo.model.test.js
  ```

### Integration Test
- Run integration tests for API endpoints (routes):
  ```bash
  npm test -- test/integration/todo.route.test.js
  # or
  jest test/integration/todo.route.test.js
  ```

- To run all tests:
  ```bash
  npm test
  ```

## 📬 API Endpoints

| Method | Endpoint          | Description        |
|--------|-------------------|--------------------|
| GET    | /api/todos        | Get all todos      |
| GET    | /api/todos/:id    | Get todo by ID     |
| POST   | /api/todos        | Create new todo    |
| PUT    | /api/todos/:id    | Update todo        |
| DELETE | /api/todos/:id    | Delete todo        |

## 🧪 Postman Testing

You can test the API using [Postman](https://postman.com) by importing the following endpoints and sending requests to:

```
http://localhost:3000/todos
```

Make sure PostgreSQL is running and the correct DB is configured.

---

## ✅ Contribution

Feel free to fork, open issues, or PRs to improve this testing boilerplate.

## 📝 License

MIT License
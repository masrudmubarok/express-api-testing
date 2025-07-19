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
├── src
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── db.js
│   └── app.js
├── test
│   ├── unit
│   └── integration
├── .env
├── .env.test
├── jest.config.js
└── server.js
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
CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
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

## 📬 API Endpoints

| Method | Endpoint      | Description          |
|--------|---------------|----------------------|
| GET    | /items        | Get all items        |
| GET    | /items/:id    | Get item by ID       |
| POST   | /items        | Create new item      |
| PUT    | /items/:id    | Update item          |
| DELETE | /items/:id    | Delete item          |

## 🧪 Postman Testing

You can test the API using [Postman](https://postman.com) by importing the following endpoints and sending requests to:

```
http://localhost:3000/items
```

Make sure PostgreSQL is running and the correct DB is configured.

---

## ✅ Contribution

Feel free to fork, open issues, or PRs to improve this testing boilerplate.

## 📝 License

MIT License
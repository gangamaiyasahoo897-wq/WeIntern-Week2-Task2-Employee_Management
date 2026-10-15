# Task 2 — CRUD Employee Management System (standalone)

This folder is an independent Task 2 project. It does **not** require Task 3 authentication.

## Features
- Create, read, search, sort, update and delete employee records
- MongoDB persistence using Mongoose
- REST endpoints: `GET /api/employees`, `POST /api/employees`, `PUT /api/employees/:id`, `DELETE /api/employees/:id`
- Basic input validation and delete confirmation

## Run on Windows
1. Install Node.js 18+ and MongoDB Community Server; start the MongoDB service.
2. Open this folder in VS Code.
3. Copy `.env.example` to `.env` (optional if using the default local MongoDB URI).
4. Run `npm install`, then `npm start` in the terminal.
5. Open `http://localhost:5000`.

Use fictional employee data for your demo. Capture screenshots of adding, listing/searching, editing and deleting records. This is an educational demo; API endpoints are not authenticated, matching Task 2's standalone CRUD scope. Do not deploy publicly without adding access control and other production safeguards.

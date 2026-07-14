# 🚀 TeamFusion AI

A Jira-inspired project management platform built with the MERN stack and MySQL. TeamFusion AI helps teams manage workspaces, projects, boards, tasks, and collaboration with a modern Kanban interface.

---

## 📌 Features

### ✅ Authentication
- User Signup
- User Login
- JWT Authentication
- Protected APIs

### ✅ Workspace Management
- Create Workspace
- Update Workspace
- Delete Workspace
- Workspace Members
- Role-based Permissions

### ✅ Project Management
- Create Projects
- Update Projects
- Delete Projects

### ✅ Kanban Boards
- Multiple Boards
- Default Columns
- Custom Columns

### ✅ Task Management
- Create Task
- Update Task
- Delete Task
- Move Task Between Columns
- Assign Users
- Due Dates
- Priority
- Story Points

---

## 🛠 Tech Stack

### Backend
- Node.js
- Express.js
- MySQL
- Sequelize ORM
- JWT
- bcrypt
- Joi

### Frontend
- React.js
- Tailwind CSS
- Redux Toolkit

### Database
- MySQL

---

## 📂 Project Structure

TeamFusion-AI/

├── backend/

├── frontend/

├── database/

└── README.md

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/shoib9555/TeamFusion-AI.git
```

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm start
```

---

## 🔑 Environment Variables

Create a `.env` file inside `backend`.

Example:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=teamforge
JWT_SECRET=your_secret
```

---

## 📡 API Overview

### Authentication

- POST `/api/auth/signup`
- POST `/api/auth/login`
- GET `/api/auth/profile`

### Workspace

- POST `/api/workspaces`
- GET `/api/workspaces`
- PUT `/api/workspaces/:id`
- DELETE `/api/workspaces/:id`

### Projects

- CRUD APIs

### Boards

- CRUD APIs

### Columns

- CRUD APIs

### Tasks

- CRUD APIs
- Move Task API

---

## 📸 Screenshots

Coming Soon...

---

## 🛣 Roadmap

- [x] Authentication
- [x] Workspace
- [x] Workspace Members
- [x] Projects
- [x] Boards
- [x] Columns
- [x] Tasks
- [ ] Comments
- [ ] Attachments
- [ ] Notifications
- [ ] Sprint Management
- [ ] Dashboard
- [ ] Search
- [ ] AI Features

---

## 👨‍💻 Author

**Shoib Akhtar**

- GitHub: https://github.com/shoib9555
- LinkedIn: https://www.linkedin.com/in/shoib-akhtar-dev/
# Todo List API

A simple to-do list API built using Node.js, Express.js, MySQL, and JWT for authentication. The API allows users to register, login, and manage their tasks, including creating, updating, deleting, and retrieving tasks.

## Features

- User authentication with JWT (JSON Web Tokens)
- Create, read, update, and delete tasks
- Task management by individual users (only authenticated users can access their tasks)

## Technologies Used

- **Node.js** for backend
- **Express.js** for API routing
- **MySQL** for database
- **JWT** for authentication
- **Bcryptjs** for password hashing


### RoadMap Project Url

- [Road-Map](https://roadmap.sh/projects/todo-list-api)
- [Road-Map-submit-link](https://roadmap.sh/projects/todo-list-api/solutions?u=678382cc70129741a834f06c)



## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/todo-list-api.git
cd todo-list-api
```
### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

```bash
DB_HOST=localhost
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=todo_list_db
JWT_SECRET=your_jwt_secret_key
```
### 4. Set up Database

```bash
CREATE DATABASE todo_list_db;

USE todo_list_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT false,
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### 5. Start the server

```bash
npm start
```



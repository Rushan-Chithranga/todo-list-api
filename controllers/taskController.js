import db from "../models/db.js";

export const createTask = async (req, res) => {
  const { title, description } = req.body;

  if (!req.user) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  const userId = req.user.id;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  try {
    const [result] = await db.execute(
      "INSERT INTO tasks (title, description, user_id) VALUES (?, ?, ?)",
      [title, description, userId]
    );

    res.status(201).json({
      message: "Task created successfully",
      id: result.insertId,
      title,
      description,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTasks = async (req, res) => {
  const userId = req.user.id;

  try {
    const [tasks] = await db.execute("SELECT * FROM tasks WHERE user_id = ?", [
      userId,
    ]);
    res.status(200).json({ tasks: tasks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTasksById = async (req, res) => {
  const { id } = req.params.id;
  const userId = req.user.id;

  try {
    const [tasks] = await db.execute(
      "SELECT * FROM tasks WHERE user_id = ? AND id = ?",
      [userId, id]
    );
    if (tasks.length === 0) {
      res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ tasks: tasks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTasks = async (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;
  const { title, description, completed } = req.body;
  try {
    const [result] = await db.execute(
      "UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ? AND user_id = ?",
      [title, description, completed, id, userId]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({
      message: "Task successfully updated successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;
  try {
    const [result] = await db.execute(
      "DELETE FROM tasks WHERE id = ? AND user_id = ?",
      [id, userId]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

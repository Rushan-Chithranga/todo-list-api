import express from "express";
import {
  createTask,
  deleteTask,
  getTasks,
  getTasksById,
  updateTasks,
} from "../controllers/taskController.js";
import { authenticateJWT } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authenticateJWT, createTask);
router.get("/", authenticateJWT, getTasks);
router.get("/:id", authenticateJWT, getTasksById);
router.put("/:id", authenticateJWT, updateTasks);
router.delete("/:id", authenticateJWT, deleteTask);

export default router;

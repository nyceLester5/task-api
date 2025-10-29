// src/controllers/taskController.js
import * as taskService from '../services/taskService.js';

export async function getTasks(req, res, next) {
  const tasks = await taskService.getAllTasks();
  res.json(tasks);
}

export async function createTask(req, res, next) {
  const { title, completed } = req.body;
  const task = await taskService.createTask({ title, completed });
  res.status(201).json(task);
}

// NEW: GET /tasks/:id
export async function getTaskById(req, res, next) {
  const idNum = Number(req.params.id);

  // Defensive check; validateId middleware also enforces this
  if (!Number.isInteger(idNum)) {
    return res.status(400).json({
      error: 'Validation failed',
      details: ['ID must be a number'],
    });
  }

  const task = await taskService.getTaskById(idNum);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.status(200).json(task);
}

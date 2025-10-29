// src/controllers/taskController.js
import * as taskService from '../services/taskService.js';

export async function getTasks(req, res, next) {
  try {
    const tasks = await taskService.getAllTasks();
    res.json(tasks);
  } catch (err) {
    next(err);
  }
}

export async function createTask(req, res, next) {
  try {
    const { title, completed } = req.body;
    const task = await taskService.createTask({ title, completed });
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
}

export async function getTaskById(req, res, next) {
  try {
    const idNum = parseInt(req.params.id, 10);

    // invalid like "abc", "2.5", "", "-1"
    if (isNaN(idNum)) {
      return res.status(400).json({
        error: 'Validation failed',
        details: ['ID must be a number'],
      });
    }

    const task = await taskService.getTaskById(idNum);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    return res.status(200).json({
      id: task.id,
      title: task.title,
      completed: task.completed,
    });
  } catch (err) {
    next(err);
  }
}

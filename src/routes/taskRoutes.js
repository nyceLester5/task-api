// src/routes/taskRoutes.js
import express from 'express';
import { getTasks, createTask, getTaskById } from '../controllers/taskController.js';
import { validateTask } from '../middleware/validateTask.js';

const router = express.Router();

router.get('/', getTasks);
router.post('/', validateTask, createTask);
router.get('/:id', getTaskById);

export default router;

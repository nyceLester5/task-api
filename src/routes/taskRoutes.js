// src/routes/taskRoutes.js
import express from 'express';
import * as taskController from '../controllers/taskController.js';
import { validateTask } from '../middleware/validateTask.js';
import { validateId } from '../middleware/validateId.js';

const router = express.Router();

router.get('/', taskController.getTasks);
router.post('/', validateTask, taskController.createTask);

// NEW: GET /tasks/:id
router.get('/:id', validateId, taskController.getTaskById);

export default router;

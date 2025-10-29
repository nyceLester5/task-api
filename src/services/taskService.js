import * as taskRepository from '../repositories/taskRepo.js';

export async function getAllTasks() {
  return taskRepo.findAll();
}

export async function createTask(data) {
  return taskRepo.create(data);
}

// NEW
export async function getTaskById(id) {
  return taskRepo.findById(id);
}

const { HttpError } = require("../utils/HttpError");
const { Task } = require("../models/Task");

const getTasksService = async (page, limit, completed) => {
  const skip = (page - 1) * limit;

  const filter = {};

  if (completed === "true") {
    filter.completed = true;
  }

  if (completed === "false") {
    filter.completed = false;
  }

  return await Task.find(filter).limit(limit).skip(skip);
};

const getTaskByIdService = async (taskId) => {
  const task = await Task.findById(taskId);

  if (!task) {
    throw new HttpError(404);
  }
  return task;
};

const addTaskService = async (taskData) => {
  return await Task.create(taskData);
};

const updateTaskService = async (taskId, data) => {
  const task = await Task.findByIdAndUpdate(taskId, data, { new: true });
  if (!task) {
    throw new HttpError(404);
  }
  return task;
};

const deleteTaskService = async (taskId) => {
  const task = await Task.findByIdAndDelete(taskId);
  if (!task) {
    throw new HttpError(404);
  }
  return taskId;
};

module.exports = {
  getTasksService,
  getTaskByIdService,
  addTaskService,
  updateTaskService,
  deleteTaskService,
};

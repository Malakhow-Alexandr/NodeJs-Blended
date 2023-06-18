const { HttpError } = require("../utils/HttpError");
const { Task } = require("../models/Task");

const getTasksService = async (page, limit, completed, userId) => {
  const skip = (page - 1) * limit;

  const filter = { owner: userId };

  if (completed === "true") {
    filter.completed = true;
  }

  if (completed === "false") {
    filter.completed = false;
  }

  return await Task.find(filter).limit(limit).skip(skip);
};

const getTaskByIdService = async (taskId, ownerId) => {
  const task = await Task.findOne({ _id: taskId, owner: ownerId });

  if (!task) {
    throw new HttpError(404);
  }
  return task;
};

const addTaskService = async (taskData, ownerId) => {
  return await Task.create({ ...taskData, owner: ownerId });
};

const updateTaskService = async (taskId, ownerId, data) => {
  const task = await Task.findOneAndUpdate(
    { _id: taskId, owner: ownerId },
    data,
    { new: true }
  );
  if (!task) {
    throw new HttpError(404);
  }
  return task;
};

const deleteTaskService = async (taskId) => {
  const task = await Task.findOneAndDelete({ _id: taskId, owner: ownerId });
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

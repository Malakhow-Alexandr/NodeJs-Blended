const {
  getTasksService,
  getTaskByIdService,
  addTaskService,
  updateTaskService,
  deleteTaskService,
} = require("../services/tasksServices");
const { asyncWrapper } = require("../utils/asyncWrapper");

let getTasks = asyncWrapper(async (req, res) => {
  const { page = 1, limit = 10, completed } = req.query;
  const { _id: ownerId } = req.user;
  const tasks = await getTasksService(page, limit, completed, ownerId);
  res.json(tasks);
});

const getTaskById = asyncWrapper(async (req, res, next) => {
  const { taskId } = req.params;
  const { _id: ownerId } = req.user;
  const oneTask = await getTaskByIdService(taskId, ownerId);
  console.log(req.params);
  res.json(oneTask);
});

const addTask = asyncWrapper(async (req, res) => {
  const { _id: ownerId } = req.user;
  const newTask = await addTaskService(req.body, ownerId);
  console.log(req.body);
  res.status(201).json(newTask);
});

const updateTask = asyncWrapper(async (req, res) => {
  const { taskId } = req.params;
  const { _id: ownerId } = req.user;
  const updateTask = await updateTaskService(taskId, ownerId, req.body);
  res.status(200).json(updateTask);
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { taskId } = req.params;
  const { _id: ownerId } = req.user;
  const deletedTaskId = await deleteTaskService(taskId, ownerId);
  res.status(200).json({ id: deletedTaskId });

  return deletedTaskId;
});

module.exports = {
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  addTask,
};

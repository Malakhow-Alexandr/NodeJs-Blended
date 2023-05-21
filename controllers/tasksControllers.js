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
  const tasks = await getTasksService(page, limit, completed);
  res.json(tasks);
});

const getTaskById = asyncWrapper(async (req, res, next) => {
  const { taskId } = req.params;
  const oneTask = await getTaskByIdService(taskId);
  console.log(req.params);
  res.json(oneTask);
});

const addTask = asyncWrapper(async (req, res) => {
  const newTask = await addTaskService(req.body);
  console.log(req.body);
  res.status(201).json(newTask);
});

const updateTask = asyncWrapper(async (req, res) => {
  const { taskId } = req.params;
  const updateTask = await updateTaskService(taskId, req.body);
  res.status(200).json(updateTask);
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { taskId } = req.params;
  const deletedTaskId = await deleteTaskService(taskId);
  res.status(200).json({ id: deletedTaskId });

  // res.sendStatus(204);

  return deletedTaskId;
});

module.exports = {
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  addTask,
};

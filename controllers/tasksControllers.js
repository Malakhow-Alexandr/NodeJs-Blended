const {
  getTasksService,
  getTaskByIdService,
  addTaskService,
  updateTaskService,
  deleteTaskService,
} = require("../services/tasksServices");
const { asyncWrapper } = require("../utils/asyncWrapper");

let getTasks = async (req, res, next) => {
  const tasks = await getTasksService();
  res.json(tasks);
};
getTasks = asyncWrapper(getTasks);

const getTaskById = asyncWrapper(async (req, res, next) => {
  const { taskId } = req.params;
  const oneTask = await getTaskByIdService(taskId);
  console.log(req.params);
  res.json(oneTask);
});

const addTask = async (req, res, next) => {
  try {
    const newTask = await addTaskService(req.body);
    console.log(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const updateTask = await updateTaskService(taskId, req.body);
    res.status(200).json(updateTask);
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const deletedTaskId = await deleteTaskService(taskId);
    res.status(200).json({ id: deletedTaskId });

    // res.sendStatus(204);

    return deletedTaskId;
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  addTask,
};

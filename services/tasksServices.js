const fs = require("fs/promises");
const path = require("path");
const tasksPath = path.join(process.cwd(), "db", "tasks.json");
const crypto = require("crypto");
const { HttpError } = require("../utils/HttpError");

const writeDb = (tasks) => {
  return fs.writeFile(tasksPath, JSON.stringify(tasks, null, 2));
};

const getTasksService = async () => {
  const tasks = await fs.readFile(tasksPath);
  return JSON.parse(tasks);
};

const getTaskByIdService = async (taskId) => {
  const tasks = await getTasksService();
  return tasks.find((task) => task.id === taskId);
};

const addTaskService = async (taskData) => {
  const newTask = {
    id: crypto.randomUUID(),
    ...taskData,
  };
  const tasks = await getTasksService();
  tasks.push(newTask);

  await writeDb(tasks);

  return newTask;
};

const updateTaskService = async (taskId, data) => {
  const tasks = await getTasksService();
  let index = tasks.findIndex((task) => task.id === taskId);
  if (index === -1) {
    throw new HttpError(404, "task not Found");
  }

  // tasks[index] = { ...tasks[index], ...data };

  tasks.splice(index, 1, { ...tasks[index], ...data });

  await writeDb(tasks);

  return tasks[index];
};

const deleteTaskService = async (taskId) => {
  const tasks = await getTasksService();
  let index = tasks.findIndex((task) => task.id === taskId);
  if (index === -1) {
    throw new HttpError(404, "task not Found");
  }
  tasks.splice(index, 1);

  await writeDb(tasks);

  return taskId;
};

module.exports = {
  getTasksService,
  getTaskByIdService,
  addTaskService,
  updateTaskService,
  deleteTaskService,
};

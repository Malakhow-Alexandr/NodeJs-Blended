const fs = require("fs/promises");
const path = require("path");
const tasksPath = path.join(process.cwd(), "db", "tasks.json");
const crypto = require("crypto");

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

  await fs.writeFile(tasksPath, JSON.stringify(tasks, null, 2));

  return newTask;
};

const updateTaskService = async (taskId, data) => {
  const tasks = await getTasksService();
  let oneTask = tasks.find((task) => task.id === taskId);
  oneTask.title = data.title || oneTask.title;
  oneTask.completed = data.completed || oneTask.completed;
  await fs.writeFile(tasksPath, JSON.stringify(tasks, null, 2));
  return oneTask;
};

module.exports = {
  getTasksService,
  getTaskByIdService,
  addTaskService,
  updateTaskService,
};

const express = require("express");
const {
  getTasksService,
  getTaskByIdService,
  addTaskService,
  updateTaskService,
} = require("../services/tasksServices");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const tasks = await getTasksService();
  res.json(tasks);
});

router.get("/:taskId", async (req, res, next) => {
  const { taskId } = req.params;
  const oneTask = await getTaskByIdService(taskId);
  console.log(req.params);
  res.json(oneTask);
});

router.post("/", async (req, res, next) => {
  const newTask = await addTaskService(req.body);
  console.log(req.body);
  res.status(201).json(newTask);
});

router.patch("/:taskId", async (req, res, next) => {
  const { taskId } = req.params;
  const updateTask = await updateTaskService(taskId, req.body);
  res.status(200).json(updateTask);
});

module.exports = {
  tasksRouter: router,
};

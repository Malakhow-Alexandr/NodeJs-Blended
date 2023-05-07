const express = require("express");
const {
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  addTask,
} = require("../controllers/tasksControllers");

const router = express.Router();

router.route("/").get(getTasks).post(addTask);

router.route("/:taskId").get(getTaskById).patch(updateTask).delete(deleteTask);

module.exports = {
  tasksRouter: router,
};

const express = require("express");
const {
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  addTask,
} = require("../controllers/tasksControllers");
const {
  createTaskValidationSchema,
  updateTaskValidationSchema,
} = require("../utils/validation/tasksValidationSchemas");

const { validateBody } = require("../utils/validation/validateBody");
const { authenticate } = require("../middlewares/authenticate");

const router = express.Router();

router.use(authenticate);

router
  .route("/")
  .get(getTasks)
  .post(validateBody(createTaskValidationSchema), addTask);

router
  .route("/:taskId")
  .get(getTaskById)
  .patch(validateBody(updateTaskValidationSchema), updateTask)
  .delete(deleteTask);

module.exports = {
  tasksRouter: router,
};

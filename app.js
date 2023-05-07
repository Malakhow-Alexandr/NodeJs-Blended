const express = require("express");
const { tasksRouter } = require("./routes/tasksRouter");

const app = express();
app.use(express.json());

app.use("/tasks", tasksRouter);

module.exports = { app };

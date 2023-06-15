const express = require("express");
const { tasksRouter } = require("./routers/tasksRouter");
const { authRouter } = require("./routers/authRouter");

const { rootRouter } = require("./routers");

const app = express();
app.use(express.json());

app.use("/", rootRouter);

app.use((req, res) => {
  res.status(404).json({ message: "This route does not exist" });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode || 500).json({
    message: err.message || "Something went wrong, please try again later",
  });
});

module.exports = { app };

const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const helmet = require("helmet");
const { notFoundHandler } = require("./middlewares/notFoundHandler");
const { globalErrorHandler } = require("./middlewares/globalErrorHandler");
const { rootRouter } = require("./routers");

const app = express();
app.use(cors());
app.use(helmet());

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(express.json());

app.use("/", rootRouter);

app.use(notFoundHandler);

app.use(globalErrorHandler);

module.exports = { app };

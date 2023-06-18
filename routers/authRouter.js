const express = require("express");
const { signup, login, logout } = require("../controllers/authController");
const {
  createUserValidationSchema,
  loginValidationSchema,
} = require("../utils/validation/authValidationSchema");
const { validateBody } = require("../utils/validation/validateBody");
const { authenticate } = require("../middlewares/authenticate");

const router = express.Router();

router.post("/signup", validateBody(createUserValidationSchema), signup);

router.post("/login", validateBody(loginValidationSchema), login);

router.post("/logout", authenticate, logout);

module.exports = {
  authRouter: router,
};

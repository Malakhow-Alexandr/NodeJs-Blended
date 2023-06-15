const {
  signupService,
  loginService,
  logoutService,
} = require("../services/usersServices");

const { asyncWrapper } = require("../utils/asyncWrapper");

const signup = asyncWrapper(async (req, res) => {});

const login = asyncWrapper(async (req, res) => {});

const logout = asyncWrapper(async (req, res) => {});

module.exports = {
  signup,
  login,
  logout,
};

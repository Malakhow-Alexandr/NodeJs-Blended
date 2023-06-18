const {
  signupService,
  loginService,
  logoutService,
} = require("../services/authServices");

const { asyncWrapper } = require("../utils/asyncWrapper");

const signup = asyncWrapper(async (req, res) => {
  const user = await signupService(req.body);
  res.status(201).json({ name: user.name, email: user.email });
});

const login = asyncWrapper(async (req, res) => {
  const { accessToken, user } = await loginService(req.body);
  res.status(200).json({ accessToken, user });
});

const logout = asyncWrapper(async (req, res) => {
  const { _id } = req.user;
  await logoutService(_id);
  res.status(200).json({ message: "Logout success" });
});

module.exports = {
  signup,
  login,
  logout,
};

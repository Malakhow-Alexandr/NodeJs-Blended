const { HttpError } = require("../utils/HttpError");
const { User } = require("../models/User");
const bcrypt = require("bcryptjs");
const { assignTokens } = require("../utils/assignTokens");

const signupService = async (body) => {
  const fetchedUser = await User.findOne({ email: body.email });
  if (fetchedUser) {
    throw new HttpError(409, "This email already exist");
  }
  const hashedPassword = await bcrypt.hash(body.password, 12);

  return await User.create({ ...body, password: hashedPassword });
};

const loginService = async (body) => {
  const { email, password } = body;
  const fetchedUser = await User.findOne({ email });
  if (!fetchedUser) {
    throw new HttpError(401, "invalid data");
  }
  const passwordCompare = await bcrypt.compare(password, fetchedUser.password);

  if (!passwordCompare) {
    throw new HttpError(401, "invalid data");
  }
  const { accessToken, refreshToken } = assignTokens(fetchedUser);

  await User.findByIdAndUpdate(fetchedUser._id, {
    refresh_token: refreshToken,
  });
  return {
    accessToken,
    user: { name: fetchedUser.name, email: fetchedUser.email },
  };
};

const logoutService = async (userId) => {
  await User.findByIdAndUpdate(userId, { refresh_token: null });
};

module.exports = {
  signupService,
  loginService,
  logoutService,
};

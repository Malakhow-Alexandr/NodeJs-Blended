const { HttpError } = require("../utils/HttpError");
const { User } = require("../models/User");
const jwt = require("jsonwebtoken");
const { assignTokens } = require("../utils/assignTokens");

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer" || !token) {
    throw next(new HttpError(401, "Unauthorized"));
  }

  const decodedPayload = jwt.decode(token);

  let fetchedUser = null;

  try {
    fetchedUser = await User.findById(decodedPayload.userId);

    if (!fetchedUser || !fetchedUser.refresh_token) {
      throw next(new HttpError(401, "Unauthorized"));
    }
    jwt.verify(token, ACCESS_TOKEN_SECRET);

    req.user = fetchedUser;

    next();
  } catch (error) {
    try {
      if (error?.name !== "TokenExpiredError") {
        return next(new HttpError(401, "Unauthorized"));
      }
      jwt.verify(fetchedUser.refresh_token, REFRESH_TOKEN_SECRET);

      const { accessToken, refreshToken } = assignTokens(fetchedUser);

      await User.findByIdAndUpdate(fetchedUser._id, {
        refresh_token: refreshToken,
      });
      res.status(200).json({ accessToken });
    } catch (error) {
      next(new HttpError(401, "Unauthorized"));
    }
  }
};

module.exports = { authenticate };

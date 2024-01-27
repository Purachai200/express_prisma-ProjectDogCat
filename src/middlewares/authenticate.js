const createError = require("../utils/createError");
const jwt = require("jsonwebtoken");

const userService = require("../services/user-service");

exports.authenticateAdmin = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return createError(401, "Unauthorized");
    }

    const arrayToken = authorization.split(" ");

    const token = arrayToken[1];

    if (arrayToken[0] !== "Bearer" || !token) {
      return createError(401, "Unauthorized");
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    if (
      typeof payload !== "object" ||
      !payload?.id ||
      typeof payload.id !== "number"
    ) {
      return createError(400, "Payload not in correct format");
    }

    const username = await userService.getUserById("admin", payload.id);

    if (!username) {
        return createError(403, "Admin Account Invalid.");
      }

    req.username = username;

    next();
  } catch (err) {
    next(err);
  }
};

exports.authenticateRecorder = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return createError(401, "Unauthorized");
    }

    const arrayToken = authorization.split(" ");

    const token = arrayToken[1];

    if (arrayToken[0] !== "Bearer" || !token) {
      return createError(401, "Unauthorized");
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    if (
      typeof payload !== "object" ||
      !payload?.id ||
      typeof payload.id !== "number"
    ) {
      return createError(400, "Payload not in correct format");
    }

    const username = await userService.getUserById("recorder", payload.id);

    if (!username) {
      return createError(403, "Recorder Account Invalid.");
    }

    req.username = username;

    next();
  } catch (err) {
    next(err);
  }
};

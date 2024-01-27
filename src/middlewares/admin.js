const createError = require("../utils/createError");

const admin = async (req, res, next) => {
  try {
    if (req.username.role !== "ADMIN") {
      return createError(403, "Forbidden.");
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = admin;

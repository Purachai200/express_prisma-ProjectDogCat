const createError = require("../utils/createError");

const admin = async (req, res, next) => {
  try {
    if (req.admin.role !== "ADMIN") {
      return createError(403, "Forbidden");
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = admin;

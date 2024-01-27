const createError = require("../utils/createError");

const super_admin = async (req, res, next) => {
  try {
    if (req.admin.role !== "SUPER_ADMIN") {
      return createError(403, "Forbidden");
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = super_admin;

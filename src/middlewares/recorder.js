const createError = require("../utils/createError");

const recorder = async (req, res, next) => {
  try {
    const user = req.username[0];
    if (user.role !== "RECORDER") {
      return createError(403, "Forbidden");
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = recorder;

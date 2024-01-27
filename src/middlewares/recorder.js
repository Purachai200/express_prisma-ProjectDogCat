const createError = require("../utils/createError");

const recorder = async (req, res, next) => {
  try {
    if (req.recorder.role !== "RECORDER") {
      return createError(403, "Forbidden");
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = recorder;

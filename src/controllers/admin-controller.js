const prisma = require("../config/prisma");
const createError = require("../utils/createError");
const {
  createSubdistrictSchema,
  createRecorderSchema,
} = require("../validator/admin-validator");

exports.createSubDistrict = async (req, res, next) => {
  try {
    const value = await createSubdistrictSchema.validateAsync(req.body);
    if (typeof value !== "object") {
      return createError(400, "Something Went Wrong.");
    }
    await prisma.subdistrict.create({
      data: {
        ...value,
      },
    });
    res.json({ message: "Success Create Subdistrict" });
  } catch (err) {
    next(err);
  }
};

exports.createRecorder = async (req, res, next) => {
  try {
    const value = await createRecorderSchema.validateAsync(req.body);
    const { subdistrictId } = req.body;
    if (typeof value !== "object") {
      return createError(400, "Something Went Wrong.");
    }
    await prisma.recorder.create({
      data: {
        ...value,
        subdistrict: {
          connect: {
            id: Number(subdistrictId),
          },
        },
      },
    });
    res.json({ message: "Success Create Recorder" });
  } catch (err) {
    next(err);
  }
};

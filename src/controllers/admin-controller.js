const prisma = require("../config/prisma");
const createError = require("../utils/createError");
const userService = require("../services/user-service")
const bcrypt = require("bcryptjs")
const { v4: uuidv4 } = require('uuid');
const {
  createSubdistrictSchema,
  createRecorderSchema,
  updateSubdistrictSchema,
  updateRecorderSchema,
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
exports.updateSubDistrict = async (req, res, next) => {
  try {
    const { subdistrictId } = req.params; 
    const value = await updateSubdistrictSchema.validateAsync(req.body); 

    await prisma.subdistrict.update({
      where: {
        id: Number(subdistrictId),
      },
      data: {
        ...value,
      },
    });

    res.json("Update Subdistrict Success");
  } catch (err) {
    next(err);
  }
};
exports.deleteSubdistrict = async (req, res, next) => {
  try {
    const { subdistrictId } = req.params; 

    await prisma.subdistrict.delete({
      where: {
        id: Number(subdistrictId),
      },
    });

    res.json("Delete Subdistrict Success");
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
    const isUserExist = await userService.getUserByUsername("recorder",value.username);
    if (isUserExist) {
      return createError(400, "User already exist.");
    }
    const hashedPassword = await bcrypt.hash(value.password, 10);
    value.password = hashedPassword
    
    await prisma.recorder.create({
      data: {
        id: uuidv4(),
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

exports.updateRecorder = async (req, res, next) => {
  try {
    const { recorderId } = req.params; 
    const value = await updateRecorderSchema.validateAsync(req.body); 

    const hashedPassword = await bcrypt.hash(value.password, 10);
    value.password = hashedPassword

    await prisma.recorder.update({
      where: {
        id: recorderId,
      },
      data: {
        ...value,
      },
    });

    res.json("Update Subdistrict Success");
  } catch (err) {
    next(err);
  }
};

exports.deleteRecorder = async (req, res, next) => {
  try {
    const { recorderId } = req.params; 

    await prisma.recorder.delete({
      where: {
        id: String(recorderId),
      },
    });

    res.json("Delete Recorder Success");
  } catch (err) {
    next(err);
  }
};

// Get Data
exports.adminGetData = async (req, res, next) => {
  try {
    const { data } = req.params;
    const result = await userService.getAdminAllData(data);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.adminGetDataOne = async (req, res, next) => {
  try {
    const { data, find, ref } = req.params;
    const result = await userService.getAdminOneData(data ,find ,ref ,Number )
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.adminGetDataOneString = async (req, res, next) => {
  try {
    const { data, find, ref } = req.params;
    const result = await userService.getAdminOneData(data ,find ,ref ,String )
    res.json(result);
  } catch (err) {
    next(err);
  }
};


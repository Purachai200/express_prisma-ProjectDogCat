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
  createNew
} = require("../validator/admin-validator");

const cloudUpload = require("../utils/cloudUpload");
const fs = require('fs');

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

exports.createNews = async (req, res, next) => {
  try {
    const value = await createNew.validateAsync(req.body);
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }
    
    const imgUrl = await cloudUpload(req.file.path);

    if (fs.existsSync(req.file.path)) {
      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.error("Failed to delete file:", err);
          return;
        }
        console.log("File deleted successfully");
      });
    } else {
      console.log("File does not exist");
    }
    
  
    const news = await prisma.new_Img.create({
      data: {
        url: imgUrl,
        title: value.title
      }
    });
    
    res.json({ news });
  } catch (err) {
    next(err);
  }  
};

exports.updateNews = async (req, res, next) => {
  try {
    const value = await createNew.validateAsync(req.body);
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }
    
    const imgUrl = await cloudUpload(req.file.path);

    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error("Failed to delete file:", err);
        return;
      }
    });
  
    const news = await prisma.new_Img.update({
      data: {
        url: imgUrl,
        title: value.title
      }
    });
    
    res.json({ news });
  } catch (err) {
    next(err);
  }  
}

exports.deleteNews = async (req, res, next) => {
  try {
    const { newId } = req.params; 

    await prisma.new_Img.delete({
      where: {
        id: Number(newId),
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


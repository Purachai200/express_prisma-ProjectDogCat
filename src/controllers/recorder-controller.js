const prisma = require("../config/prisma");
const createError = require("../utils/createError");
const userService = require("../services/user-service");

const {
  createAddressSchema,
  createPetOwnerSchema,
  createPetSchema,
  createNatureSchema,
  createLocationSchema,
  createUnregisteredSchema,
  updateAddressSchema,
  updatePetOwnerSchema,
  updateNatureSchema,
  updateLocationSchema,
  updatePetSchema,
  updateUnregisteredSchema,
} = require("../validator/recorder-validator");

exports.createHouseAddress = async (req, res, next) => {
  try {
    const value = await createAddressSchema.validateAsync(req.body);
    if (typeof value !== "object") {
      return createError(400, "Something Went Wrong.");
    }
    const createdAddress = await prisma.address.create({
      data: {
        ...value,
        recorder: {
          connect: {
            id: String(req.username[0].id),
          },
        },
        subdistrict: {
          connect: {
            id: Number(req.username[0].subdistrictId),
          },
        },
      },
    });

    res.json(createdAddress);
  } catch (err) {
    next(err);
  }
};

exports.updateHouseAddress = async (req, res, next) => {
  try {
    const { addressId } = req.params;
    const value = await updateAddressSchema.validateAsync(req.body);
    if (typeof value !== "object") {
      return createError(400, "Something Went Wrong.");
    }

    await prisma.address.update({
      where: {
        id: Number(addressId),
      },
      data: {
        ...value,
      },
    });

    res.json("Update Address Success");
  } catch (err) {
    next(err);
  }
};
exports.deleteHouseAddress = async (req, res, next) => {
  try {
    const { addressId } = req.params; 

    await prisma.address.delete({
      where: {
        id: Number(addressId),
      },
    });

    res.json("Delete Address Success");
  } catch (err) {
    next(err);
  }
};

exports.createPetOwner = async (req, res, next) => {
  try {
    const value = await createPetOwnerSchema.validateAsync(req.body);
    const addressId = req.params.addressId;
    if (typeof value !== "object") {
      return createError(400, "Something Went Wrong.");
    }

    const isOwnerExist = await userService.getIdentityNumber(
      value.identity_number
    );
    if (isOwnerExist) {
      return createError(400, "Pet Owner Exist.");
    }

    await prisma.pet_owner.create({
      data: {
        ...value,
        address: {
          connect: {
            id: Number(addressId),
          },
        },
        recorder: {
          connect: {
            id: String(req.username[0].id),
          },
        },
      },
    });
    res.json("Create Pet Owner Success");
  } catch (err) {
    next(err);
  }
};
exports.updatePetOwner = async (req, res, next) => {
  try {
    const { petOwnerId } = req.params;
    const value = await updatePetOwnerSchema.validateAsync(req.body);

    await prisma.pet_owner.update({
      where: {
        id: Number(petOwnerId),
      },
      data: {
        ...value,
      },
    });

    res.json("Update Pet Owner Success");
  } catch (err) {
    next(err);
  }
};
exports.deletePetOwner = async (req, res, next) => {
  try {
    const { petOwnerId } = req.params; 

    await prisma.pet_owner.delete({
      where: {
        id: Number(petOwnerId),
      },
    });

    res.json("Delete Pet Owner Success");
  } catch (err) {
    next(err);
  }
};

exports.createNature = async (req, res, next) => {
  try {
    const value = await createNatureSchema.validateAsync(req.body);
    if (typeof value !== "object") {
      return createError(400, "Something Went Wrong.");
    }
    await prisma.nature.create({
      data: {
        ...value,
      },
    });
    res.json("Create Nature Success");
  } catch (err) {
    next(err);
  }
};

exports.updateNature = async (req, res, next) => {
  try {
    const { natureId } = req.params;
    const value = await updateNatureSchema.validateAsync(req.body);

    await prisma.nature.update({
      where: {
        id: Number(natureId),
      },
      data: {
        ...value,
      },
    });

    res.json("Update Nature Success");
  } catch (err) {
    next(err);
  }
};
exports.deleteNature = async (req, res, next) => {
  try {
    const { natureId } = req.params; 

    await prisma.nature.delete({
      where: {
        id: Number(natureId),
      },
    });

    res.json("Delete Nature Success");
  } catch (err) {
    next(err);
  }
};

exports.createLocation = async (req, res, next) => {
  try {
    const value = await createLocationSchema.validateAsync(req.body);
    if (typeof value !== "object") {
      return createError(400, "Something Went Wrong.");
    }
    await prisma.location.create({
      data: {
        ...value,
      },
    });
    res.json("Create Location Success");
  } catch (err) {
    next(err);
  }
};
exports.updateLocation = async (req, res, next) => {
  try {
    const { locationId } = req.params;
    const value = await updateLocationSchema.validateAsync(req.body);

    await prisma.location.update({
      where: {
        id: Number(locationId),
      },
      data: {
        ...value,
      },
    });

    res.json("Update Location Success");
  } catch (err) {
    next(err);
  }
};
exports.deleteLocation = async (req, res, next) => {
  try {
    const { locationId } = req.params; 

    await prisma.location.delete({
      where: {
        id: Number(locationId),
      },
    });

    res.json("Delete Location Success");
  } catch (err) {
    next(err);
  }
};

exports.createPet = async (req, res, next) => {
  try {
    const value = await createPetSchema.validateAsync(req.body);
    const { location_id, nature_id, ...rest } = value;
    const petOwnerId = req.params.petOwnerId;

    if (typeof value !== "object") {
      return createError(400, "Something Went Wrong.");
    }

    await prisma.pet.create({
      data: {
        ...rest,
        location: {
          connect: {
            id: Number(location_id),
          },
        },
        nature: {
          connect: {
            id: Number(nature_id),
          },
        },
        petOwner: {
          connect: {
            id: Number(petOwnerId),
          },
        },
        recorder: {
          connect: {
            id: String(req.username[0].id),
          },
        },
      },
    });
    res.json("Create Pet Success");
  } catch (err) {
    next(err);
  }
};

exports.updatePet = async (req, res, next) => {
  try {
    const { petId } = req.params;
    const value = await updatePetSchema.validateAsync(req.body);

    await prisma.pet.update({
      where: {
        id: Number(petId),
      },
      data: {
        ...value,
      },
    });

    res.json("Update Pet Success");
  } catch (err) {
    next(err);
  }
};
exports.deletePet = async (req, res, next) => {
  try {
    const { petId } = req.params; 

    await prisma.pet.delete({
      where: {
        id: Number(petId),
      },
    });

    res.json("Delete Pet Success");
  } catch (err) {
    next(err);
  }
};

exports.createUnregister = async (req, res, next) => {
  try {
    const value = await createUnregisteredSchema.validateAsync(req.body);
    const subdistrict_id = req.params.subdistrictId;
    console.log(subdistrict_id);
    const { location_id, ...rest } = value;
    if (typeof value !== "object") {
      return createError(400, "Something Went Wrong.");
    }

    console.log(subdistrict_id);

    await prisma.unregistered.create({
      data: {
        ...rest,
        location: {
          connect: {
            id: Number(location_id),
          },
        },
        address: {
          connect: {
            id: Number(subdistrict_id),
          },
        },
      },
    });
    res.json("Create Unregister Success");
  } catch (err) {
    next(err);
  }
};

exports.updateUnregister = async (req, res, next) => {
  try {
    const { unregisterId } = req.params;
    const value = await updateUnregisteredSchema.validateAsync(req.body);

    await prisma.unregistered.update({
      where: {
        id: Number(unregisterId),
      },
      data: {
        ...value,
      },
    });

    res.json("Update Unregister Success");
  } catch (err) {
    next(err);
  }
};

exports.deleteUnregister = async (req, res, next) => {
  try {
    const { unregisterId } = req.params; 

    await prisma.unregistered.delete({
      where: {
        id: Number(unregisterId),
      },
    });

    res.json("Delete Unregister Success");
  } catch (err) {
    next(err);
  }
};


// Get Data
exports.recorderGetAll = async (req, res, next) => {
  try {
    const { data } = req.params;
    const result = await userService.getAllData(data);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.recorderGetOne = async (req, res, next) => {
  try {
    const { data, find, ref } = req.params;
    const result = await userService.getOneData(data, find, ref, Number);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.recorderGetByUser = async (req, res, next) => {
  try {
    const ref = req.username[0].subdistrictId;
    const { data, find } = req.params;
    const result = await userService.getByData(data, find, ref);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.recorderGetAllMatch = async (req, res, next) => {
  try {
    const { data, find, ref } = req.params;
    const result = await userService.getAllMatch(data, find, ref, Number);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

exports.recorderGetMatchString = async (req, res, next) => {
  try {
    const { data, find, ref } = req.params;
    const result = await userService.getAllMatch(data, find, ref, String);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

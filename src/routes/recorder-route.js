const express = require("express");
const recorderController = require("../controllers/recorder-controller");
const authenticate = require("../middlewares/authenticate");

const authRec = authenticate.authenticateRecorder;
const router = express.Router();

router.post("/create-address", authRec, recorderController.createHouseAddress);
router.patch(
  "/update-address/:addressId",
  authRec,
  recorderController.updateHouseAddress
);
router.delete(
  "/delete-address/:addressId",
  authRec,
  recorderController.deleteHouseAddress
);

router.post(
  "/create-pet-owner/:addressId",
  authRec,
  recorderController.createPetOwner
);
router.patch(
  "/update-petOwner/:petOwnerId",
  authRec,
  recorderController.updatePetOwner
);
router.delete(
  "/delete-petOwner/:petOwnerId",
  authRec,
  recorderController.deletePetOwner
);

router.post("/create-pet/:petOwnerId", authRec, recorderController.createPet);
router.patch("/update-pet/:petId", authRec, recorderController.updatePet);
router.delete("/delete-pet/:petId", authRec, recorderController.deletePet);

router.post("/create-nature", authRec, recorderController.createNature);
router.patch(
  "/update-nature/:natureId",
  authRec,
  recorderController.updateNature
);
router.delete(
  "/delete-nature/:natureId",
  authRec,
  recorderController.deleteNature
);

router.post("/create-location", authRec, recorderController.createLocation);
router.patch(
  "/update-location/:locationId",
  authRec,
  recorderController.updateLocation
);
router.delete(
  "/delete-location/:locationId",
  authRec,
  recorderController.deleteLocation
);

router.post(
  "/create-unregister/:subdistrictId",
  authRec,
  recorderController.createUnregister
);
router.patch(
  "/update-unregistered/:unregisterId",
  authRec,
  recorderController.updateUnregister
);
router.delete(
  "/delete-unregistered/:unregisterId",
  authRec,
  recorderController.deleteUnregister
);

// Get Data
router.get("/get/:data", authRec, recorderController.recorderGetAll);
router.get(
  "/get/table/:data/from/:find/:ref",
  authRec,
  recorderController.recorderGetOne
);
router.get("/getByData/table/:data/from/:find/", authRec, recorderController.recorderGetByUser)
router.get("/getMatch/table/:data/from/:find/:ref", authRec, recorderController.recorderGetAllMatch)

module.exports = router;

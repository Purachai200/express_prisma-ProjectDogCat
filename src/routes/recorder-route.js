const express = require("express");
const recorderController = require("../controllers/recorder-controller");

const router = express.Router();

router.post("/create-address", recorderController.createHouseAddress);
router.patch(
  "/:addressId/update-address",
  recorderController.updateHouseAddress
);
router.delete("/delete-address/:addressId", recorderController.deleteHouseAddress);

router.post("/:addressId/create-pet-owner", recorderController.createPetOwner);
router.patch("/:petOwnerId/update-petOwner", recorderController.updatePetOwner);
router.delete("/delete-petOwner/:petOwnerId", recorderController.deletePetOwner);

router.post("/:petOwnerId/create-pet", recorderController.createPet);
router.patch("/:petId/update-pet", recorderController.updatePet);
router.delete("/delete/:petId", recorderController.deletePet);

router.post("/create-nature", recorderController.createNature);
router.patch("/update-nature/:natureId", recorderController.updateNature);
router.delete("/delete-nature/:natureId", recorderController.deleteNature);

router.post("/create-location", recorderController.createLocation);
router.patch("/update-location/:locationId", recorderController.updateLocation);
router.delete(
  "/delete-location/:locationId",
  recorderController.deleteLocation
);

router.post(
  "/create-unregister/:subdistrictId",
  recorderController.createUnregister
);
router.patch(
  "/update-unregistered/:unregisterId",
  recorderController.updateUnregister
);
router.delete(
  "/delete-unregistered/:unregisterId",
  recorderController.deleteUnregister
);

// Get Data
router.get("/get/:data", recorderController.recorderGetAll);
router.get(
  "/get/table/:data/from/:find/:ref",
  recorderController.recorderGetOne
);

module.exports = router;

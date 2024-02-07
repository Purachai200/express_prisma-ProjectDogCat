const express = require("express");
const adminController = require("../controllers/admin-controller");
const authenticate = require("../middlewares/authenticate");

const authAdmin = authenticate.authenticateAdmin;

const router = express.Router();

router.post("/subdistrict",authAdmin, adminController.createSubDistrict);
router.patch(
  "/update-subdistrict/:subdistrictId",authAdmin,
  adminController.updateSubDistrict
);
router.delete("/delete-subdistrict/:subdistrictId",authAdmin, adminController.deleteSubdistrict)

router.post("/recorder",authAdmin, adminController.createRecorder);
router.patch("/update-recorder/:recorderId",authAdmin, adminController.updateRecorder);
router.delete("/delete-recorder/:recorderId",authAdmin, adminController.deleteRecorder);

router.get("/get/:data",authAdmin, adminController.adminGetData);
router.get("/get/table/:data/from/:find/:ref",authAdmin, adminController.adminGetDataOne);
router.get("/get/string/table/:data/from/:find/:ref",authAdmin, adminController.adminGetDataOneString);

module.exports = router;

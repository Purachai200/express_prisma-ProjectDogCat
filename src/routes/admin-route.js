const express = require("express");
const adminController = require("../controllers/admin-controller");

const router = express.Router();

router.post("/subdistrict", adminController.createSubDistrict);
router.patch(
  "/:subdistrictId/update-subdistrict",
  adminController.updateSubDistrict
);
router.delete("/delete-subdistrict/:subdistrictId", adminController.deleteSubdistrict)

router.post("/recorder", adminController.createRecorder);
router.delete("/delete-recorder/:recorderId", adminController.deleteRecorder);

router.get("/get/:data", adminController.adminGetData);
router.get("/get/table/:data/from/:find/:ref", adminController.adminGetDataOne);

module.exports = router;

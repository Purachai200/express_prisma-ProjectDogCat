const express = require("express");
const adminController = require("../controllers/admin-controller");

const router = express.Router();


router.post("/subdistrict", adminController.createSubDistrict);
router.post("/recorder", adminController.createRecorder);

module.exports = router;

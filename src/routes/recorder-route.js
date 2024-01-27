const express = require("express");
const recorderController = require("../controllers/recorder-controller")

const router = express.Router();

router.get("/create-address", recorderController.createHouseAddress);

module.exports = router;
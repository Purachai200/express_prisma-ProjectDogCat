const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controller");
const { authenticateAdmin, authenticateRecorder } = require("../middlewares/authenticate");

// Login And Register
router.post("/register", authController.register);
router.post("/login/admin", authController.adminLogin);
router.post("/login/recorder", authController.recorderLogin);

// Admin get Data
router.get("/get-admin", authenticateAdmin,authController.getAdmin);
// Recorder get Data
router.get("/get-recorder", authenticateRecorder,authController.getRecorder);

// Get Data
router.get("/getUnreg/:data", authController.getUnreg);
router.get("/getPet/:data", authController.getPet);


router.post("/forget-password", authController.forgetPassword);
router.get("/forget-password/:token", authController.verfyForgetPassword);
router.post("/reset-password/:token", authController.resetPassword);

module.exports = router;

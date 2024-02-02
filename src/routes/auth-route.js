const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controller");
const { authenticateAdmin, authenticateRecorder } = require("../middlewares/authenticate");

router.post("/register", authController.register);
router.post("/login/admin", authController.adminLogin);
router.post("/login/recorder", authController.recorderLogin);

router.get("/get-admin", authenticateAdmin,authController.getAdmin);
router.get("/get-recorder", authenticateRecorder,authController.getRecorder);

router.post("/forget-password", authController.forgetPassword);
router.get("/forget-password/:token", authController.verfyForgetPassword);
router.post("/reset-password/:token", authController.resetPassword);

module.exports = router;

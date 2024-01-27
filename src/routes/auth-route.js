const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controller");

router.post("/register", authController.register);
router.post("/login/admin", authController.adminLogin);
router.post("/login/recorder", authController.recorderLogin);
router.post("/forget-password", authController.forgetPassword);
router.get("/forget-password/:token", authController.verfyForgetPassword);
router.post("/reset-password/:token", authController.resetPassword);

module.exports = router;

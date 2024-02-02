const createError = require("../utils/createError");
const userService = require("../services/user-service");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register =================================================
exports.register = async (req, res, next) => {
  // รับ email password
  // check ว่ามี email password ไหม
  // check ว่ามี email เดียวกันในระบบหรือยัง
  // hash password ด้วย bcryptjs
  // เก็บ hashed ลง db
  const { first_name, last_name, username, password, email } = req.body;
  try {
    if (!first_name || !last_name || !email) {
      return createError(400, "Forget Some Data.");
    }

    if (
      typeof first_name !== "string" ||
      typeof last_name !== "string" ||
      typeof email !== "string"
    ) {
      return createError(400, "Some Data is invalid.");
    }

    if (!username || !password) {
      return createError(400, "Username and password are require.");
    }

    if (typeof username !== "string" || typeof password !== "string") {
      return createError(400, "Username or password is invalid.");
    }

    const isEmailExist = await userService.getUserByEmail("admin", email);
    if (isEmailExist) {
      return createError(400, "Email already exist.");
    }

    const isUserExist = await userService.getUserByUsername("admin", username);
    if (isUserExist) {
      return createError(400, "User already exist.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await userService.createAdmin(
      first_name,
      last_name,
      username,
      hashedPassword,
      email
    );

    res.json({ message: "Register Success." });
  } catch (error) {
    next(error);
  }
};
// Register =================================================

// AdminLogin ====================================================
exports.adminLogin = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return createError(400, "Username And Password Require.");
    }
    if (typeof username !== "string" || typeof password !== "string") {
      return createError(400, "Email or Password is invalid.");
    }

    const isUserExist = await userService.getUserByUsername("admin", username);
    if (!isUserExist) {
      return createError(400, "Email or Password is invalid.");
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      isUserExist.password
    );

    if (!isPasswordMatch) {
      return createError(400, "Email or Password is invalid.");
    }

    const token = jwt.sign({ id: isUserExist.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.json({ token });
  } catch (err) {
    next(err);
  }
};
// Login ====================================================

// RecorderLogin ====================================================
exports.recorderLogin = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return createError(400, "Username And Password Require.");
    }
    if (typeof username !== "string" || typeof password !== "string") {
      return createError(400, "Email or Password is invalid.");
    }

    const isUserExist = await userService.getUserByUsername(
      "recorder",
      username
    );
    if (!isUserExist) {
      return createError(400, "Email or Password is invalid.");
    }
    const isPasswordMatch = await bcrypt.compare(
      password,
      isUserExist.password
    );

    if (!isPasswordMatch) {
      return createError(400, "Email or Password is invalid.");
    }

    const token = jwt.sign({ id: isUserExist.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.json({ token });
  } catch (err) {
    next(err);
  }
};
// Login ====================================================

// getMe ====================================================

exports.getAdmin = (req, res, next) => {
  res.json(req.username);
};

exports.getRecorder = (req, res, next) => {
  res.json(req.username[0]);
};

// getMe ====================================================

exports.forgetPassword = (req, res, next) => {
  const { email } = req.body;
  // get token -> สร้าง Link -> ส่ง email
  res.json({ email });
};

// http://api.codecamp.com/auth/forget-password/asdfgjirj
exports.verfyForgetPassword = (req, res, next) => {
  const { token } = req.params;
  // Logic check token
  // redirect reset password -> ติด token

  res.json({ token });
};

exports.resetPassword = (req, res, next) => {
  const { token } = req.params;
  const { password } = req.body;

  // check token
  // เปลี่ยน password
  // เก็บ password ใหม่ ลง db
  res.json({ token, password });
};

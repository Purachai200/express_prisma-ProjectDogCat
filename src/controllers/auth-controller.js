const createError = require("../utils/createError");
const userService = require("../services/user-service");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

// Register =================================================
exports.register = async (req, res, next) => {
  // รับ email password
  // check ว่ามี email password ไหม
  // check ว่ามี email เดียวกันในระบบหรือยัง
  // hash password ด้วย bcryptjs
  // เก็บ hashed ลง db
  try {
    const { first_name, last_name, username, password, email } = req.body;

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
      return createError(400, "Email and password are require.");
    }

    if (typeof username !== "string" || typeof password !== "string") {
      return createError(400, "Email or password is invalid.");
    }

    const isEmailExist = await userService.getUserByEmail(email);
    if (isEmailExist) {
      return createError(400, "Email already exist.");
    }

    const isUserExist = await userService.getUserByEmail(username);
    if (isUserExist) {
      return createError(400, "User already exist.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log(hashedPassword)

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

// Login ====================================================
exports.login = async (req, res, next) => {
    try {
        const {username, password} = req.body;
        if (!username || !password) {
          return createError(400, "Username And Password Require.")
        }
        if (typeof username !== "string" || typeof password !== "string") {
          return createError(400, "Email or Password is invalid.")
        }

        const isUserExist = await userService.getUserByUsername(username);
        if(!isUserExist) {
          return createError(400, "Email or Password is invalid.")
        }

        const isPasswordMatch = bcrypt.compare(password, isUserExist.password)

        if(!isPasswordMatch) {
          return createError(400, "Email or Password is invalid.")
        }

        const token = jwt.sign({ id: isUserExist.id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES_IN,
        })

        res.json({ token })
    } catch (err) {
        next(err)
    }
  };
// Login ====================================================

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

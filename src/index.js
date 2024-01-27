require("dotenv").config();
const express = require("express");
const cors = require("cors");
const errorHandler = require("./middlewares/error");
const notFoundHandler = require("./middlewares/notFound");

const authRoute = require("./routes/auth-route");
const adminRoute = require("./routes/admin-route");
const recorderRoute = require("./routes/recorder-route")

const admin = require("./middlewares/admin");
const recorder = require("./middlewares/recorder")

const authenticate = require("./middlewares/authenticate");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("This is Dog And Cat DB");
});

app.use("/auth", authRoute);
app.use("/admin" ,authenticate.authenticateAdmin ,admin ,adminRoute);
app.use("/recorder" ,authenticate.authenticateRecorder ,recorder ,recorderRoute)

app.use(errorHandler);
app.use("*", notFoundHandler);

const port = process.env.PORT;
app.listen(port, () => {
  console.log("Server is running on port " + " " + port);
});

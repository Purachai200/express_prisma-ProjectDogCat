require("dotenv").config();
const express = require("express");
const cors = require("cors");
const errorHandler = require("./middlewares/error");
const notFoundHandler = require("./middlewares/notFound");

const app = express();

app.use(cors());
app.use(express.json());

app.use(errorHandler);
app.use("*", notFoundHandler);

const port = process.env.PORT;
app.listen(port, () => {
  console.log("Server is running on port " + " " + port);
});

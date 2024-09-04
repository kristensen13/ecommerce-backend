const express = require("express");
require("dotenv").config();
const path = require("path");
const morgan = require("morgan");

const images = require("./routes/uploads-cloudinary");

const cors = require("cors");

const { dbConnection } = require("./database/config");

// Create an Express app
const app = express();

app.use(morgan("common"));

// CORS
app.use(cors());

app.use("/api", images);

// Public directory
app.use(express.static("public"));

// Reading and parsing of the body
app.use(express.json());

// Database connection
dbConnection();

// Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/employees", require("./routes/employees"));
app.use("/api/stores", require("./routes/stores"));
app.use("/api/categories", require("./routes/categories"));
app.use("/api/products", require("./routes/products"));
app.use("/api/all", require("./routes/searches"));
// app.use("/api/upload", require("./routes/uploads"));
app.use("/api/login", require("./routes/auth"));

// Listen requests
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public/index.html"));
});

app.listen(process.env.PORT, () => {
  console.log("App listening on port 3000");
});

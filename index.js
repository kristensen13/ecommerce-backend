const express = require("express");
require("dotenv").config();
const cors = require("cors");

const { dbConnection } = require("./database/config");

// Create an Express app
const app = express();

// CORS
app.use(cors());

// Public directory
app.use(express.static("public"));

// Reading and parsing of the body
app.use(express.json());

// Database connection
dbConnection();

// Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/employees", require("./routes/employees.js"));
app.use("/api/stores", require("./routes/stores"));
// app.use("/api/categories", require("./routes/categories"));
// app.use("/api/products", require("./routes/products"));
app.use("/api/todo", require("./routes/searches"));
app.use("/api/upload", require("./routes/uploads"));
app.use("/api/login", require("./routes/auth"));

app.listen(process.env.PORT, () => {
  console.log("App listening on port 3000");
});

const mongoose = require("mongoose");

// MongoDB connection
const dbConnection = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_CNN, // Connection string
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { dbConnection };

const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB || 'mongodb+srv://quickjot:quickjot@cluster0.lgdix.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;

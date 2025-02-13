const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");
const { errorHandler } = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/dbConn.js");
const mongoose = require("mongoose");
const { logger, logEvents } = require("./middleware/logger");

connectDB();

app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", require("./routes/root"));

app.use("/users", require("./routes/userRoutes"));

app.all("*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.use(errorHandler);

const PORT = process.env.PORT || 8989;

mongoose.connection.once('open',()=>{
  console.log('Connected To Mongo DB')
  app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
  });
})

mongoose.connection.on('error', (err) => {
  console.log(err);
  logEvents('MongoDB connection error: ' + err, 'mongoError.log')
})

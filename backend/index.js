const express = require("express");
const app = express();
require("dotenv").config();
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes  = require("./routes/user.js");

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy());
app.use(morgan("common"));
app.use(cors({ origin: "*" }));

const port = process.env.PORT || 9001;

//routes
app.use('/',userRoutes)

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(9000, () => {
      console.log(`server is running at port: ${port}`);
    });
  })
  .catch((e) => {
    console.log(`Error connecting with Mongo D`, e);
  });

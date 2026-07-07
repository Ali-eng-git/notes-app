const express = require("express");
const app = express();
require("dotenv").config();
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes  = require("./routes/user.js");
const path = require("path");


app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy());
app.use(morgan("common"));
app.use(cors({ origin: "*" }));

const port = process.env.PORT || 9001;

//routes
app.use('/',userRoutes)

// catch-all so React Router routes work on refresh
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(port, () => {
      console.log(`server is running at port: ${port}`);
    });
  })
  .catch((e) => {
    console.log(`Error connecting with Mongo DB`, e);
  });

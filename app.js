const express = require("express");

const cors = require("cors");

const mongoose = require("mongoose");
const username = "lusky75";
const password = "iiluskyii75";
const dbname = "test";
const url =
  "mongodb+srv://" +
  username +
  ":" +
  password +
  "@cluster0.tbkc4.mongodb.net/" +
  dbname +
  "?retryWrites=true&w=majority";
const productRoute = require("./src/routes/productRoute");

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected: " + dbname))
  .catch((err) => console.log(err));

//models
const userModel = require("./src/models/users");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: true,
  })
);

app.use("/product", productRoute);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.post("/user/insert", (req, res, next) => {
  const name = req.body.name;
  const age = req.body.age;
  if (age == null) {
    return res.json({
      error: "age field is missing",
    });
  }
  if (name == null) {
    return res.json({
      error: "name field is missing",
    });
  }
  const newUser = new userModel({ name: name, age: age });

  newUser.save();
  res.status(200).send(newUser);
});

module.exports = app;

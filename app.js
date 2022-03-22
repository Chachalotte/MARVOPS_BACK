const express = require('express');

const mongoose = require("mongoose");
const username = "lusky75"
const password = "iiluskyii75"
const dbname = "test"
const url = 'mongodb+srv://' + username + ':' + password + '@cluster0.tbkc4.mongodb.net/' + dbname + '?retryWrites=true&w=majority'

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})   
.then(() => console.log("Database connected: " + dbname))
.catch(err => console.log(err));

//models
const userModel = require("./src/models/users");
const productModel = require("./src/models/products");

const app = express();
app.use(express.json());

//methods
function isEmpty(obj) {
  for(var prop in obj) {
      if(obj.hasOwnProperty(prop))
          return false;
  }
  return JSON.stringify(obj) === JSON.stringify({});
}

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.post('/user/insert', (req, res, next) => {

    const name = req.body.name
    const age = req.body.age
    if (age == null) {
      return res.status(500).send({
          "error": "age field is missing"
      }); 
    }
    if (name == null) {
      return res.status(500).send({
        "error": "name field is missing"
      });
    }
    const newUser = new userModel({"name": name, "age": age});

    newUser.save();
    res.status(200).send(newUser);
})



app.post('/product/insert', (req, res, next) => {
  const newProduct = new productModel(req.body);

  newProduct.save();
  res.status(200).send(newProduct);
})


module.exports = app;
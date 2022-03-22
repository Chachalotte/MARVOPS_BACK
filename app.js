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
.then(() => console.log("Database connected!"))
.catch(err => console.log(err));

//models
const userModel = require("./src/models/users");
const productModel = require("./src/models/products");

const app = express();
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.get('/api/stuff', (req, res, next) => {
    const stuff = [
      {
        _id: 'oeihfzeoi',
        title: 'Mon premier objet',
        description: 'Les infos de mon premier objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 4900,
        userId: 'qsomihvqios'   ,
      },
      {
        _id: 'oeihfzeomoihi',
        title: 'Mon deuxième objet',
        description: 'Les infos de mon deuxième objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 2900,
        userId: 'qsomihvqios',
      },
    ];
    res.status(200).json(stuff);
  });

app.post('/api/stuff', (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    message: 'Objet créé !'
  });
});

app.post('/user/insert', (req, res, next) => {
    const newUser = new userModel({
      name: "Lucas",
      age: 24
    });

    newUser.save();
    res.status(200).send(newUser);
})



app.post('/product/insert', (req, res, next) => {
  const newProduct = new productModel({
    name: "T-shirt"
  });

  newProduct.save();
  res.status(200).send(newProduct);
})


module.exports = app;
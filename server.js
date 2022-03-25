const app = require("./app");
const cors = require("cors");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);
let io = new Server(server, {
  cors: {
    origin: true,
  },
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/products", (req, res) => {
  res.sendFile(__dirname + "/products.html");
});

var count = 0;

const productModel = require("./src/models/products");

io.on("connection", (socket) => {
  count++;
  io.emit("count", count);

  socket.on("chat message", ({ msg, sessionId }) => {
    io.emit("chat message", { msg, sessionId });
  });

  socket.on("disconnect", () => {
    count--;
    io.emit("count", count);
  });

  socket.on("filteredProduct", function (data) {
    console.log(data);
    const price = data.price;
    const category = data.category;

    productModel
      .find({
        filters: {
          $elemMatch: { $or: [{ category: category }, { price: price }] },
        },
      })
      .then((model) => {
        let listProducts = [];
        model.forEach(function (productModel) {
          listProducts.push(productModel);
        });
        console.log(listProducts);
        socket.emit("listProduct", listProducts);
      });
  });
});

server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});

server.listen(port);

module.exports = server;

const express = require("express");

const cors = require("cors");

require("./db/config");

const User = require("./db/User");

const Product = require("./db/Product");

const jwt = require("jsonwebtoken");

const jwtKey = "e-comm";

const app = express();

app.use(express.json());

app.use(cors());

app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  jwt.sign({ result }, jwtKey, { expiresIn: "1hr" }, (err, token) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error in JWT signing");
    }
    res.send({ result, auth: token });
  });
});

app.post("/login", async (req, res) => {
  if (req.body.email && req.body.password) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      jwt.sign({ user }, jwtKey, { expiresIn: "1hr" }, (err, token) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Error in JWT signing");
        }
        res.send({ user, auth: token });
      });
    } else {
      res.status(401).send("Invalid credentials");
    }
  } else {
    res.status(401).send("Invalid credentials");
  }
});

app.post("/add", async (req, res) => {
  let product = new Product(req.body);
  let result = await product.save();
  res.send(result);
});

app.get("/products", async (req, res) => {
  let products = await Product.find();
  if (products.length > 0) {
    res.send(products);
  } else {
    res.send({ result: "No Products found" });
  }
});

app.delete("/product/:id", async (req, res) => {
  try {
    const result = await Product.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(result);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the product." });
  }
});

app.get("/product/:id", async (req, res) => {
  try {
    let result = await Product.findOne({ _id: req.params.id });
    if (result) {
      res.send(result);
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "An error occurred", error });
  }
});

app.put("/product/:id", async (req, res) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.send(result);
});

app.get("/search/:key", async (req, res) => {
  try {
    // Find products that match the search key in name, company, or category
    const result = await Product.find({
      $or: [
        { name: { $regex: req.params.key, $options: "i" } }, // Case-insensitive search
        { company: { $regex: req.params.key, $options: "i" } },
        { category: { $regex: req.params.key, $options: "i" } },
      ],
    });

    // Send the search results in the response
    res.send(result);
  } catch (error) {
    // Send a 500 status if there's an error
    res.status(500).send({ message: "An error occurred", error });
  }
});

function verifyToken(req, res, next) {
  // Get the token from the request header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Assuming format "Bearer TOKEN"

  if (token == null)
    return res.status(401).json({ message: "Token is required" });

  jwt.verify(token, jwtKey, (err, user) => {
    if (err)
      return res.status(403).json({ message: "Invalid or expired token" });
    // Attach the user information to the request object
    req.user = user;
    next();
  });
}

app.listen(5000);

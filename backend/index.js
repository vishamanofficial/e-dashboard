const express = require("express");

const cors = require("cors");

require("./db/config");

const User = require("./db/User");

const Product = require("./db/Product");

const app = express();

app.use(express.json());

app.use(cors());

app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  res.send(result);
});

app.post("/login", async (req, res) => {
  if (req.body.email && req.body.password) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      res.send(user);
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
})

app.get("/products", async (req, res) => {
  let products = await Product.find();
  if(products.length > 0 ){
    res.send(products);
  }else{
    res.send({result:"No Products found"})
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
    res.status(500).json({ error: "An error occurred while deleting the product." });
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
  let result = await Product.updateOne({ _id: req.params.id },
    { $set: req.body }
  );
  res.send(result);

})


app.listen(5000);

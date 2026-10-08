const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const users = [
  { id: 1, name: "Joan", department: "Computer Science" },
  { id: 2, name: "Vanesa", department: "Mathematics" },
  { id: 3, name: "Charlie", department: "Physics" },
];1

const products = [
  { id: 1, name: "Laptop", price: 1200, category: "Electronics" },
  { id: 2, name: "Textbooks", price: 800, category: "Educational" },
  { id: 3, name: "Faculty Dues", price: 500, category: "Administrative" },
];

app.get("/", (req, res) => {
  res.send("Welcome to the Student Marketplace!");
});

app.get("/products", (req, res) => {
  const name = req.query.name;

  if (name) {
    const product = products.find(
      (item) => item.name.toLowerCase() === name.toLowerCase(),
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.json(product);
  }

  res.json(products);
});

app.get("/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const product = products.find(function (product) {
    return product.id === id;
  });
  if (!product) {
    return res.status(404).send("Product not found");
  }
  res.json(product);
});

app.get("/products/:id/reviews", (req, res) => {
  const id = Number(req.params.id);
  const sort = req.query.sort || "latest";

  const product = products.find((item) => item.id === id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json({
    productId: id,
    productName: product.name,
    sortBy: sort,
  });
});



app.post("/products", (req, res) => {
    const newProduct = req.body;
    products.push(newProduct);
    res.status(201).json(newProduct);
});





app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Temporary storage
let products = [];
let nextId = 1;

// Receive POST request to add a product
app.post('/api/products', (req, res) => {
  console.log('POST request received!');
  

  const { name, category, price, quantity, description } = req.body;

  if (
    typeof name !== 'string' ||
    !name.trim() ||
    typeof category !== 'string' ||
    !category.trim() ||
    price === '' ||
    price === undefined ||
    !Number.isFinite(Number(price)) ||
    Number(price) < 0 ||
    quantity === '' ||
    quantity === undefined ||
    !Number.isInteger(Number(quantity)) ||
    Number(quantity) < 0
  ) {
    return res.status(400).json({
      message: 'Please enter valid product details.',
    });
  }

  const newProduct = {
    id: nextId++,
    name: name.trim(),
    category: category.trim(),
    price: Number(price),
    quantity: Number(quantity),
    description:
      typeof description === 'string' ? description.trim() : '',
  };

  products.push(newProduct);

  console.log('Product added:', newProduct);

  res.status(201).json({
    message: 'Product added successfully!'
  });
});

// Get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Start backend
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});

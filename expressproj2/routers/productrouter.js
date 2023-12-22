const express = require('express');
const router = express.Router();
const multer=require('multer')
const { Product,validateProduct } = require('../model/products');


const path = require('path');
const { v4: uuidv4 } = require('uuid');
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


router.get('/products/:productId', async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    
    if (!product) {
      return res.status(404).send('Product not found');
    }
    
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


router.post('/products', async (req, res) => {
  const productData = req.body;

  const validationResult = validateProduct(productData);

  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message);
  }

  try {
    const newProduct = await Product.create(productData);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


router.put('/products/:productId', async (req, res) => {
  const productData = req.body;

  const validationResult = validateProduct(productData);

  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message);
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.productId,
      productData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).send('Product not found');
    }

    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


router.delete('/products/:productId', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.productId);

    if (!deletedProduct) {
      return res.status(404).send('Product not found');
    }

    res.json(deletedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


const storage = multer.diskStorage({
    destination: 'uploads/', // Adjust the destination directory
    filename: (req, file, cb) => {
      const uniqueFilename = uuidv4() + path.extname(file.originalname);
      cb(null, uniqueFilename);
    },
  })
  router.use('/images', express.static('images'));
  const upload = multer({ storage });
  router.post('/upload', upload.single('image'), (req, res) => {
    console.log(req.file); 
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    console.log(imageUrl); 
    res.json({ imageUrl });
  });
  

module.exports = router;

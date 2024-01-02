const express = require('express');
const router = express.Router();
const multer=require('multer')
const { Product,validateProduct } = require('../model/products');
const{New,validateNews}=require('../model/news')

const path = require('path');
const { v4: uuidv4 } = require('uuid');



router.get('/products', async (req, res) => {
  try {
  

    const products = await Product.find()
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


router.get('/products/:productId', async (req, res) => {
  try {
    

    const productId = req.params.productId;
    console.log(productId); // Use productId, not _id

    const product = await Product.findById( productId)
    console.log(product)
    if (!product) {
      return res.status(404).send('Product not found');
    }
    
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


router.post('/', async (req, res) => {
  const productData = req.body;

  const validationResult = validateProduct(productData);

  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message);
  }
 
  
  try {
    const productData = {
      _id:req.body._id,
    prodname:req.body.prodname,
    prodseller:req.body.prodseller,
    userId:req.body.userId,
    description:req.body.description,
     price:req.body.price,
     quantity:req.body.quantity,
     category:req.body.category,
     DateOfManufacturing:req.body.DateOfManufacturing,
     images: req.body.imageUrl
    }
    const newProduct = await Product.create(productData);
    console.log(newProduct.images);

    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});






router.post('/news', async (req, res) => {
  const news = req.body;

  const validationResult = validateNews(news);

  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message);
  }
 
  
  try {
    const news = {
    _id:req.body._id,
    name:req.body.name,
  
    description:req.body.description,
     
     images: req.body.imageUrl
    }
    const newProduct = await New.create(news);
    

    res.status(201).json(news);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});



router.get('/productsnews', async (req, res) => {
  try {
  

    const products = await New.find()
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});



router.put('/products/:productId', async (req, res) => {
  const productData = req.body;
 console.log(productData)
  // const validationResult = validateProduct(productData);

  // if (validationResult.error) {
  //   return res.status(400).send(validationResult.error.details[0].message);
  // }
  const productId = req.params.productId;
    console.log(productId); // Use productId, not _id


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


router.delete('/delete/products/:productId', async (req, res) => {
  try {
    const productData = req.body;
    console.log(productData)
    const productId = req.params.productId;
    console.log(productId);
    const deletedProduct = await Product.findByIdAndDelete(productId);
    console.log(deletedProduct)
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
  destination: path.join(__dirname, 'uploads'),
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use the original filename
  },
})
 

  const upload = multer({ storage });

  router.post('/upload', upload.single('images'), (req, res) => {
    console.log(req.file); 
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    console.log(imageUrl); 
    res.json({ imageUrl });
  });
 


module.exports = router;

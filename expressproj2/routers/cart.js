const express = require('express');
const router = express.Router();
const { Cart, validateCartItem } = require('../model/cart');
const { Product,validateProduct } = require('../model/products');

// Get all cart items for a user
router.get('/:userId/items', async (req, res) => {
  try {
    const userId = req.params.userId;
    const cart = await Cart.find({ userId }).populate('items.productId', 'name price');

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Add a new item to the cart
// ...

// Add items to the cart
router.post('/', async (req, res) => {
    try {
      const { userId, items } = req.body;
  
      // Validate the incoming cart data
      const validationResult = validateCartItem({ userId, items });
  
      if (validationResult.error) {
        return res.status(400).json({ message: validationResult.error.details[0].message });
      }
  
      // Create a new cart
      const cart = new Cart({
        userId,
        items,
      });
   console.log(cart)
   
   // Calculate total quantity and total price based on items
cart.totalQuantity = items.reduce((total, item) => total + item.quantity, 0);

// Calculate total price based on items and product prices
const totalPricePromises = items.map(async (item) => {
  const product = await Product.findById(item.productId);

  if (!product) {
    // Handle the case where the product with the given ID is not found
    console.error(`Product not found for productId: ${item.productId}`);
    return 0; // Assuming a default price of 0 if product is not found
  }

  const productPrice = product.price;
  return item.quantity * productPrice;
});

// Use Promise.all to wait for all promises to resolve
const totalPriceArray = await Promise.all(totalPricePromises);
console.log(totalPriceArray)
// Sum up the total prices
cart.totalPrice = totalPriceArray.reduce((total, price) => total + price, 0);

      // Save the cart to the database
      await cart.save();
  
      res.status(200).json(cart)
     
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  // ...
  



// Remove an item from the cart
router.delete('/:userId/items/:itemId', async (req, res) => {
    const userId = req.params.userId;
    const itemId = req.params.itemId;
   
  try {
   if(!orderId){
    res.status(404).send("no orders")
   }
else{

    const cart = await Cart.findOneAndUpdate(
        
        { userId },
        { $pull: { items: { _id: itemId } } },
        { new: true }
      );
  console.log(cart)
      if (!cart) {
        return res.status(404).json({ message: 'Cart or item not found' });
      }
  
      res.json(cart);
    } 
}
catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
    
});



router.delete('/:orderId', async (req, res) => {
    const orderId = req.params.orderId;
  
   
  try {
   if(!orderId){
    res.status(404).send("no orders")
   }
else{

    const cart = await Cart.findOneAndDe(
        
       {_id:orderId},
        { new: true }
      );
  console.log(cart)
      if (!cart) {
        return res.status(404).json({ message: 'Cart order not found' });
      }
  
      res.json(cart);
    } 
}
catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
    
});

module.exports = router;

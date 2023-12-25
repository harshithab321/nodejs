const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const path = require('path');
const { Order, validate} = require('../model/orders');
const{Product}=require('../model/products');



router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/orders/:orderId', async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);

    if (!order) {
      return res.status(404).send('Order not found');
    }

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


router.post('/', async (req, res) => {
  try {
    // Step 1: Validate order data
    const orderData = req.body;
    const validationResult = validate(orderData);
console.log(validationResult)
    if (validationResult.error) {
      return res.status(400).send(validationResult.error.details[0].message);
    }

    // Log orderData for debugging
    console.log('Order Data:', orderData);

    // Step 2: Find products by custom-defined IDs
    const productIds = validationResult.value.productId;
console.log(productIds)
    // Assuming productIds is an array of custom-defined IDs (e.g., ['prod1', 'prod2'])
    const products = await Product.find({ _id: { $in: productIds } });

    // Log products for debugging
    console.log('Products:', products);

    // Step 3: Check quantity and update product quantities
    for (const product of products) {
      const orderedQuantity = orderData.quantity;
      if (product.quantity < orderedQuantity) {
        // Insufficient quantity, handle accordingly (e.g., return an error)
        return res.status(400).json({ success: false, message: 'Insufficient quantity for one or more products' });
      }

      // Update product quantity
      product.quantity -= orderedQuantity;
      await product.save();
    }

    // Step 4: Create new order
    const newOrderData = {
   
      customerId: req.body.customerId,
      productId: req.body.productId,  // Assuming productId is an array of strings
      orderDate: req.body.orderDate,
      totalPrice: req.body.totalPrice,
      quantity: req.body.quantity,
      address: req.body.address,
      // Other fields specific to your order schema
    };
  //  console.log( mydb.Orders.getIndexes())

    // Log newOrderData for debugging
    console.log('New Order Data:', newOrderData);

    const newOrder = await Order.create(newOrderData);

    // Log newOrder for debugging
    console.log('New Order:', newOrder);
  //  console.log( db.orders.find({ orderId: null }))

    // Step 5: Return success
    return res.status(201).json({ success: true, message: 'Order placed successfully', newOrder });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});



// router.put('/orders/:orderId', async (req, res) => {
//   const orderData = req.body;

//   const validationResult = validateProduct(orderData);

//   if (validationResult.error) {
//     return res.status(400).send(validationResult.error.details[0].message);
//   }

//   try {
//     const updatedOrder = await Order.findByIdAndUpdate(
//       req.params.orderId,
//       orderData,
//       { new: true }
//     );

//     if (!updatedOrder) {
//       return res.status(404).send('Order not found');
//     }

//     res.json(updatedOrder);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// });

router.delete('/delete/orders/:orderId', async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.orderId);

    if (!deletedOrder) {
      return res.status(404).send('Order not found');
    }

    res.json(deletedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});




module.exports = router;

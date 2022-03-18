const {Order} = require('../models/order');
const {Product} = require('../models/product')
const {OrderItem} = require('../models/order-item');
const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_51KeeRCHTZ2FrHXoyEfBItZ0CaF7C0TZ5Sr0fNxVhgVXO5BnWWmmsbgwKtpxITrgZ8AJjkWnBHx8FMXHltnl4zfV900I6rSdfwH');

router.get('/', async (req, res) =>{
    //we use populate to check which user make an order
    const orderList = await Order.find
    //we use name we dont need all info of user we only need name
    //also you sort date after populate method like populate().sort('dateOrdered')
    ().populate('user', 'name').populate({
        path:'orderItems', populate:{
        path: 'product', populate: 'category'}});
    if(!orderList){
        res.status(500).json({success: false})
    }
    res.send(orderList)
})

router.get('/:id', async(req,res)=>{
    const order = await Order.findById(req.params.id).populate('user', 'name').populate({
        path:'orderItems', populate:{
        path: 'product', populate: 'category'}});
    if(!order){
    return res.status(404).send('the order with the given ID cannot be created')
    }
    res.status(200).send(order);
})


//http://localhost:3000/api/v1/orders
router.post('/', async(req,res) =>{
    //this is the promise way logic part1 using async await

    //promise.all return the promise handling
    const orderItemsIds = Promise.all(req.body.orderItems.map(async orderitem =>{
        let newOrderItem = new OrderItem({
            quantity: orderitem.quantity,
            product: orderitem.product
        })
        newOrderItem = await newOrderItem.save();
       return newOrderItem._id;
    }))

    const orderItemsIdsResolved = await orderItemsIds;

     const totalPrices = await Promise.all(
         orderItemsIdsResolved.map(async (orderItemId)=>{
             const orderItem = await OrderItem.findById(orderItemId).populate('product', 'price');

             const totalPrice = orderItem.product.price * orderItem.quantity;
             return totalPrice
         })
     )

     const totalPrice = totalPrices.reduce((a,b) => a+b , 0);

    let order = new Order({
       orderItems:orderItemsIdsResolved,
       shippingAddress1: req.body.shippingAddress1,
       shippingAddress2 : req.body.shippingAddress2,
       city: req.body.city,
       zip: req.body.zip,
       country: req.body.country,
       phone: req.body.phone,
       status: req.body.status,
       totalPrice: totalPrice,
       user: req.body.user,


    })

    order = await order.save();

    if(!order)
        return res.status(404).send('the order cannot be created')

    res.send(order);

})

router.post('/create-checkout-session', async (req,res)=>{
    const orderItem = req.body;
    if(!orderItem){
        return res.status(400).send('checkout session cannot be created-check the order items');
    }

    const lineItems = await Promise.all(
        orderItem.map(async (orderItem)=>{
            const product = await Product.findById(orderItem.product);
            return{
                price_data:{
                    currency:'usd',
                    product_data:{
                        name: product.name,
                    },
                    unit_amount: product.price * 100
                },
                quantity: orderItem.quantity
            };
        })
    )
    const session = await stripe.checkout.session.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: 'http://localhost:4200/success',
        cancle_url : 'http://localhost:4200/error'
    })
    res.json({id: session.id});
})


router.put('/:id', async(req,res)=>{
    const order = await Order.findByIdAndUpdate(
        req.params.id,
        {
          status: req.body.status
        },
        {
            new: true
        }
    ) 
    if(!order)
    return res.status(404).send('the order cannot be updated')
  
  res.send(order);
  
  })

  router.delete('/:id', (req,res) =>{

    //this is the promise way logic part2 using then
    Order.findByIdAndRemove(req.params.id).then(async order =>{
        if(order){
            await order.orderItems.map(async orderItem =>{
                await OrderItem.findByIdAndRemove(orderItem)
            })
            return res.status(200).json({success: true, message: ' the Order is deleted'})
        }
        else{
            return res.status(404).json({success:false, message: "Order not found"})
        }
    }).catch(err=>{
        return res.status(400).json({success: false, error: err})
    })
})


//http://localhost:3000/api/v1/orders/get/totalsales

router.get('/get/totalsales', async(req,res)=>{
    const totalSales = await Order.aggregate([
        {
        $group:{_id: null, totalsales : {$sum: '$totalPrice'} }}
    ])

    if(!totalSales){
        return res.status(400).send('The order sales cannot be generated');
    }

    res.send({totalsales: totalSales.pop().totalsales})
})

//http://localhost:3000/api/v1/orders/get/count
router.get(`/get/count`, async (req, res) => {

  const orderCount = await Order.countDocuments()

  if(!orderCount){
      res.status(500).json({success: false})
  }

  res.send({
      orderCount: orderCount
  });
  })


  router.get('/get/userorders/:userid', async (req, res) =>{
   
    const userorderList = await Order.find
    ({
        user: req.params.userid
    }).populate({
        path:'orderItems', populate:{
        path: 'product', populate: 'category'}});
    if(!userorderList){
        res.status(500).json({success: false})
    }
    res.send(userorderList)
})

module.exports = router;
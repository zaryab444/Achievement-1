const {Order} = require('../models/order');
const {OrderItem} = require('../models/order-item');
const express = require('express');
const router = express.Router();

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


module.exports = router;
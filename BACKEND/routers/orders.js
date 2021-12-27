const {Order} = require('../models/order');
const {OrderItem} = require('../models/order-item');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) =>{
    //we use populate to check which user make an order
    const orderList = await Order.find
    //we use name we dont need all info of user we only need name
    //also you sort date after populate method like populate().sort('dateOrdered')
    ().populate('user', 'name');
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
    let order = new Order({
       orderItems:orderItemsIdsResolved,
       shippingAddress1: req.body.shippingAddress1,
       shippingAddress2 : req.body.shippingAddress2,
       city: req.body.city,
       zip: req.body.zip,
       country: req.body.country,
       phone: req.body.phone,
       status: req.body.status,
       totalPrice: req.body.totalPrice,
       user: req.body.user,


    })

    order = await order.save();

    if(!order)
        return res.status(404).send('the order cannot be created')

    res.send(order);

})

module.exports = router;
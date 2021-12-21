const {Product} = require('../models/product');
const {Category} = require('../models/category');
const express = require('express');
const router  = express.Router();

  //http://localhost:3000/api/v1/products
router.get(`/`, async(req,res)=>{


   ///this line tell if you want to show specific key and remove key we use minus

 // const productList = await Product.find().select('name image -_id');

    const productList = await Product.find();
    if(!productList){
      res.status(500).json({success:false})
    }
      res.send(productList);
  })

  //http://localhost:3000/api/v1/products/id
  router.get('/:id', async(req,res)=>{

    ///this line tell if you add feild of another table with current table we use populate method

    //you also use .populate in general get method after find().populate method
    const product = await Product.findById(req.params.id).populate('category');

    // const product = await Product.findById(req.params.id);
    if(!product){
      res.status(500).json({success:false})
    }
       res.send(product);
  })

  

  //http://localhost:3000/api/v1/products
  router.post(`/`, async(req,res)=>{
    const category = await Category.findById(req.body.category);

    if(!category) 
    return res.status(400).send('Invalid Category')



    let product = new Product({
      name: req.body.name,
      description: req.body.description,
      richDescription:req.body.richDescription,
      image: req.body.image,
      brand: req.body.brand,
      price: req.body.price,
      category:req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured
  
    })

    product = await product.save();
    if(!product)
    return res.status(500).send('The product cannot be created')

    res.send(product)
   
     
  })

  module.exports = router;
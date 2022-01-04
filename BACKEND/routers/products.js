const {Product} = require('../models/product');
const {Category} = require('../models/category');
const express = require('express');
const router  = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const FILE_TYPE_MAP ={
  'image/png':'png',
  'image/jpeg':'jpeg',
  'image/jpg':'jpg'
}

const storage = multer.diskStorage({
  destination: function (req,file,cb){
    const isvalid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error('invalid image type');
    if(isvalid){
      uploadError = null
    }
     cb(uploadError, 'public/uploads')
  },
  filename: function (req,file,cb){
  
    const fileName =  file.originalname.split(' ').join('-');
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`)
  }
})


const  uploadOptions = multer({storage: storage})





  //http://localhost:3000/api/v1/products
//or
//filter and getting  products by category id 
//http://localhost:3000/api/v1/products?categories=61c1c39d1fc78b020d8ea674 this is category id
router.get(`/`, async(req,res)=>{


   ///this line tell if you want to show specific key and remove key we use minus

 // const productList = await Product.find().select('name image -_id');
    let filter = {};
   if(req.query.categories)
   {
      filter = {category: req.query.categories.split(',')}
   }

    const productList = await Product.find(filter).populate('category');


    if(!productList){
      res.status(500).json({success:false})
    }
      res.send(productList);
  })

  //http://localhost:3000/api/v1/products/id
  router.get(`/:id`, async(req,res)=>{

    ///this line tell if you add feild of another table with current table we use populate method

    //you also use .populate in general get method after find().populate method
    const product = await Product.findById(req.params.id).populate('category'); //this 'category' come from product model where we referce

    // const product = await Product.findById(req.params.id);
    if(!product){
      res.status(500).json({success:false})
    }
       res.send(product);
  })

  //Note: when you update image so cancel images feild
  router.put('/:id',  uploadOptions.single('image'),async (req, res)=> {
    if(!mongoose.isValidObjectId(req.params.id)) {
       return res.status(400).send('Invalid Product Id')
    }
    const category = await Category.findById(req.body.category);
    if(!category) return res.status(400).send('Invalid Category')
    
  //check the product if exist or not 
  const product = await Product.findById(req.params.id);
  if(!product) return res.status(400).send('invalid Product');

  const file = req.file;
  let imagepath;

  if(file){
    
  const fileName = req.file.filename
  const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
 imagepath = `${basePath}${fileName}`
  }
  else{
    imagepath = product.image;
  }


    const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: imagepath,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured,
        },
        { new: true}
    )

    if(!updatedProduct)
    return res.status(500).send('the product cannot be updated!')

    res.send(updatedProduct);
})








  //http://localhost:3000/api/v1/products
  router.post(`/`, uploadOptions.single('image'), async(req,res)=>{
    const category = await Category.findById(req.body.category);

    if(!category) 
    return res.status(400).send('Invalid Category')

    const file = req.file;
    if(!file) return res.status(400).send('No Image in the request')


  const fileName = req.file.filename
  const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
    let product = new Product({
      name: req.body.name,
      description: req.body.description,
      richDescription:req.body.richDescription,
      image: `${basePath}${fileName}`,
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

  router.delete(`/:id`, (req,res) =>{

    //this is the promise way logic part2 using then
    Product.findByIdAndRemove(req.params.id).then(product =>{
        if(product){
            return res.status(200).json({success: true, message: ' the product is deleted'})
        }
        else{
            return res.status(404).json({success:false, message: "product not found"})
        }
    }).catch(err=>{
        return res.status(400).json({success: false, error: err})
    })
})

// get total product count
//http://localhost:3000/api/v1/products/get/count
router.get(`/get/count`, (req, res) => {
  Product.countDocuments().then(count => {
      if (count) {
          return res.status(200).json({ productCount: count });
      } else {
          return res.status(500).json({ success: false });
      }
  }).catch(err => {
      return res.status(400).json({
          success: false,
          error: err
      })
  });
})

router.get(`/get/featured/:count`, async (req,res) =>{
  const count = req.params.count ? req.params.count :0
  const products = await Product.find({isFeatured: true}).limit(+count);

  if(!products){
    res.status(500).json({success: false})
  }
  res.send(products)
})



//put: http://localhost:3000/api/v1/products/gallery-images/:productid
//Note: when you upload multiple images clear the image cancel the image field first

router.put('/gallery-images/:id',uploadOptions.
//maximum i need 10 images file in one request
array('images', 10), 
async (req, res)=> {
  if(!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send('Invalid Product Id')
 }
 
 const files = req.files
 let imagesPaths = [];
 const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
 if(files){
    files.map(file =>{
      imagesPaths.push(`${basePath}${file.filename}`)
    })
 }
 
 const product = await Product.findByIdAndUpdate(
  req.params.id,
  {
     images:imagesPaths
  },
  { new: true}
)
if(!product)
return res.status(500).send('The product cannot be created')

res.send(product)
}
)



  module.exports = router;
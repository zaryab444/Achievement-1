const {Category} = require('../models/category');
const express = require('express');
const router = express.Router();


router.get(`/`, async(req , res) =>{
    const categoryList = await Category.find();

    if(!categoryList){
        res.status(500).json({success: false})
    }
    res.send(categoryList)
})

//http://localhost:3000/api/v1/categories
router.post('/', async(req,res) =>{
     //this is the promise way logic part1 using async await
     let category = new Category({
         name: req.body.name,
         icon: req.body.icon,
         color: req.body.color

     })

     category = await category.save();

     if(!category)
         return res.status(404).send('the category cannot be created')

     res.send(category);

})

router.delete('/:id', (req,res) =>{

    //this is the promise way logic part2 using then
    Category.findByIdAndRemove(req.params.id).then(category =>{
        if(category){
            return res.status(200).json({success: true, message: ' the category is deleted'})
        }
        else{
            return res.status(404).json({success:false, message: "Category not found"})
        }
    }).catch(err=>{
        return res.status(400).json({success: false, error: err})
    })
})


module.exports = router;
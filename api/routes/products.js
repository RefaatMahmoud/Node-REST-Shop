const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../models/product");

router.get('/' , (req ,res ,next)=>{
  res.status(200).json({
    message : "GET all products"
  });
});

router.post('/' , (req ,res ,next) =>{
  // const product = {
  //   name: req.body.name,
  //   price: req.body.price
  // };
  // res.status(201).json({
  //   message : "Post request to product" ,
  //   createProduct : product
  // });

  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });

  product.save()
  .then(result => {
    res.status(201).json({
      message : "POST new product",
      createProduct : product
    });
  })
  .catch(err => {
    console.log(err)
  });

});

router.get('/:productId' , (req ,res ,next)=>{
  id = req.params.productId
  if(id === 'special'){
    res.status(200).json({
      message : "Valid to access product",
      id : id
    });
  }
  else{
    res.status(200).json({
      message : "Not Valid to access product",
    });
  }
});

router.patch('/:productId' , (req ,res ,next)=>{
  id = req.params.productId
    res.status(200).json({
      message : "Patch product",
    });
});

router.delete('/:productId' , (req ,res ,next)=>{
  id = req.params.productId
    res.status(200).json({
      message : "delete product",
    });
});

module.exports = router;
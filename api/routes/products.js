const express = require('express');
const router = express.Router();

router.get('/' , (req ,res ,next)=>{
  res.status(200).json({
    message : "GET all products"
  });
});

router.post('/' , (req ,res ,next)=>{
  res.status(201).json({
    message : "POST new product"
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
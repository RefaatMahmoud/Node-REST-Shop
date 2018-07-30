const express = require('express');
const router = express.Router();

router.get('/' , (req ,res ,next)=>{
  res.status(200).json({
    message : "GET all orders"
  });
});

router.post('/' , (req ,res ,next)=>{
  res.status(201).json({
    message : "POST new order"
  });
});

router.get('/:orderId' , (req ,res ,next)=>{
  id = req.params.orderId
  if(id === 'special'){
    res.status(200).json({
      message : "Valid to access order",
      id : id
    });
  }
  else{
    res.status(200).json({
      message : "Not Valid to access order",
    });
  }
});

router.patch('/:orderId' , (req ,res ,next)=>{
  id = req.params.orderId
    res.status(200).json({
      message : "Patch order",
    });
});

router.delete('/:orderId' , (req ,res ,next)=>{
  id = req.params.orderId
    res.status(200).json({
      message : "delete order",
    });
});

module.exports = router;
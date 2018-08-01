const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../models/product");

router.get('/', (req, res, next) => {
  Product.find()
  .exec()
  .then(result => {
    res.status('200').json({
      data : result
    });
  })
  .catch(err => {
    res.status('500').json({
      error : err
    })
  });
});

router.post('/', (req, res, next) => {

  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });

  product.save()
    .then(result => {
      res.status(201).json({
        message: "Handle POST requests for new product",
        createProduct: result
      });
    })
    .catch(err => {
      console.log(err)
    });
});

router.get('/:productId', (req, res, next) => {
  id = req.params.productId
  Product.findById({
      _id: id
    })
    .exec()
    .then(result => {
      res.status('200').json({
        data : result
      });
    })
    .catch(err => {
      res.status('500').json({
        error : err
      })
    });
});

router.patch('/:productId', (req, res, next) => {
  id = req.params.productId
  newName = req.body.name;
  newPrice = req.body.price;
  Product.update({_id:id} , {$set:{name:newName , price:newPrice}})
  .exec()
  .then(result => {
    res.status('200').json({
      data : result
    })
  })
  .catch(err => {
    res.status('500').json({
      error : err
    });
  });
});

router.delete('/:productId', (req, res, next) => {
  id = req.params.productId;
  Product.remove({_id : id})
  .exec()
  .then(result => {
    res.status('200').json({
      data : "this item is removed successfully"
    });
  })
  .catch(err => {
    res.status('500').json({
      error : err
    });
  });
});

module.exports = router;
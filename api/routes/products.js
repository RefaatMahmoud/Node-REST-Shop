const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../models/product");

router.get('/', (req, res, next) => {
  Product.find()
    .select('_id name price')
    .exec()
    .then(docs => {
      count = docs.length;
      //create response
      const response = {
        count: count,
        data: docs.map(doc => {
          return {
            _id: doc._id,
            name: doc.name,
            price: doc.price,
            request: {
              type: "GET",
              URL: `localhost:3000/products/${doc._id}`
            }
          }
        })
      }
      //return response
      res.status('200').json(response);
    })
    .catch(err => {
      //return error response
      res.status('500').json({
        error: err
      })
    })
});

router.post('/', (req, res, next) => {
  //create Object
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });
  product.save()
    .then(newdoc => {
      //create response
      const response = {
        message: "POST request for new product",
        data: {
          _id: newdoc._id,
          name: newdoc.name,
          price: newdoc.price
        }
      }
      //return response
      res.status('201').json(response)
    })
    //return Error response
    .catch(err => {
      res.status('500').json(err)
    });
});

router.get('/:productId', (req, res, next) => {
  id = req.params.productId
  Product.findById({
      _id: id
    })
    .exec()
    .then(doc => {
      const response = {
        message: "GET request for product by id",
        data: {
          _id: doc._id,
          name: doc.name,
          price: doc.price
        }
      }
      res.status('200').json(response)
    })
    .catch(err => {
      res.status('404').json({
        error: "No Valid entry found for provide id"
      })
    });
});

router.patch('/:productId', (req, res, next) => {
  id = req.params.productId
  newName = req.body.name;
  newPrice = req.body.price;
  //Validation in Update Request
  if (!newName) {
    res.status('404').json({
      error: "name is required"
    });
  }
  if (!newPrice) {
    res.status('404').json({
      error: "price not found"
    });
  }
  Product.update({
      _id: id
    }, {
      $set: {
        name: newName,
        price: newPrice
      }
    })
    .exec()
    .then(doc => {
      const response = {
        message: "PATCH request for product by id",
        data: {
          _id: id,
          name: newName,
          price: newPrice
        }
      }
      res.status('200').json(response)
    })
    .catch(err => {
      res.status('404').json({
        error: "No Valid entry found for provide id"
      })
    });
});

router.delete('/:productId', (req, res, next) => {
  id = req.params.productId;
  Product.remove({
      _id: id
    })
    .exec()
    .then(doc => {
      const response = {
        message: "DELETE request for product by id",
        data: "this item is removed successfully"
      }
      res.status('200').json(response);
    })
    .catch(err => {
      res.status('404').json({
        error: err
      });
    });
});

module.exports = router;
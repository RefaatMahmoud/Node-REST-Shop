const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/order');
const Product = require('../models/product');

router.get('/', (req, res, next) => {
  Order.find()
    .select('_id productId quantity')
    .exec()
    .then(docs => {
      count = docs.length;
      //create response
      const response = {
        count: count,
        data: docs.map(doc => {
          return {
            _id: doc._id,
            productId: doc.productId,
            quantity: doc.quantity,
            request: {
              type: "GET",
              URL: `localhost:3000/orders/${doc._id}`
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
  Product.findById(req.body.productId)
    .exec()
    .then(product => {
      //If productId not exits
      if (!product) {
        res.status('404').json({
          error: "productId not found"
        });
      }
      //create order Object
      const orderObj = new Order({
          _id: new mongoose.Types.ObjectId(),
          productId: req.body.productId,
          quantity: req.body.quantity
        })
        .save()
        .then(order => {
          //create response
          const response = {
            message: "order is created",
            data: {
              _id: order.id,
              productId: order.productId,
              quantity: order.quantity
            }
          }
          //return response
          res.status('201').json(response);
        })
        .catch(err => {
          res.status('500').json({
            error: err
          });
        })
    })
});

router.get('/:orderId', (req, res, next) => {
  Order.findById(req.params.orderId)
    .exec()
    .then(doc => {
      const response = {
        message: "GET request for product by id",
        data: {
          _id: doc._id,
          productId: doc.productId,
          quantity: doc.quantity
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

router.patch('/:orderId', (req, res, next) => {
  id = req.params.orderId
  NewProductId = req.body.productId;
  NewQuantity = req.body.quantity;

  Product.findById(NewProductId)
    .exec()
    .then(product => {
      //Validation in Update Request
      if (!NewProductId) {
        res.status('404').json({
          error: "productId is required"
        });
      }
      //If productId not exits
      if (!product) {
        res.status('404').json({
          error: "productId not found"
        });
      }
      if (!NewQuantity) {
        res.status('404').json({
          error: "quantity is required"
        });
      }
      //Update order
      Order.update({
          _id: id
        }, {
          $set: {
            productId: NewProductId,
            quantity: NewQuantity
          }
        })
        .exec()
        .then(order => {
          //create response
          const response = {
            message: "order is updated",
            data: {
              _id: id,
              productId: NewProductId,
              quantity: NewQuantity
            }
          }
          //return response
          res.status('201').json(response);
        })
        .catch(err => {
          res.status('500').json({
            error: err
          });
        })
    })
});

router.delete('/:orderId', (req, res, next) => {
  Order.remove({
      _id: req.params.orderId
    })
    .exec()
    .then(doc => {
      const response = {
        data: "order is deleted"
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
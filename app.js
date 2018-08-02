const express = require("express");
const app = express();
const mongoose = require('mongoose');
const productRoute = require('./api/routes/products');
const orderRoute = require('./api/routes/orders');
const morgan = require('morgan');
const bodyParser = require('body-parser');

//Connect DB
mongoose.connect('mongodb://localhost/node-REST-shop')
  .then(() => console.log('connected to Mongo db'))
  .catch(err => console.log(err));

mongoose.Promise = global.Promise;
//Morgan Middleware
app.use(morgan('dev'));
//body-pareser middleware
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

//Routes Middleware
app.use('/products', productRoute);
app.use('/orders', orderRoute);

//Handle error
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.json({
    error: {
      message: error.message
    }
  });
});
module.exports = app;
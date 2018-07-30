const express = require("express");
const app = express();

const productRouter = require('./api/routes/products');
app.use('/products' , productRouter);

const orderRouter = require('./api/routes/orders');
app.use('/orders' , orderRouter);

module.exports = app;

const express = require("express");
const app = express();

const productRoute = require('./api/routes/products');
const orderRoute = require('./api/routes/orders');


//Routes Middleware
app.use('/products' , productRoute);
app.use('/orders' , orderRoute);


//Handle error
app.use((req , res , next)=>{
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error , req , res, next)=>{
  res.json({
    error : {
      message : error.message
    }
  });
});
module.exports = app;

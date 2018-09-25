const express = require('express');

const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const productRoutes = require ('./api/routes/products');
const orderRoutes = require ('./api/routes/orders');

//CORS Cross-origin-resource-sharing
//in an API it is normal to serve data to client with different origin
//because we are not serving a web application but just data


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((res,req,next) => {
    res.header('Access-Control-Allow-Origin', '*');
    //which header we allow to be in the incoming request
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-type, Accept, Authorization');

    //beowser will always send an option request first before post req
    //because it will check if it is allowed to do such req
    if(req.method === 'OPTIONS'){
        //set all the possible http verbs i want to support in the API
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        //her i return because i just need to send back this response 
        //to the browser and stop 
        return res.status(200).json({});
    }
    next();
});


//app.use create a middleware, so every requests that arrives
//must pass trough the use 
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use((req,res,next) =>{
    const error = new Error('Not found');
    error.status = 404;
    //foreward the error request
    next(error);
});


app.use((error, req, res, next) =>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });

});

//export the app unction so that it can be called in another js file
module.exports = app;
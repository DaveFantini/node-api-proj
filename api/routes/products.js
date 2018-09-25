const express = require('express');
const router = express.Router();

//incoming get request
router.get('/', (req, res, next) => {
    res.status(200).json({
        message:'Handling GET requests to /products'
    });
});


router.post('/', (req, res, next) => {
    const product = {
        //with body parser there willl be a body property in the req
        //i know i have name in the incoming request because we as API creator
        //are either user of the API or if we intend to publish h API 
        //we should set up a documentation that state which data are needed to work correctly
        name: req.body.name,
        price: req.body.price
    }
    res.status(201).json({
        message:'Handling POST requests to /products',
        createdProduct: product
    });
});


router.get('/:productId', (req, res, next)=>{
    const id = req.params.productId;
    if(id === 'special'){
        res.status(200).json({
            message : 'You discovered the special ID',
            id: id
        });
    }else {
        res.status(200).json({
            message : "You passed an ID"
        });
    }
});


router.patch('/:productId', (req, res, next)=>{
    res.status(200).json({
        message: 'Updated product!'
    });
});



router.delete('/:productId', (req, res, next)=>{
    res.status(200).json({
        message: 'Deleted product!'
    });
});

module.exports = router;
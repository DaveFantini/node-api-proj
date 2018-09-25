const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const Product = require('../models/product');


//incoming get request
router.get('/', (req, res, next) => {
    Product.find()
    .exec()
    .then(docs => {
        console.log(docs);
        res.status(200).json(docs);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
});


router.post('/', (req, res, next) => {
        //with body parser there willl be a body property in the req
        //i know i have name in the incoming request because we as API creator
        //are either user of the API or if we intend to publish h API 
        //we should set up a documentation that state which data are needed to work correctly
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price:req.body.price 
    })
    product.
    save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message:'Handling POST requests to /products',
            createdProduct: product
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
    
});


router.get('/:productId', (req, res, next)=>{
    const id = req.params.productId;
    Product.findById(id)
    .exec()
    .then(doc => {
        console.log("From Database ", doc);
        if(doc){
            res.status(200).json(doc);    
        }else{
            res.status(404).json({message: "No valid entry found for provided id"});
        }
        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    });
});


router.patch('/:productId', (req, res, next)=>{
    const id = req.params.productId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Product.update({_id : id}, { $set: up })
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});



router.delete('/:productId', (req, res, next)=>{
    const id = req.params.productId;
    Product.remove({_id:id })
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        res.status(500).json({
            error:err
        })
    });
});

module.exports = router;
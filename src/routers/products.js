const express = require('express');
const { createConnection } = require('mongoose');
const router = new express.Router();
const product = require('../models/products');


router.get('/', async (req, res) =>{
    res.send("Hello, Welcome to Prodcut Api");
})

router.get('/products', async(req, res)=>{
        try {
            const data = await product.find({}).sort({_id:1});
            res.status(200).send(data);

        }
        catch (error) {
            res.status(404).send(error);
        }
});

router.get('/products/:name', async(req, res)=>{
    try {
        const name = req.params.name;
        const getProduct = await product.find({name});
        res.status(200).send(getProduct);

    }
    catch (error) {
        res.status(404).send(error);
    }
});


router.post('/products', async(req, res) => {
    try{
        if (Array.isArray(req.body)) {
            const dataInserted= await product.insertMany(req.body);
            res.status(201).send(dataInserted);
        }else{
            const addingProduct = new product(req.body)
            const inserted= await addingProduct.save();
            res.status(201).send(inserted);
        }
    }
    catch(error){
         console.log(error);
         res.status(400).send(error);
    }
 
 });
 
router.patch('/products/:id', async(req, res)=>{
    try {
        const _id=req.params.id;
        const updatedData = await product.findByIdAndUpdate(_id,req.body,
          {
              new:true
          }  
        );
        res.status(200).send(updatedData);

    }
    catch (error) {
        res.status(500).send(error);
    }
});

router.delete('/products/delete', async(req, res)=>{
    try {
        await product.deleteMany({});
        res.status(202).send("<h3>All products has been deleted Successfully</h3>");

    }
    catch (error) {
        res.status(500).send(error);
    }
});

router.delete('/products/delete/:id', async(req, res)=>{
    try {
        await product.findByIdAndDelete(req.params.id);
        res.status(202).send(`product with id ${req.params.id} has 
        been deleted`);

    }
    catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
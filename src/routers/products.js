const express = require('express');
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
            res.status(404).send(err);
        }
});

router.get('/products/:id', async(req, res)=>{
    try {
        const _id = req.params.id;
        const getProduct = await product.findById(_id);
        res.status(200).send(getProduct);

    }
    catch (error) {
        res.status(404).send(err);
    }
});


router.post('/products/add', async (req, res) =>{
    try{
       const addingProduct = new product(req.body)
       console.log(req.body);
       const inserted= await addingProduct.save();
       res.status(201).send(inserted);
    }
    catch(err){
         res.status(400).send(err);
    }
 
 });
 
router.patch('/products/:id', async(req, res)=>{
    try {
        const _id=req.params.id;
        const updatedData = await product.findByIdAndUpdate(_id,req.body,
          {
              useFindAndModify:false,
              new:true
          }  
        );
        res.status(204).send(updatedData);

    }
    catch (error) {
        res.status(500).send(err);
    }
});

router.delete('/products/delete', async(req, res)=>{
    try {
        await product.deleteMany({});
        res.status(202).send("<h3>All products has been deleted Successfully</h3>");

    }
    catch (error) {
        res.status(500).send(err);
    }
});

router.delete('/products/delete/:id', async(req, res)=>{
    try {
        await product.findByIdAndDelete(req.params.id);
        res.status(202).send(`product with id ${req.params.id} has 
        been deleted`);

    }
    catch (error) {
        res.status(500).send(err);
    }
});

module.exports = router;
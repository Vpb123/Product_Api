/*This file contains rounters to handle  all the methods */

/*Importing required modules */
const express = require('express');
const router = new express.Router();
const product = require('../models/products'),
verifyToken=require("../middlewares/verifyJWT")



/*Method to get list of all products  */
router.get('/products',verifyToken, async(req, res)=>{
        try {
            const data = await product.find({}).sort({_id:1});
            res.status(200).send(data);

        }
        catch (error) {
            res.status(404).send(error);
        }
});

/*Method to get particular product using name  */
router.get('/products/:name',verifyToken, async(req, res)=>{
    try {
        const name = req.params.name;
        const getProduct = await product.find({name});
        res.status(200).send(getProduct);

    }
    catch (error) {
        res.status(404).send(error);
    }
});

/*Mehtod to add products to the database (One or List of Products) */
router.post('/products',verifyToken, async(req, res) => {
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
 
/*Method to access the particular product using id and update it */
router.patch('/products/:id', verifyToken, async(req, res)=>{
    try {
        const _id=req.params.id;
        const updatedData = await product.findByIdAndUpdate(_id,req.body,
          {
              new:true /*So that we can get the updated data in response */
          }  
        );
        res.status(200).send(updatedData);

    }
    catch (error) {
        res.status(500).send(error);
    }
});

/*Method to delete all products from database */
router.delete('/products/delete',verifyToken, async(req, res)=>{
    try {
        await product.deleteMany({});
        res.status(202).send("<h3>All products has been deleted Successfully</h3>");

    }
    catch (error) {
        res.status(500).send(error);
    }
});

/*Method to delete particular product using id */
router.delete('/products/delete/:id',verifyToken, async(req, res)=>{
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
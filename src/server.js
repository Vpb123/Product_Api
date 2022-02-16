const express= require('express');

const app = express();
const port = process.env.PORT || 8000;
const router=require('./routers/products');
app.use(express.json());
app.use(router);


app.listen(port, () =>{
    console.log(`connection is live now at port ${port}`);
})
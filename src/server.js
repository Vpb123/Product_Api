const express= require('express');

const app = express();
const port = process.env.PORT || 8000; /* Port is either 8000 or available port on system*/
const router=require('./routers/products'); /*Imported routers  from router folder*/
app.use(express.json());
app.use(router);


app.listen(port, () =>{
    console.log(`connection is live now at port ${port}`);
})
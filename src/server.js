const express= require('express');

const app = express();
const port = process.env.PORT || 8000; /* Port is either 8000 or available port on system*/
const productRoutes=require('./routers/products'); /*Imported routers  from router folder*/
const userRoutes =  require("./routers/user");
app.use(express.json());
// app.use((req,res,next)=>{
//     res.header(
//         "Access-Control-Allow-Headers",
//         "x-access-token, Origin, Content-Type, Accept"
//       );
//     next();
// })

app.use(productRoutes, userRoutes);

app.listen(port, () =>{
    console.log(`connection is live now at port ${port}`);
})
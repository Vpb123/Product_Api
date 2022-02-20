const mongoose=require("mongoose");

/*Connecting  to database */
mongoose.connect("mongodb://127.0.0.1:27017/mydb",{
    useNewUrlParser: true,
    // useFindAndModify: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
}).then(() => {
    console.log("Connection Successful...");
}).catch((err)=>{ 
    console.log(err);
});


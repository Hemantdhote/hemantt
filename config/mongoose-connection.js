const mongoose=require('mongoose');
mongoose.connect(process.env.MONGO_DB_URI).then(function(){
    console.log("mongo db connected");
})



const db=mongoose.connection;
module.exports=db;
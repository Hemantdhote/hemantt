const mongoose= require('mongoose');
const hisaabModel=mongoose.Schema({
   title:{
    type:String,
    required:true,
    trim:true,
    minLength:3,
    maxLength:30,

   },
   discription:{
    type:String,
    required:true,
    trim:true
   },
   user:{
    type:mongoose.Schema.Types.ObjectId,ref:"user"
   },
   encrypted:{
    type:Boolean,
    default:false
   },
   shareable:{
    type:Boolean,
    default:false,
   },
   passcode:{
    type:String,
    default:"",
   },
   editpremission:{
    type:Boolean,
    default:false,
   }
},{timestamps:true})

module.exports=mongoose.model("hissab",hisaabModel);
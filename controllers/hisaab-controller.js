const hisaabModel = require("../models/hisaab-model");
const userModel = require("../models/user-model");

module.exports.createHisaabController=async function(req,res){
   
    let {title,description,shareable,editpermission,passcode, encrypted }=req.body;

     encrypted=encrypted==='on'? true:false;
     shareable=shareable==='on'? true:false;
     editpermission=editpermission==='on'? true:false;


     try{
        const hisabcreated= await hisaabModel.create({
            title,
            description,
            encrypted,
            editpermission,
            passcode,
            shareable,
            user:req.user._id
        });
    
        let user =await userModel.findOne({email:req.user.email})
        
        
        user.hisaab.push(hisabcreated._id);
        await user.save();
        res.redirect('/profile');

     }
     catch(err){
        res.send(err.message);
     }



   
};

module.exports.hisaabPageController= async function(req,res){
    res.render('create');
}
const userModel=require('../models/user-model')

const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

module.exports.landingPageController =function(req,res){
    res.render("index",{loggedin:false});
}

module.exports.registerPageController =function(req,res){
    res.render("register");
}


module.exports.registerController = async function(req,res){
    try{
        let {name,email,username, password}=req.body;
    let user= await userModel.findOne({email});
    if(user) return res.send("you already have an account , please login");


    let salt=await bcrypt.genSalt(10);
    let hased=await bcrypt.hash(password,salt);

    user=userModel.create({
        name,
        username,
        email,
        password:hased
    });
    let token=jwt.sign({id:user._id ,email:user.email},process.env.JWT_KEY)

    res.cookie("token",token);
    res.send("acount created successfully")

    }

    catch(err){
        res.send(err.message);
    }
}

module.exports.loginController =async function(req,res){
   let {email,password}=req.body;
   let user=await userModel.findOne({email}).select("+password");
   if(!user) return res.send("you don't have an account. please create one");

   let result=  await bcrypt.compare(password, user.password);
   if(result){
    let token=jwt.sign({id:user._id ,email:user.email},process.env.JWT_KEY)

    res.cookie("token",token);
    res.redirect('/profile')

   }
   else{
    res.send("your details are incorrect");
   }
   
   
}

module.exports.logoutController =function(req,res){
    res.cookie("token","");
    return res.redirect('/');
}

module.exports.profileController =async function(req,res){
    console.log(req.body.user);


    let byDate=Number(req.query.byDate);
    let {startDate,endDate}=req.query;

    byDate=byDate? byDate:-1;
    startDate=startDate? startDate:new Date("1970-01-01");
    endDate=endDate? endDate:new Date();



 let user= await  userModel.findOne({email:req.user.email}).populate({
    path:'hisaab',
    match:{createdAt:{$gte:startDate,$lte:endDate}},
    options:{sort:{createdAt:byDate}},
 });
  res.render('profile',{user});
};


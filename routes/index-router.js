const express=require('express');
const router=express.Router();
const {landingPageController,
       registerPageController,
       registerController,
       loginController,
       logoutController,
       profileController}=require('../controllers/index-controller');
const {isLoggedIn, redirectIfLoggedIn} = require('../middleware/auth-middlewares');

router.get('/',redirectIfLoggedIn, landingPageController);
router.get('/register', registerPageController);
router.post('/register', registerController);
router.post('/login', loginController);
router.get('/logout', logoutController);
router.get('/profile', isLoggedIn, profileController);

module.exports =  router;
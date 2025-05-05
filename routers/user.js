const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const authMiddleware = require('../middelware/auth.middelware');
const userController = require('../controllers/user.controller');


router.post('/ragister',[
    body('name').isLength({min: 3}).withMessage('Name must be at least 3 characters long'),
    body('phone').isLength({min: 8}).withMessage('Phone number must be at least 8 characters long'),
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('location_id').notEmpty().withMessage('Location ID is required'),
    body('location_name').isLength({min: 3}).withMessage('Location Name must be at least 3 characters long'),
    body('address').isLength({min: 3}).withMessage('Address must be at least 3 characters long'),
    body('password').isLength({min: 5}).withMessage('Password must be at least 5 characters long'),
    body('divice_id').notEmpty().withMessage('divice_id is required'),
    body('divice_type').notEmpty().withMessage('divice_type is required'),
    body('divice_token').notEmpty().withMessage('divice_token is required'),
    body('is_ragistered').notEmpty().withMessage('is_ragistered is required'),
], userController.ragisterUser);


router.post('/login',[
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password'),
    body('divice_id').notEmpty().withMessage('divice_id is required'),
    body('divice_type').notEmpty().withMessage('divice_type is required'),
    body('divice_token').notEmpty().withMessage('divice_token is required'),
], userController.loginUser);

router.post('/add_user_without_ragister',[
    body('divice_id').notEmpty().withMessage('divice_id is required'),
    body('divice_type').notEmpty().withMessage('divice_type is required'),
    body('divice_token').notEmpty().withMessage('divice_token is required'),
    body('is_ragistered').notEmpty().withMessage('is_ragistered is required'),
], userController.addUserWithoutRagister);

router.put('/update_profile/:id',[
    body('name').isLength({min: 3}).withMessage('Name must be at least 3 characters long'),
    body('phone').isLength({min: 8}).withMessage('Phone number must be at least 8 characters long'),
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('location_id').notEmpty().withMessage('Location ID is required'),
    body('location_name').isLength({min: 3}).withMessage('Location Name must be at least 3 characters long'),
    body('address').isLength({min: 3}).withMessage('Address must be at least 3 characters long'),
],authMiddleware.authUser, userController.updateProfile);
 
router.get('/profile/:id',userController.getProfile);


router.post('/send_otp', userController.sendOTP);

router.put('/forget_password/:email',[
    body('password').isLength({min: 5}).withMessage('Password must be at least 5 characters long'),
],userController.forgetPassword);


router.get('/list', userController.getAllUserProfile);

// router.get('/logout',authMiddleware.authAdmin, userController.logout);

module.exports = router;
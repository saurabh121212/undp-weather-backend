const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const authMiddleware = require('../middelware/auth.middelware');
const userController = require('../controllers/admin.controller');


router.post('/ragister',[
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({min: 5}).withMessage('Password must be at least 5 characters long'),
    body('name').isLength({min: 3}).withMessage('Name must be at least 3 characters long'),
], userController.ragisterAdmin);


router.post('/login',[
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password'),
], userController.loginAdmin);

router.post('/add_user_without_ragister',[
    body('divice_id').required().withMessage('divice_id is required'),
    body('divice_type').required().withMessage('divice_type is required'),
    body('divice_token').required().withMessage('divice_token is required'),
    body('is_ragistered').required().withMessage('is_ragistered is required'),
], userController.loginAdmin);


router.get('/profile',authMiddleware.authAdmin, userController.getProfile);

router.get('/update',authMiddleware.authAdmin, userController.getProfile);

router.put('/forget_password',authMiddleware.authAdmin, userController.getProfile);

router.put('/send_otp',authMiddleware.authAdmin, userController.getProfile);

router.get('/logout',authMiddleware.authAdmin, userController.logout);

module.exports = router;
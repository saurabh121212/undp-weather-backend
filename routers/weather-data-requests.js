const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const authMiddleware = require('../middelware/auth.middelware');
const WeatherDataController = require('../controllers/weatherDataReques.controller');

// This is used to add FAQs to the database
// It requires the user to be authenticated as an admin


router.post('/add',[
    body('name').isLength({min: 3}).withMessage('name must be at least 3 characters long'),
    body('mobile'),
    body('email').isEmail().withMessage('Email must be a valid email address'),
    body('message').isLength({min: 3}).withMessage('Message must be at least 3 characters long'),
    body('mediume').isLength({min: 3}).withMessage('Mediume must be at least 3 characters long'),
    body('use_of_data').isLength({min: 3}).withMessage('Use of data must be at least 3 characters long'),
],authMiddleware.authUser,WeatherDataController.add);

// router.put('/update/:id',[
//     body('name').isLength({min: 3}).withMessage('name must be at least 3 characters long'),
//     body('description').isLength({min: 3}).withMessage('description must be at least 3 characters long'),
//     body('url').isLength({min: 3}).withMessage('url must be at least 3 characters long'),
// ] ,authMiddleware.authAdmin, FeedbackController.update);

// This is used in Mobile app to get the list of FAQs
router.get('/list', WeatherDataController.get);

// router.put('/delete/:id',authMiddleware.authAdmin, FeedbackController.delete);

module.exports = router;
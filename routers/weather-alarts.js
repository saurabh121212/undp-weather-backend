const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const authMiddleware = require('../middelware/auth.middelware');
const weatherAlartsController = require('../controllers/weatherAlarts.controller');

// This is used to add FAQs to the database
// It requires the user to be authenticated as an admin

router.post('/add',[
    body('name').isLength({min: 3}).withMessage('name must be at least 3 characters long'),
    body('description').isLength({min: 3}).withMessage('description must be at least 3 characters long'),
    body('todate'),
    body('fromdate'),
    body('disasterType').isLength({min: 3}).withMessage('disasterType must be at least 3 characters long'),
    body('severity').isLength({min: 3}).withMessage('severity must be at least 3 characters long'),
    body('responseType').isLength({min: 3}).withMessage('responseType must be at least 3 characters long'),
    body('certaintyType').isLength({min: 3}).withMessage('certaintyType must be at least 3 characters long'),
],authMiddleware.authAdmin, weatherAlartsController.add);

router.put('/update/:id',[
    body('name').isLength({min: 3}).withMessage('name must be at least 3 characters long'),
    body('description').isLength({min: 3}).withMessage('description must be at least 3 characters long'),
    body('todate'),
    body('fromdate'),
    body('disasterType').isLength({min: 3}).withMessage('disasterType must be at least 3 characters long'),
    body('severity').isLength({min: 3}).withMessage('severity must be at least 3 characters long'),
    body('responseType').isLength({min: 3}).withMessage('responseType must be at least 3 characters long'),
    body('certaintyType').isLength({min: 3}).withMessage('certaintyType must be at least 3 characters long'),
] ,authMiddleware.authAdmin, weatherAlartsController.update);

// This is used in Mobile app to get the list of FAQs
router.get('/list', weatherAlartsController.get);

router.put('/delete/:id',authMiddleware.authAdmin, weatherAlartsController.delete);

module.exports = router;
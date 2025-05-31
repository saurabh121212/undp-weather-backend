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
    body('todate').notEmpty().withMessage('To Date is required'),
    body('fromdate').notEmpty().withMessage('From Date is required'),
    body('disasterType').notEmpty().withMessage('Disaster Type is required'),
    body('severity').notEmpty().withMessage('Severity is required'),
    body('responseType').notEmpty().withMessage('Response Type is required'),
    body('certaintyType').notEmpty().withMessage('Certainty Type is required'),
    body('short_description').isLength({min: 3}).withMessage('Short description must be at least 3 characters long'),
],authMiddleware.authAdmin, weatherAlartsController.add);

router.put('/update/:id',[
    body('name').isLength({min: 3}).withMessage('name must be at least 3 characters long'),
    body('description').isLength({min: 3}).withMessage('description must be at least 3 characters long'),
    body('todate').notEmpty().withMessage('To Date is required'),
    body('fromdate').notEmpty().withMessage('From Date is required'),
    body('disasterType').notEmpty().withMessage('Disaster Type is required'),
    body('severity').notEmpty().withMessage('Severity is required'),
    body('responseType').notEmpty().withMessage('Response Type is required'),
    body('certaintyType').notEmpty().withMessage('Certainty Type is required'),
    body('short_description').isLength({min: 3}).withMessage('Short description must be at least 3 characters long'),
] ,authMiddleware.authAdmin, weatherAlartsController.update);

// This is used in Mobile app to get the list of Alarts
router.get('/list', weatherAlartsController.get);

// This is used in Mobile app to get the list of Alarts by the date
router.get('/alarts_by_date/:todayDate/:todayTime', weatherAlartsController.getAlartsByDate);

router.put('/delete/:id',authMiddleware.authAdmin, weatherAlartsController.delete);

module.exports = router;
const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const authMiddleware = require('../middelware/auth.middelware');
const ReportIncidentController = require('../controllers/reportIncident.controller');

// This is used to add FAQs to the database


router.post('/add',[
    body('name').isLength({min: 3}).withMessage('name must be at least 3 characters long'),
    body('mobile').isLength({min: 3}).withMessage('Mobile must be at least 8 characters long'),
    body('location').isLength({min: 3}).withMessage('Location must be at least 3 characters long'),
    body('message').isLength({min: 3}).withMessage('Message must be at least 3 characters long'),
    body('url').isLength({min: 3}).withMessage('url must be at least 3 characters long'),
],authMiddleware.authUser, ReportIncidentController.add);

// router.put('/update/:id',[
//     body('name').isLength({min: 3}).withMessage('name must be at least 3 characters long'),
//     body('description').isLength({min: 3}).withMessage('description must be at least 3 characters long'),
//     body('url').isLength({min: 3}).withMessage('url must be at least 3 characters long'),
// ] ,authMiddleware.authAdmin, FeedbackController.update);

// This is used in Mobile app to get the list of FAQs
router.get('/list', ReportIncidentController.get);

// router.put('/delete/:id',authMiddleware.authAdmin, FeedbackController.delete);

module.exports = router;
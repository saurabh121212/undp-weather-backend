const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const authMiddleware = require('../middelware/auth.middelware');
const RiskAndResponseController = require('../controllers/riskandresponse.controller');

// This is used to add FAQs to the database
// It requires the user to be authenticated as an admin

router.post('/add',[
    body('name').isLength({min: 3}).withMessage('name must be at least 3 characters long'),
    body('description').isLength({min: 3}).withMessage('description must be at least 3 characters long'),
    body('url').isLength({min: 3}).withMessage('url must be at least 3 characters long'),
    body('short_description').isLength({min: 3}).withMessage('Short description must be at least 3 characters long'),
],authMiddleware.authAdmin, RiskAndResponseController.add);

router.put('/update/:id',[
    body('name').isLength({min: 3}).withMessage('name must be at least 3 characters long'),
    body('description').isLength({min: 3}).withMessage('description must be at least 3 characters long'),
    body('url').isLength({min: 3}).withMessage('url must be at least 3 characters long'),
    body('short_description').isLength({min: 3}).withMessage('Short description must be at least 3 characters long'),
] ,authMiddleware.authAdmin, RiskAndResponseController.update);

// This is used in Mobile app to get the list of FAQs
router.get('/list', RiskAndResponseController.get);

router.put('/delete/:id',authMiddleware.authAdmin, RiskAndResponseController.delete);

module.exports = router;
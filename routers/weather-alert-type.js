const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const authMiddleware = require('../middelware/auth.middelware');
const weatherAlertTypeController = require('../controllers/weatherAlertType.controller');

// This route is used to add a new weather category
// It requires the user to be authenticated as an admin

router.post('/add',[
    body('name').isLength({min: 3}).withMessage('Name must be at least 3 characters long'),
],authMiddleware.authAdmin, weatherAlertTypeController.addWeatherAlertType);

router.put('/update/:id',[
    body('name').isLength({min: 3}).withMessage('Name must be at least 3 characters long'),
],authMiddleware.authAdmin, weatherAlertTypeController.updateWeatherAlertType);


router.get('/list',authMiddleware.authAdmin, weatherAlertTypeController.getWeatherAlertType);
router.put('/delete/:id',authMiddleware.authAdmin, weatherAlertTypeController.deleteWeatherAlertType);


module.exports = router;
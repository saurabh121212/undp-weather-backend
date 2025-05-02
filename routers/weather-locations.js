const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const authMiddleware = require('../middelware/auth.middelware');
const weatherLocationsController = require('../controllers/weatherLocations.contoller');

// This route is used to add a new weather category
// It requires the user to be authenticated as an admin

router.post('/add',[
    body('name').isLength({min: 3}).withMessage('Name must be at least 3 characters long'),
],authMiddleware.authAdmin, weatherLocationsController.addWeatherLocations);

router.put('/update/:id',[
    body('name').isLength({min: 3}).withMessage('Name must be at least 3 characters long'),
],authMiddleware.authAdmin, weatherLocationsController.updateWeatherLocations);


router.get('/list',authMiddleware.authAdmin, weatherLocationsController.getWeatherLocations);
router.put('/delete/:id',authMiddleware.authAdmin, weatherLocationsController.deleteWeatherLocations);


module.exports = router;
const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const authMiddleware = require('../middelware/auth.middelware');
const WeatherDetailsController = require('../controllers/weatherDetails.controller');

// This is used to add FAQs to the database
// It requires the user to be authenticated as an admin


router.post('/add',[
    body('date').isEmpty().withMessage('date is required'),
    body('location_id').isEmpty().withMessage('location_id is required'),
    body('location_name').isEmpty().withMessage('location_name is required'),
    
],authMiddleware.authAdmin,WeatherDetailsController.add);

// router.put('/update/:id',[
//     body('name').isLength({min: 3}).withMessage('name must be at least 3 characters long'),
//     body('description').isLength({min: 3}).withMessage('description must be at least 3 characters long'),
//     body('url').isLength({min: 3}).withMessage('url must be at least 3 characters long'),
// ] ,authMiddleware.authAdmin, FeedbackController.update);

// This is used in Mobile app to get the list of FAQs

router.get('/weather_updates', WeatherDetailsController.weatherUpdates);

router.get('/location_weather_updates', WeatherDetailsController.locationWeatherUpdates);

router.get('/search_location', WeatherDetailsController.searchLocation);

router.get('/all_location', WeatherDetailsController.allLocation);






// router.put('/delete/:id',authMiddleware.authAdmin, FeedbackController.delete);

module.exports = router;
const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const authMiddleware = require('../middelware/auth.middelware');
const weatherCategoriesController = require('../controllers/weatherCategories.contoller');

// This route is used to add a new weather category
// It requires the user to be authenticated as an admin

router.post('/add',[
    body('name').isLength({min: 3}).withMessage('Name must be at least 3 characters long'),
    body('url').notEmpty().withMessage('url is required'),
],authMiddleware.authAdmin, weatherCategoriesController.addWeatherCategories);

router.put('/update/:id',[
    body('name').isLength({min: 3}).withMessage('Name must be at least 3 characters long'),
    body('url').notEmpty().withMessage('url is required'),
],authMiddleware.authAdmin, weatherCategoriesController.updateWeatherCategories);


router.get('/list',authMiddleware.authAdmin, weatherCategoriesController.getWeatherCategories);
router.put('/delete/:id',authMiddleware.authAdmin, weatherCategoriesController.deleteWeatherCategories);


module.exports = router;
const BaseRepo = require('../services/BaseRepository');
const { WeatherCategoriesModel } = require('../models');
const {validationResult} = require('express-validator');


module.exports.addWeatherCategories = async (req, res, next) => {

    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()});
    }

    const payload = req.body;

    try {
    const WeatherCategories = await BaseRepo.baseCreate(WeatherCategoriesModel, payload);
    if(!WeatherCategories){
        return res.status(400).json({error: 'Error creating weather category'});
    }
    res.status(201).json(WeatherCategories);
    } 
    catch (error) {
    console.error(error);
    return res.status(500).json({error: 'Internal server error'});
    }
}


module.exports.getWeatherCategories = async (req, res, next) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const params = {
      searchParams: {},
      limit: limit,
      offset: offset,
      page: page,
      order:[["id","DESC"]],
  }
  try {
    const WeatherCategories = await BaseRepo.baseList(WeatherCategoriesModel, params);
    if(!WeatherCategories){
        return res.status(400).json({error: 'Error fetching weather categories'});
    }
    res.status(201).json(WeatherCategories);
    } 
    catch (error) {
    console.error(error);
    return res.status(500).json({error: 'Internal server error'});
    }
}


module.exports.updateWeatherCategories = async (req, res, next) => {

    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()});
    }

    const payload = req.body;
    const id = req.params.id;

    try {
    const WeatherCategories = await BaseRepo.baseUpdate(WeatherCategoriesModel, {id}, payload);
    if(!WeatherCategories){
        return res.status(400).json({error: 'Error updating weather category'});
    }
    res.status(201).json({
        message: 'Weather category updated successfully',
        data: WeatherCategories
    });
    } 
    catch (error) {
    console.error(error);
    return res.status(500).json({error: 'Internal server error'});
    }
}


module.exports.deleteWeatherCategories = async (req, res, next) => {

    const id = req.params.id;

    try {
    const WeatherCategories = await BaseRepo.baseDelete(WeatherCategoriesModel, {id});
    if(!WeatherCategories){
        return res.status(400).json({error: 'Error deleting weather category'});
    }
    res.status(201).json({
        message: 'Weather category deleted successfully',
        data: WeatherCategories
    });
    } 
    catch (error) {
    console.error(error);
    return res.status(500).json({error: 'Internal server error'});
    }
}
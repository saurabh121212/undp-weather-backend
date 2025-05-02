const BaseRepo = require('../services/BaseRepository');
const { SeasonalForecastModel } = require('../models');
const {validationResult} = require('express-validator');


module.exports.add = async (req, res, next) => {

    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()});
    }

    const payload = req.body;

    try {
    const SeasonalForecast = await BaseRepo.baseCreate(SeasonalForecastModel, payload);
    if(!SeasonalForecast){
        return res.status(400).json({error: 'Error creating Seasonal Forecast'});
    }
    res.status(201).json(SeasonalForecast);
    } 
    catch (error) {
    console.error(error);
    return res.status(500).json({error: 'Internal server error'});
    }
}


module.exports.get = async (req, res, next) => {

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
    const SeasonalForecast = await BaseRepo.baseList(SeasonalForecastModel, params);
    if(!SeasonalForecast){
        return res.status(400).json({error: 'Error fetching Seasonal Forecast'});
    }
    res.status(201).json(SeasonalForecast);
    } 
    catch (error) {
    console.error(error);
    return res.status(500).json({error: 'Internal server error'});
    }
}


module.exports.update = async (req, res, next) => {

    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()});
    }

    const payload = req.body;
    const id = req.params.id;

    try {
    const SeasonalForecast = await BaseRepo.baseUpdate(SeasonalForecastModel, {id}, payload);
    if(!SeasonalForecast){
        return res.status(400).json({error: 'Error updating Seasonal Forecast'});
    }
    res.status(201).json({
        message: 'Seasonal Forecast updated successfully',
        data: SeasonalForecast
    });
    } 
    catch (error) {
    console.error(error);
    return res.status(500).json({error: 'Internal server error'});
    }
}


module.exports.delete = async (req, res, next) => {

    const id = req.params.id;

    try{
    const SeasonalForecast = await BaseRepo.baseDelete(SeasonalForecastModel, {id});
    if(!SeasonalForecast){
        return res.status(400).json({error: 'Error deleting Seasonal Forecast'});
    }
    res.status(201).json({
        message: 'Seasonal Forecast deleted successfully',
        data: SeasonalForecast
    });
    }
    catch(err){
        console.log(err);
        return res.status(400).json({error: 'Internal Server Error'});
    }
}
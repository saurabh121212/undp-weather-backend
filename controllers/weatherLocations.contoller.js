const BaseRepo = require('../services/BaseRepository');
const { WeatherLocationModel } = require('../models');
const {validationResult} = require('express-validator');


module.exports.addWeatherLocations = async (req, res, next) => {

    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()});
    }

    const payload = req.body;

    const WeatherLocations = await BaseRepo.baseCreate(WeatherLocationModel, payload);
    if(!WeatherLocations){
        return res.status(400).json({error: 'Error creating weather Locations'});
    }
    res.status(201).json(WeatherLocations);
}


module.exports.getWeatherLocations = async (req, res, next) => {

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
    const WeatherLocations = await BaseRepo.baseList(WeatherLocationModel, params);
    if(!WeatherLocations){
        return res.status(400).json({error: 'Error fetching weather Locations'});
    }
    res.status(201).json(WeatherLocations);
}


module.exports.updateWeatherLocations = async (req, res, next) => {

    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()});
    }

    const payload = req.body;
    const id = req.params.id;

    const WeatherLocations = await BaseRepo.baseUpdate(WeatherLocationModel, {id}, payload);
    if(!WeatherLocations){
        return res.status(400).json({error: 'Error updating weather Locations'});
    }
    res.status(201).json({
        message: 'Weather Locations updated successfully',
        data: WeatherLocations
    });
}


module.exports.deleteWeatherLocations = async (req, res, next) => {

    const id = req.params.id;

    const WeatherLocations = await BaseRepo.baseDelete(WeatherLocationModel, {id});
    if(!WeatherLocations){
        return res.status(400).json({error: 'Error deleting weather Locations'});
    }
    res.status(201).json({
        message: 'Weather Locations deleted successfully',
        data: WeatherLocations
    });
}
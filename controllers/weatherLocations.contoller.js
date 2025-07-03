const BaseRepo = require('../services/BaseRepository');
const { WeatherLocationModel } = require('../models');
const {validationResult} = require('express-validator');


module.exports.addWeatherLocations = async (req, res, next) => {

    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()});
    }

    const payload = req.body;

    const isNameExist = await WeatherLocationModel.findOne({ where: {name: payload.name } });
    if (isNameExist) {
        return res.status(400).json({ error: 'Weather Location name already exist' });
    }

    try {
    const WeatherLocations = await BaseRepo.baseCreate(WeatherLocationModel, payload);
    if(!WeatherLocations){
        return res.status(400).json({error: 'Error creating weather Locations'});
    }
    res.status(201).json(WeatherLocations);
    } 
    catch (error) {
    console.error(error);
    return res.status(500).json({error: 'Internal server error'});
    }
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
  
  try {
    const WeatherLocations = await BaseRepo.baseList(WeatherLocationModel, params);
    if(!WeatherLocations){
        return res.status(400).json({error: 'Error fetching weather Locations'});
    }
    res.status(201).json(WeatherLocations);
    } 
    catch (error) {
    console.error(error);
    return res.status(500).json({error: 'Internal server error'});
    }
}


module.exports.updateWeatherLocations = async (req, res, next) => {

    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()});
    }

    const payload = req.body;
    const id = req.params.id;

    const isNameExist = await WeatherLocationModel.findOne({ where: {name: payload.name } });
    if (isNameExist) {
        return res.status(400).json({ error: 'Weather Location name already exist' });
    }

    try {
    const WeatherLocations = await BaseRepo.baseUpdate(WeatherLocationModel, {id}, payload);
    if(!WeatherLocations){
        return res.status(400).json({error: 'Error updating weather Locations'});
    }
    res.status(201).json({
        message: 'Weather Locations updated successfully',
        data: WeatherLocations
    });
    } 
    catch (error) {
    console.error(error);
    return res.status(500).json({error: 'Internal server error'});
    }
}


module.exports.deleteWeatherLocations = async (req, res, next) => {

    const id = req.params.id;

    try {
    const WeatherLocations = await BaseRepo.baseDelete(WeatherLocationModel, {id});
    if(!WeatherLocations){
        return res.status(400).json({error: 'Error deleting weather Locations'});
    }
    res.status(201).json({
        message: 'Weather Locations deleted successfully',
        data: WeatherLocations
    });
    } 
    catch (error) {
    console.error(error);
    return res.status(500).json({error: 'Internal server error'});
    }
}
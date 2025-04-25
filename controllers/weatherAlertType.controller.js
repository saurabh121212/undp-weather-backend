const BaseRepo = require('../services/BaseRepository');
const { WeatherAlertTypeModel } = require('../models');
const {validationResult} = require('express-validator');


module.exports.addWeatherAlertType = async (req, res, next) => {

    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()});
    }

    const payload = req.body;

    const WeatherCategories = await BaseRepo.baseCreate(WeatherAlertTypeModel, payload);
    if(!WeatherCategories){
        return res.status(400).json({error: 'Error creating weather Alart Type'});
    }
    res.status(201).json(WeatherCategories);
}


module.exports.getWeatherAlertType = async (req, res, next) => {

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
    const WeatherAlartType = await BaseRepo.baseList(WeatherAlertTypeModel, params);
    if(!WeatherAlartType){
        return res.status(400).json({error: 'Error fetching weather Alart Type'});
    }
    res.status(201).json(WeatherAlartType);
}


module.exports.updateWeatherAlertType = async (req, res, next) => {

    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()});
    }

    const payload = req.body;
    const id = req.params.id;

    const WeatherAlartType = await BaseRepo.baseUpdate(WeatherAlertTypeModel, {id}, payload);
    if(!WeatherAlartType){
        return res.status(400).json({error: 'Error updating weather alart type'});
    }
    res.status(201).json({
        message: 'Weather alart type updated successfully',
        data: WeatherAlartType
    });
}


module.exports.deleteWeatherAlertType = async (req, res, next) => {

    const id = req.params.id;

    const WeatherAlartType = await BaseRepo.baseDelete(WeatherAlertTypeModel, {id});
    if(!WeatherAlartType){
        return res.status(400).json({error: 'Error deleting weather alart type'});
    }
    res.status(201).json({
        message: 'Weather alart type deleted successfully',
        data: WeatherAlartType
    });
}
const BaseRepo = require('../services/BaseRepository');
const { WeatherAlartsModel } = require('../models');
const {validationResult} = require('express-validator');


module.exports.add = async (req, res, next) => {

    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()});
    }

    const payload = req.body;

    const WeatherAlarts = await BaseRepo.baseCreate(WeatherAlartsModel, payload);
    if(!WeatherAlarts){
        return res.status(400).json({error: 'Error creating Weather Alarts'});
    }
    res.status(201).json(WeatherAlarts);
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
    const WeatherAlarts = await BaseRepo.baseList(WeatherAlartsModel, params);
    if(!WeatherAlarts){
        return res.status(400).json({error: 'Error fetching Weather Alarts'});
    }
    res.status(201).json(WeatherAlarts);
}


module.exports.update = async (req, res, next) => {

    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()});
    }

    const payload = req.body;
    const id = req.params.id;

    const WeatherAlarts = await BaseRepo.baseUpdate(WeatherAlartsModel, {id}, payload);
    if(!WeatherAlarts){
        return res.status(400).json({error: 'Error updating Weather Alarts'});
    }
    res.status(201).json({
        message: 'Risk and Weather Alarts updated successfully',
        data: WeatherAlarts
    });
}


module.exports.delete = async (req, res, next) => {

    const id = req.params.id;

    const WeatherAlarts = await BaseRepo.baseDelete(WeatherAlartsModel, {id});
    if(!WeatherAlarts){
        return res.status(400).json({error: 'Error deleting Weather Alarts'});
    }
    res.status(201).json({
        message: 'Weather Alarts deleted successfully',
        data: WeatherAlarts
    });
}
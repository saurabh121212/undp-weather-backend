const BaseRepo = require('../services/BaseRepository');
const { WeatherDataRequestModel } = require('../models');
const {validationResult} = require('express-validator');


module.exports.add = async (req, res, next) => {

    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()});
    }

    const payload = req.body;

    const WeatherDataRequest = await BaseRepo.baseCreate(WeatherDataRequestModel, payload);
    if(!WeatherDataRequest){
        return res.status(400).json({error: 'Error creating Weather Data Request'});
    }
    res.status(201).json(WeatherDataRequest);
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
    const WeatherDataRequest = await BaseRepo.baseList(WeatherDataRequestModel, params);
    if(!WeatherDataRequest){
        return res.status(400).json({error: 'Error fetching Weather Data Request'});
    }
    res.status(201).json(WeatherDataRequest);
}

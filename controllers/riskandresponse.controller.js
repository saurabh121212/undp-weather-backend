const BaseRepo = require('../services/BaseRepository');
const { RiskandResponseModel } = require('../models');
const {validationResult} = require('express-validator');


module.exports.add = async (req, res, next) => {

    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()});
    }

    const payload = req.body;

    const RiskandResponse = await BaseRepo.baseCreate(RiskandResponseModel, payload);
    if(!RiskandResponse){
        return res.status(400).json({error: 'Error creating Risk and Response Strategies'});
    }
    res.status(201).json(RiskandResponse);
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
    const RiskandResponse = await BaseRepo.baseList(RiskandResponseModel, params);
    if(!RiskandResponse){
        return res.status(400).json({error: 'Error fetching Risk and Response Strategies'});
    }
    res.status(201).json(RiskandResponse);
}


module.exports.update = async (req, res, next) => {

    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()});
    }

    const payload = req.body;
    const id = req.params.id;

    const RiskandResponse = await BaseRepo.baseUpdate(RiskandResponseModel, {id}, payload);
    if(!RiskandResponse){
        return res.status(400).json({error: 'Error updating Risk and Response Strategies'});
    }
    res.status(201).json({
        message: 'Risk and Response Strategies updated successfully',
        data: RiskandResponse
    });
}


module.exports.delete = async (req, res, next) => {

    const id = req.params.id;

    const RiskandResponse = await BaseRepo.baseDelete(RiskandResponseModel, {id});
    if(!RiskandResponse){
        return res.status(400).json({error: 'Error deleting Risk and Response Strategies'});
    }
    res.status(201).json({
        message: 'Risk and Response Strategies deleted successfully',
        data: RiskandResponse
    });
}
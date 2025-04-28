const BaseRepo = require('../services/BaseRepository');
const { ReportIncidentModel } = require('../models');
const {validationResult} = require('express-validator');


module.exports.add = async (req, res, next) => {

    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()});
    }

    const payload = req.body;

    const ReportIncident = await BaseRepo.baseCreate(ReportIncidentModel, payload);
    if(!ReportIncident){
        return res.status(400).json({error: 'Error creating Report Incident'});
    }
    res.status(201).json(ReportIncident);
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
    const ReportIncident = await BaseRepo.baseList(ReportIncidentModel, params);
    if(!ReportIncident){
        return res.status(400).json({error: 'Error fetching Report Incident'});
    }
    res.status(201).json(ReportIncident);
}

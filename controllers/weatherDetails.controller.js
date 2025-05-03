const BaseRepo = require('../services/BaseRepository');
const { WeatherDetailModel } = require('../models');
const { validationResult } = require('express-validator');


module.exports.add = async (req, res, next) => {

    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    const payload = req.body;

    console.log(payload);

    try {
        const WeatherDetails = await BaseRepo.baseBulkCreate(WeatherDetailModel, payload);
        if (!WeatherDetails) {
            return res.status(400).json({ error: 'Error creating Weather Details Request' });
        }
        res.status(201).json(WeatherDetails);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
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
        order: [["id", "DESC"]],
    }
    try {
        const WeatherDataRequest = await BaseRepo.baseList(WeatherDetailModel, params);
        if (!WeatherDataRequest) {
            return res.status(400).json({ error: 'Error fetching Weather Data Request' });
        }
        res.status(201).json(WeatherDataRequest);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

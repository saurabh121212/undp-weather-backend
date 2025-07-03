const BaseRepo = require('../services/BaseRepository');
const { WeatherDetailModel } = require('../models');
const { validationResult } = require('express-validator');
const e = require('express');


module.exports.add = async (req, res, next) => {

    const weatherData = req.body; // Expecting an array of objects
    try {
      for (const item of weatherData) {
        // Remove id if it's 0 or undefined (let DB auto-generate it)
        if (!item.id || item.id === 0) {
          const { id, ...newData } = item;
          await BaseRepo.baseCreate(WeatherDetailModel, newData)
        } else {
        //   const existing = await WeatherForecast.findByPk(item.id);
          const existing = await BaseRepo.baseFindById(WeatherDetailModel, item.id, 'id')
          if (existing) {
            // Update existing record
            // await WeatherForecast.update(item, {
            //   where: { id: item.id }
            // });
            const id = item.id;
            await BaseRepo.baseUpdate(WeatherDetailModel, {id}, item);
          } 
        //   else {
        //     // Create new record with given ID
        //     await WeatherForecast.create(item);
        //   }
        }
      }
      res.status(200).json({ message: "Weather data processed successfully." });
    } catch (error) {
      console.error("Error processing weather data:", error);
      res.status(500).json({ error: "Internal server error" });
    }



    // const error = validationResult(req);
    // if (!error.isEmpty()) {
    //     return res.status(400).json({ error: error.array() });
    // }

    // const payload = req.body;

    // console.log(payload);

    // try {
    //     const WeatherDetails = await BaseRepo.baseBulkCreate(WeatherDetailModel, payload);
    //     if (!WeatherDetails) {
    //         return res.status(400).json({ error: 'Error creating Weather Details Request' });
    //     }
    //     res.status(201).json(WeatherDetails);
    // }
    // catch (error) {
    //     console.error(error);
    //     return res.status(500).json({ error: 'Internal server error' });
    // }
}


module.exports.weatherUpdates = async (req, res, next) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const date = req.query.date || null;

    const params = {
        searchParams: {date},
        limit: limit,
        offset: offset,
        page: page,
        order: [["id", "DESC"]],
    }

    console.log(params);

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


module.exports.locationWeatherUpdates = async (req, res, next) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const date = req.query.date || null;
    const location_id = req.query.location_id || null;
    const params = {
        //searchParams: {date},
        where: {location_id: req.query.location_id,
        date: date},
        limit: limit,
        offset: offset,
        page: page,
        order: [["id", "DESC"]],
    }

    console.log(params);

    // Check if previous date data is available or not 

    try {
        const WeatherDataRequest = await BaseRepo.getWeatherDataFromDate(WeatherDetailModel,location_id, date);
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



module.exports.locationWeatherUpdatesV2 = async (req, res, next) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const date = req.query.date || null;
    const location_id = req.query.location_id || null;
    const params = {
        //searchParams: {date},
        where: {location_id: req.query.location_id,
        date: date},
        limit: limit,
        offset: offset,
        page: page,
        order: [["id", "DESC"]],
    }

    console.log(params);

    // Check if previous date data is available or not 

    try {
        const WeatherDataRequest = await BaseRepo.getWeatherDataFromDateV2(WeatherDetailModel,location_id, date);
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






module.exports.searchLocation = async (req, res, next) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const date = req.query.date || null;
    const location_name = req.query.location_name || null;

    const params = {
        searchParams: {date},
        limit: limit,
        offset: offset,
        page: page,
        order: [["id", "DESC"]],
    }

    console.log(location_name," ", date);

    try {
        const WeatherDataRequest = await BaseRepo.getSearchByLocation(WeatherDetailModel,location_name, date);
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



module.exports.allLocation = async (req, res, next) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const date = req.query.date || null;
    const location_name = req.query.location_name || null;

    const params = {
        searchParams: {date},
        limit: limit,
        offset: offset,
        page: page,
        order: [["id", "DESC"]],
    }
    console.log(location_name," ", date);
    try {
        const WeatherDataRequest = await BaseRepo.getallByLocation(WeatherDetailModel,location_name, date);
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
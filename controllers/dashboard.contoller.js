const BaseRepo = require('../services/BaseRepository');
const { UserModel, WeatherAlartsModel, ReportIncidentModel, FeedbackModel, WeatherDataRequestModel } = require('../models');
const { validationResult } = require('express-validator');

module.exports.getDashboardData = async (req, res, next) => {

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const params = {
    searchParams: {},
  }
  try {
    const totalRagisterUsers = await BaseRepo.baseCount(UserModel, { is_ragistered: 1 });
    const totalAlartsSend = await BaseRepo.baseCount(WeatherAlartsModel, {});
    const totalInsidentReport = await BaseRepo.baseCount(ReportIncidentModel, {});
    const totalFeedbackRecived = await BaseRepo.baseCount(FeedbackModel, {});

    console.log(totalRagisterUsers, totalAlartsSend, totalInsidentReport, totalFeedbackRecived);

    res.status(201).json({
      message: 'Dashboard data fetched successfully',
      data: {
        totalRagisterUsers,
        totalAlartsSend,
        totalInsidentReport,
        totalFeedbackRecived
      }
    });
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}



module.exports.getDashboardUsersData = async (req, res, next) => {

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const params = {
    searchParams: {},
  }
  try {
    const totalUsers = await BaseRepo.baseCount(UserModel, {});
    const totalRagisterUsers = await BaseRepo.baseCount(UserModel, { is_ragistered: 1 });
    const totalUnRagisterUsers = await BaseRepo.baseCount(UserModel, { is_ragistered: 0 });


    const UsersData = {
      "valuesToDisplay": [parseInt(totalUsers),
      parseInt(totalRagisterUsers), parseInt(totalUnRagisterUsers)],
      "categories": ['Total Users', 'Total Registered Users ', 'Total Unregistered Users']
    }

    res.status(201).json({
      message: 'Dashboard Users Data fetched successfully',
      data: UsersData
    });

  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}



module.exports.getDashboardAlartsData = async (req, res, next) => {

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  const year = req.params.year;

  const params = {
    searchParams: {},
  }
  try {
    const alarts = await BaseRepo.getDashboardAlarts(WeatherAlartsModel, year);

    res.status(201).json({
      message: 'Dashboard Alarts Data fetched successfully',
      data: alarts
    });

  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}



module.exports.getDashboardWeatherDataRequests = async (req, res, next) => {

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  const year = req.params.year;

  const params = {
    searchParams: {},
  }
  try {
    const alarts = await BaseRepo.getDashboardWeatherDataRequests(WeatherDataRequestModel, year);

    res.status(201).json({
      message: 'Dashboard Weather Data Requests fetched successfully',
      data: alarts
    });

  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}


module.exports.getDashboardIncidentsReportedData = async (req, res, next) => {

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  const year = req.params.year;

  const params = {
    searchParams: {},
  }
  try {
    const alarts = await BaseRepo.getDashboardWeatherDataRequests(ReportIncidentModel, year);

    res.status(201).json({
      message: 'Dashboard Incidents Reported fetched successfully',
      data: alarts
    });

  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}


module.exports.getDashboardAlartsTypeData = async (req, res, next) => {

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  const year = req.params.year;

  const params = {
    searchParams: {},
  }
  try {
    const alarts = await BaseRepo.getDashboardAlartsType(WeatherAlartsModel, year);

    res.status(201).json({
      message: 'Dashboard Alarts Type fetched successfully',
      data: alarts
    });

  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}



module.exports.getDashboardUsersRegionWiseData = async (req, res, next) => {

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  const year = req.params.year;

  const params = {
    searchParams: {},
  }
  try {
    const alarts = await BaseRepo.getDashboardUserRigionWise(UserModel, year);

    res.status(201).json({
      message: 'Dashboard User Data fetched successfully',
      data: alarts
    });

  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
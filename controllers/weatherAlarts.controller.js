const BaseRepo = require('../services/BaseRepository');
const { WeatherAlartsModel, UserModel, RiskandResponseModel } = require('../models');
const { validationResult } = require('express-validator');
const sendNotification = require('../firebase/sendNotification');
const admin = require('firebase-admin');



module.exports.add = async (req, res, next) => {

    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    const payload = req.body;
    try {
        const WeatherAlarts = await BaseRepo.baseCreate(WeatherAlartsModel, payload);
        if (!WeatherAlarts) {
            return res.status(400).json({ error: 'Error creating Weather Alarts' });
        }


        // Send notification to all users
        sendNotificationToAllUsers(payload.name, payload.short_description);
        res.status(201).json(WeatherAlarts);
    }
    catch (error) {
        console.log(error);
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
        const WeatherAlarts = await BaseRepo.baseList2(WeatherAlartsModel, params, RiskandResponseModel);
        if (!WeatherAlarts) {
            return res.status(400).json({ error: 'Error fetching Weather Alarts' });
        }



        res.status(201).json(WeatherAlarts);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports.getAlartsByDate = async (req, res, next) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const todayDate = req.params.todayDate;
    const todayTime = req.params.todayTime;

    console.log("Today Date:", todayDate);
    console.log("Today Time:", todayTime);

    const params = {
        searchParams: {},
        limit: limit,
        offset: offset,
        page: page,
        order: [["id", "DESC"]],
    }

    try {
        const WeatherAlarts = await BaseRepo.getAlartsByDate(WeatherAlartsModel,todayDate,RiskandResponseModel,todayTime);
        if (!WeatherAlarts) {
            return res.status(400).json({ error: 'Error fetching Weather Alarts' });
        }
        res.status(201).json(WeatherAlarts);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}




module.exports.update = async (req, res, next) => {

    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    const payload = req.body;
    const id = req.params.id;

    try {
        const WeatherAlarts = await BaseRepo.baseUpdate(WeatherAlartsModel, { id }, payload);
        if (!WeatherAlarts) {
            return res.status(400).json({ error: 'Error updating Weather Alarts' });
        }

        // Send notification to all users
        sendNotificationToAllUsers(payload.name, payload.short_description);

        res.status(201).json({
            message: 'And Weather Alarts updated successfully',
            data: WeatherAlarts
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports.delete = async (req, res, next) => {

    const id = req.params.id;

    try {
        const WeatherAlarts = await BaseRepo.baseDelete(WeatherAlartsModel, { id });
        if (!WeatherAlarts) {
            return res.status(400).json({ error: 'Error deleting Weather Alarts' });
        }
        res.status(201).json({
            message: 'Weather Alarts deleted successfully',
            data: WeatherAlarts
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}




// This is used to send the notification

// Split an array into chunks
function chunkArray(array, size) {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

async function sendNotificationToAllUsers(name, description) {
  try {
    const users = await BaseRepo.findToken_User(UserModel);
    const allTokens = users.map(user => user.divice_token).filter(Boolean);

    console.info(`📦 Found ${allTokens.length} valid FCM tokens`);

    const tokenChunks = chunkArray(allTokens, 500); // Firebase limit

    for (let i = 0; i < tokenChunks.length; i++) {
      const tokens = tokenChunks[i];
      const message = {
        notification: {
          title: name,
          body: description,
        },
        tokens,
      };

      try {
        console.info(`🚀 Sending batch ${i + 1}/${tokenChunks.length}`);
        await sendNotification(message);
      } catch (batchError) {
        console.error(`❌ Error in batch ${i + 1}:`, batchError.message);
      }
    }

    console.info('✅ All notifications sent');
  } catch (err) {
    console.error('❌ Failed to send notifications:', err.message);
  }
}

// firebase.js
const admin = require('firebase-admin');
const serviceAccount = require('../met-weather-application-firebase-adminsdk-fbsvc-b3508cb2b0.json');


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;

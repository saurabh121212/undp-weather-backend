// firebase.js
const admin = require('firebase-admin');
const serviceAccount = require('../met-weather-application-firebase-adminsdk-fbsvc-e23b2bb4ed.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;

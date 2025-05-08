// sendNotification.js
const admin = require('./firebase'); // Import the initialized Firebase admin instance

async function sendNotification(fcmToken, title, body) {
  const message = {
    token: fcmToken,
    notification: {
      title: title,
      body: body,
    },
  };

  try {
    const response = await admin.messaging().send(message);
    console.log('Notification sent successfully:', response);
  } catch (error) {
    console.error('Error sending notification:', error);
  }
}

module.exports = sendNotification;

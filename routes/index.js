var express = require('express');
var router = express.Router();
const admin = require('../Model/firebaseAdmin');
const registrationToken = 'csozmAlBStmp-kEJLGjxfP:APA91bF-BsvcCasfYpascDIJRmvRYwAdnQWrwPn3nKFsk5Nhvk5v1YH9Ei-ibFW6DeVNSUN-b3BjvbjIGi-rbljXpTc5usWT3qi8KLX4YZoPb6lh41CqMoBznTNeFJkLhby4V37hRrck'; 

router.post('/send', function(req, res, next) {
  const message = {
    notification: {
      title: 'Disparo rapido',
      body: 'Disparo rapido',
    },
    token: registrationToken,
  };

  admin.messaging().send(message)
  .then((response) => {
    console.log('Successfully sent message:', response);
  })
  .catch((error) => {
    console.log('Error sending message:', error);
  });
});


router.get('/', function(req, res, next) {
  admin.auth().listUsers(1)
  .then((listUsersResult) => {
    console.log('Successfully fetched user data:', listUsersResult.users);
  })
  .catch((error) => {
    console.log('Error fetching user data:', error);
  });
});


module.exports = router;


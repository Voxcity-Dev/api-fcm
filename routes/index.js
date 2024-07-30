var express = require('express');
var router = express.Router();
const admin = require('../Model/firebaseAdmin');
const registrationToken = 'csozmAlBStmp-kEJLGjxfP:APA91bF-BsvcCasfYpascDIJRmvRYwAdnQWrwPn3nKFsk5Nhvk5v1YH9Ei-ibFW6DeVNSUN-b3BjvbjIGi-rbljXpTc5usWT3qi8KLX4YZoPb6lh41CqMoBznTNeFJkLhby4V37hRrck'; 

router.post('/send', function(req, res, next) {
  // const message = {
  //   notification: {
  //     title: 'Disparo rapido',
  //     body: 'Disparo rapido',
  //   },
  //   data: {
  //     customDataKey: 've se funfa',
  //   },
  //   token: registrationToken,
  // };

  const message = {
    data: {
      title: req.body.title || 'Disparo rapido2',
      body: req.body.body || 'Disparo rapido',
    },
    android: {
      collapse_key: 'tipo_de_mensagem',
      priority: 'high',
      ttl: 3600 * 1000, // Tempo de vida em milissegundos
      notification: {
        title: 'Título Android',
        body: 'Corpo Android',
        icon: 'ic_notification',
        color: '#f45342',
        sound: 'default',
        tag: 'alerta',
        click_action: 'OPEN_ACTIVITY_1',
        body_loc_key: 'BODY',
        body_loc_args: ['args'],
        title_loc_key: 'TITLE',
        title_loc_args: ['args']
      }
    },
    apns: {
      payload: {
        aps: {
          alert: {
            title:  'Título padrão',
            body: 'Corpo padrão'
          },
          badge: 1,
          sound: 'default'
        }
      },
      headers: {
        'apns-priority': '10' // Defina a prioridade da notificação para iOS
      }
    },
    webpush: {
      headers: {
        Urgency: 'high'
      },
      notification: {
        title: req.body.title || 'Título padrão',
        body: req.body.body || 'Corpo padrão',
        icon: req.body.icon || 'URL do ícone',
        click_action: req.body.clickAction || 'URL ao clicar na notificação'
      }
    },
    token: registrationToken
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


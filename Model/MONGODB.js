///-----------------------------------------*ORDEM DO PROVIDER*-----------------------------------
//CONNECTION < INDEX < ADMIN
///INDEX SEMPRE IRÁ ESTENDER DO ÚLTIMO REPOSITÓRIO 
const db = require('./MONGO/admin');
module.exports = new db;

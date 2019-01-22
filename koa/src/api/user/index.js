const Router = require('koa-router');
const user = new Router();
const userCtrl = require('./user.controller');

user.get('/signup', userCtrl.signUp);
/* auth.post('/login/local', authCtrl.localLogin);
auth.get('/exists/:key(email|username)/:value', authCtrl.exists);
auth.post('/logout', authCtrl.logout);
auth.get('/check', authCtrl.check); */

module.exports = user;

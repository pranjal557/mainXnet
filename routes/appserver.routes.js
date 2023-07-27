const Router = require('express');

const login = require('./login.routes');

const routes = Router();

routes.use('/login', login);

module.exports = routes;

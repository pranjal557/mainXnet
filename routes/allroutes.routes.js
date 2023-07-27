const Router = require('express');

const appRoutes = require('./appserver.routes');

const routes = Router();

// add the appRoutes in routes
routes.use('/', appRoutes);

module.exports = routes;

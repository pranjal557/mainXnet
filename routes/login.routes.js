const routes = require('express').Router();

const loginController = require('../controllers/login.controllers');

routes.get('/getAllLoginUser', loginController.getAllUsersLogin);

routes.post('/postAllLoginUser', loginController.postuserlogin);

// Here, You can define all of your api-endpoints

module.exports = routes;

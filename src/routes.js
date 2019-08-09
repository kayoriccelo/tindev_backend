const express = require('express');
const DevController = require('./controllers/Dev');
const LikeController = require('./controllers/Like');
const routes = express.Router();

routes.post('/devs', DevController.store);
routes.post('/devs/:id/likes', LikeController.store);

module.exports = routes;

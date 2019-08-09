const express = require('express');
const DevController = require('./controllers/Dev');
const LikeController = require('./controllers/Like');
const DislikeController = require('./controllers/Dislike');
const routes = express.Router();

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.post('/devs/:id/likes', LikeController.store);
routes.post('/devs/:id/dislikes', DislikeController.store);

module.exports = routes;

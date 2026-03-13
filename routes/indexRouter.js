const { Router } = require('express');
const indexRouter = Router();
const { showMessage, newMessage, postMessage, openMessage } = require('../controllers/indexController');

indexRouter.get('/', showMessage);
indexRouter.get('/new', newMessage);
indexRouter.post('/new', postMessage);
indexRouter.get('/messages/:id', openMessage);

module.exports = indexRouter;
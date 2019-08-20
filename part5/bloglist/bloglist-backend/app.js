const config = require('./utils/config');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const blogRouter = require('./controllers/blog');
const userRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const mongoose = require('mongoose');
const logger = require('./utils/logger')
const middleware = require('./utils/middleware');

logger.info('connecting: ', config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true }).then(() => {
    logger.info('connected.');
}).catch(err => {
    logger.error('error: ',err.message);
});

app.use(cors());
//app.use(express.static('build'));
app.use(bodyParser.json());

app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
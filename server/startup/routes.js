const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authentication = require('../middlewares/authentication');
const error = require('../middlewares/error');
const helmet = require('helmet');
const compression = require('compression');

module.exports = function (app) {
  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());
  app.use(helmet());
  app.use(compression());

  app.use('/api/v1/users', require('../routes/users'));
  app.use('/api/v1/auth', require('../routes/auth'));
  app.use('/api/v1/items', authentication, require('../routes/items'));
  app.use('/api/v1/lists', authentication, require('../routes/lists'));
  app.use('/api/v1/statistics', authentication, require('../routes/statistics'));

  app.use('/uploads', express.static('uploads'));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (request, response) => {
      response.sendFile(
        path.resolve(__dirname, '../client', 'build', 'index.html')
      );
    });
  }

  app.use(error);
};

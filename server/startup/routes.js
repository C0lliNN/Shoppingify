const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const auth = require('../middlewares/auth');
const fileUpload = require('express-fileupload');
const error = require('../middlewares/error');

module.exports = function (app) {
  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());
  app.use(fileUpload());

  app.use('/api/v1/users', require('../routes/users'));
  app.use('/api/v1/auth', require('../routes/auth'));
  app.use('/api/v1/itens', auth, require('../routes/itens'));

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

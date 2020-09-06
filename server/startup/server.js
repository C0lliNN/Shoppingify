require('dotenv').config({ debug: process.env.DEBUG });
if (process.env.NODE_ENV === 'test') {
  process.env.DEBUG = false;
}
require('./logger');
const debug = require('debug')('shoppingify:server');
require('express-async-errors');
const express = require('express');
const app = express();
const { initDatabase } = require('./database');
const initRoutes = require('./routes');

let server = null;

async function start() {
  const port = process.env.PORT || 5000;

  initRoutes(app);
  await initDatabase();

  server = app.listen(port, () => {
    debug(`Server Listening on ${port}`);
  });

  return app;
}

async function stop() {
  debug('Stopping');
  if (server) {
    server.close();
  }
}

exports.start = start;
exports.stop = stop;

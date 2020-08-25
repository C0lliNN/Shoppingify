require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { initDatabase } = require('./database');
const debug = require('debug')('server');

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/users', require('../routes/users'));

app.use('/uploads', express.static('uploads'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (request, response) => {
    response.sendFile(
      path.resolve(__dirname, '../client', 'build', 'index.html')
    );
  });
}

let server = null;

async function start() {
  const port = process.env.PORT || 5000;

  await initDatabase();

  server = app.listen(port, () => {
    debug(`Server Listening on ${port}`);
  });

  return app;
}

function stop() {
  debug('Stopping...');
  server.close();
}

exports.start = start;
exports.stop = stop;

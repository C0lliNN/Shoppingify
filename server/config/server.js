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

app.use('/api/v1/todos', require('../routes/todos'));

//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use('/uploads', express.static('uploads'));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  // All the javascript and css files will be read and served from this folder
  app.use(express.static('client/build'));

  // index.html for all page routes    html or routing and navigation
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
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

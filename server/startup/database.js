const debug = require('debug')('shoppingify:database');
const mongoose = require('mongoose');

async function initDatabase() {
  try {
    const DB_URI =
      process.env.NODE_ENV === 'test'
        ? 'mongodb://localhost/test'
        : process.env.MONGO_URI;
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    debug('MongoDB Connected...');
  } catch (error) {
    debug(error.message);
  }
}

function dropDatabase() {
  return mongoose.connection.dropDatabase();
}

module.exports.initDatabase = initDatabase;
module.exports.dropDatabase = dropDatabase;

const mongoose = require('mongoose');
const logger = require('./log');
const config = require('./config');

console.log('*** MGS', config.get('mongoose:uri'));

mongoose.connect(config.get('mongoose:uri'));
const db = mongoose.connection;

db.on('error', (err) => logger.log({
  level: 'error',
  message: `DB connection error: ${err.message}.`,
  additional: 'properties',
}));

db.once('open', function callback() {
  logger.log({
    level: 'info',
    message: 'Connected to DB!',
    additional: 'properties',
  });
});

let Schema = mongoose.Schema;

let irregularVerbs = new Schema({
  infinitive: {
    type: String,
    required: true,
  },
  past: {
    type: String,
    required: true,
  },
  past2: {
    type: String,
    required: false,
  },
  participle: {
    type: String,
    required: true,
  },
});

const irregularVerbsModel = mongoose.model('irregularVerbs', irregularVerbs);

module.exports.irregularVerbsModel = irregularVerbsModel;

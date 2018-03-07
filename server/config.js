'use strict';

require('dotenv').config();

module.exports.DATABASE_URL = process.env.DATABASE_URL ||
                      global.DATABASE_URL ||
                      'mongodb://localhost/piedmontParkTour';
module.exports.PORT = process.env.PORT || 3001
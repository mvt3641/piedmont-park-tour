'use strict';

require('dotenv').config();

exports.DATABASE_URL = process.env.DATABASE_URL ||
                      global.DATABASE_URL ||
                      'mongodb://localhost/piedmontParkTour';

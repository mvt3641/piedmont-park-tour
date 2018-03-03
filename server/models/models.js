var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const mapItemSchema = new mongoose.Schema({
   name: String,
   lon: Number,
   lat: Number,
   copy: String
});
module.exports = mongoose.model('MapItem', mapItemSchema);`

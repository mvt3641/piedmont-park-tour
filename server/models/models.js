const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mapItemSchema = new mongoose.Schema({
   name: [String],
   lon: Number,
   lat: Number,
   info: String
});

const MapItem =  mongoose.model('MapItem', mapItemSchema, mapItems);
module.exports = {MapItem}

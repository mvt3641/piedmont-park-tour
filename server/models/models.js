var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const mapItemSchema = new mongoose.Schema({
   name: {
       type:String,
       required: true
   },

   lon: {
       type:Number,
       required:true
   },
   lat: {
    type:Number,
    required:true
},
   copy: String,

   pics:{
       type:[String],
       required:true
   }
});
module.exports = mongoose.model('MapItem', mapItemSchema);

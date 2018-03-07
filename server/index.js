const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const {DATABASE_URL, PORT} = require('./config')
const Schema = mongoose.Schema;
const mapItemSchema = new mongoose.Schema({
    link: [String],
    lon: {type:Number, required:true},
    lat: {type:Number, required:true},
    info: String,
    name:String
 });


 const MapItem =  mongoose.model('MapItem', mapItemSchema, 'mapItems');

app.use(express.static(path.join(__dirname, '../client/public')));

app.get('/api/location', (req,res) => {
    console.log(typeof req.params.lat)
    let currLat = parseFloat(req.params.lat)
    let currLon = parseFloat(req.params.lon)
    console.log( currLat, currLon);
    MapItem
        .find({})
        .then(dbMapItem=> {
            console.log(dbMapItem);
            console.log("sending document back");
            res.json(dbMapItem);
        })
        .catch(function(err) {
            console.log('bing')
            res.json(err);
        });
});

app.get('/food', (req,res) => {
    const food = path.resolve(__dirname, '../client/public', 'food/food.html');
    res.sendFile(food)
})

app.get('/events', (req,res) => {
    const events = path.resolve(__dirname, '../client/public', 'events/events.html');
    res.sendFile(events)
})
 
app.get('/activities', (req,res)=>{
    const activities = path.resolve(__dirname, '../client/public', 'activities/activities.html');
    res.sendFile(activities)
});

app.get(/^(?!\/api(\/|$))/, (req, res) => {
    const index = path.resolve(__dirname, '../client/public', 'index.html');
    res.sendFile(index);
});

let server;
function runServer(port = PORT) {
  mongoose.connect(DATABASE_URL);
    return new Promise((resolve, reject) => {
        server = app.listen(port, () => {
            resolve();
        }).on('error', reject);
    });
}

function closeServer() {
    return new Promise((resolve, reject) => {
        server.close(err => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
}

if (require.main === module) {
    runServer();
}

module.exports = {
    app, runServer, closeServer
};

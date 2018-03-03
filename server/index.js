const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const {DATABASE_URL} = require('./config')

const Schema = mongoose.Schema;
const mapItemSchema = new mongoose.Schema({
<<<<<<< HEAD
    link: [String],
    lon: {type:Number, required:true},
    lat: {type:Number, required:true},
    info: String,
    name:String
 });
 const MapItem =  mongoose.model('MapItem', mapItemSchema, mapItems);
=======
   link: [String],
   lon: {type:Number, required:true},
   lat: {type:Number, required:true},
   info: String,
   name:String
});

const MapItem =  mongoose.model('MapItem', mapItemSchema, 'mapItems');
>>>>>>> a129af9a33db0b191d411afefd9c38968a1fd5fd

app.use(express.static(path.resolve(__dirname, '../client/public')));

app.get('/api/working', (req,res) => {
    res.send('I work')
});

app.push('/api/location', (req,res) => {
    const success = position=>{
        const currLat = position.coords.latitude;
        const currLong = position.coords.longitude;
        //use coords to query database
        db.MapItem.find({})
            .where({ //query using range
                        lat: {
                            $gte: currLat + 0.01,
                            $lte: currLat - 0.01
                        }
                    } &&
                    {
                        long: {
                            $gte: currLong + 0.01,
                            $lte: currLong - 0.01
                        }
          })
                .then(dbMapItem=> {
                    console.log(dbMapItem);
                    console.log("sending document back");
                    res.json(dbMapItem);
                })
                .catch(function(err) {
                    res.json(err);
                });
    };
    
    const error = err=>{
        alert("Failed to get your position because "+err)
    };
    
    const options = {
        enableHighAccuracy: true, 
        maximumAge        : 30000, 
        timeout           : 27000
      };
    
    const watchLoc = navigator.geolocation.watchPosition(success,error,options);
});

app.get(/^(?!\/api(\/|$))/, (req, res) => {
    const index = path.resolve(__dirname, '../client/public', 'index.html');
    res.sendFile(index);
});

let server;
function runServer(port=3001) {
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

const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const {DATABASE_URL} = require('./config')

const Schema = mongoose.Schema;

const mapItemSchema = new mongoose.Schema({
   link: [String],
   lon: {type:Number, required:true},
   lat: {type:Number, required:true},
   info: String,
   name:String
});

const MapItem =  mongoose.model('MapItem', mapItemSchema, 'mapItems');

app.use(express.static(path.resolve(__dirname, '../client/public')));

app.get('/api/working', (req,res) => {
    res.send('I work')
})



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

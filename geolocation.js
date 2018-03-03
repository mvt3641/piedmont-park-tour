//import db,etc
const MapItem - require();
const success = position=>{
    const currLat = position.coords.latitude;
    const currLong = position.coords.longitude;
    //use coords to query database
    db.MapItem.find({})
        .where({ //query using range
                    lat: {
                        $gte: currLat + 0.00001,
                        $lte: currLat - 0.00001
                    }
                } &&
                {
                    long: {
                        $gte: currLong + 0.00001,
                        $lte: currLong - 0.00001
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
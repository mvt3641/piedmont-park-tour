console.log($)

const state = {
    arr:[]
}

console.log(navigator);



$(function(){
    $.get('/api/location')
        .then(res => {
            state.arr = [...state.arr,...res]
            return state
        })

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(showPosition);
            navigator.geolocation.getCurrentPosition(initMap);
        } else { 
            alert("Geolocation is not supported by this browser. Unfortunately, you will not"+
            " be able to use this feature.")
        }
        
    function showPosition(position) {
        console.log(position);
        // let currLon = 
        let maxLat = position.coords.latitude + 0.00025;
        let minLat = position.coords.latitude - 0.00025;
        let maxLon = position.coords.longitude + 0.00025;
        let minLon = position.coords.longitude - 0.00025;

        state.arr.find(obj => {
            if ((obj.lat < maxLat && obj.lat > minLat)
        && (obj.lon < maxLon && obj.lon > minLon)) {
            console.log(obj);
        }
        })

    }

    
function initMap(position) {
    console.log(position);
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    console.log(latitude);
    console.log(longitude); 

    var uluru = {lat: latitude, lng: longitude};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 16,
      center: uluru
    });
    var marker = new google.maps.Marker({
      position: uluru,
      map: map
    });
  }


    }
    getLocation();
})
  


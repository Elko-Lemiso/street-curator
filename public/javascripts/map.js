window.onload = () => {
    const theLocation = {
      lat: 51.9294641, 
      lng: 4.4718353
    };

    let center = {
        lat: undefined,
        lng: undefined
      }; 
    
    const markers = []
    
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: theLocation
    });
   

    function getArtworks() {
        axios.get("/map/api")
            .then( response => {
                placeArtworks(response.data.artworks);
            })
            .catch(error => {
                console.log(error);
            })
    }
    
    function placeArtworks(artworks){
        artworks.forEach(function(artwork){

            var contentString = 
                `<div id="content">`+
                    `<div class="image-div-detail">`+
                        `<img class="more-info-img" src='${artwork.picture.path}' alt="${artwork.artist}">`+
                    `</div>`+
                    `<div id="bodyContent">`+
                        `<h2 class="more-info-header" class="firstHeading">${artwork.artist}</h2>`+
                        `<p>${artwork.city}</p>`+
                        `<button class="more-info-btn"><a href="/artwork/details/${artwork._id}">Details</a></button>`+
                    `</div>`+
                `</div>`;

            const center = {
                lat: artwork.location.coordinates[1],
                lng: artwork.location.coordinates[0]
            };
            const pin = new google.maps.Marker({
                position: center,
                map: map,
                title: artwork.artist,
                // label: artwork.artist,
                icon: `https://res.cloudinary.com/dconurgxl/image/upload/v1592162823/street-curator-profile-picture/artwork-locations_dijfcp.png`
            });

            markers.push(pin);

            var infowindow = new google.maps.InfoWindow({
                content: contentString
              });

            pin.addListener('click', function() {
                infowindow.open(map, pin);
              });
        });
    }

    getArtworks();

    var geocoder = new google.maps.Geocoder();

    // Try to get a geolocation object from the web browser
    if (navigator.geolocation) {
     
        // Get current position, the permissions dialog will pop up
        navigator.geolocation.getCurrentPosition(function (position) {
            // Create an object to match Google's Lat-Lng object format
            const center = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            const pin = new google.maps.Marker({
                position: center,
                map: map,
                title: `This is you!`,
                icon: `https://res.cloudinary.com/dconurgxl/image/upload/v1592162823/street-curator-profile-picture/your-location_ywxak5.png`
            });
            markers.push(pin);

            // User granted permission, center the map in the position we got
        }, function () {
            console.log('Error in the geolocation service.');
        });
    } else {
      console.log('Browser does not support geolocation.');
    }


    const $selectedLocation = document.getElementById('cityName').innerHTML;
    
    if ($selectedLocation !== ""){
        geocodeAddress(geocoder, map)
    }

    function geocodeAddress(geocoder, resultsMap) {

        var address = $selectedLocation;
        
        geocoder.geocode({'address': address}, function(results, status) {
            if (status === 'OK') {
                resultsMap.setCenter(results[0].geometry.location);
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    }

};


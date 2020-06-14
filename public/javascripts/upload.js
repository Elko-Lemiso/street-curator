window.onload = () => {

    const rotterdam = {
      lat: 51.9294641, 
      lng: 4.4718353
    };
    
    const markers = []
    
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: rotterdam
    });
   
    let center = {
      lat: undefined,   
      lng: undefined
    }; 

    var geocoder = new google.maps.Geocoder();

    document.getElementById('submitAddress').addEventListener('click', function() {
        geocodeAddress(geocoder, map);
    });

    function geocodeAddress(geocoder, resultsMap) {

        var address = document.getElementById('address').value;
        
        geocoder.geocode({'address': address}, function(results, status) {
            if (status === 'OK') {
                resultsMap.setCenter(results[0].geometry.location);

                document.getElementById('latitude').value = results[0].geometry.location.lat();
                document.getElementById('longitude').value = results[0].geometry.location.lng();

                var marker = new google.maps.Marker({
                    map: resultsMap,
                    position: results[0].geometry.location
                });
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    }
}

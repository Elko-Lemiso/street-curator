window.onload = () => {
    const rotterdam = {
      lat: 51.927903, 
      lng: 4.350744
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
  };

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
        const center = {
            lat: artwork.location.coordinates[1],
            lng: artwork.location.coordinates[0]
        };
        const pin = new google.maps.Marker({
            position: center,
            map: map,
            title: artwork.name
        });
        markers.push(pin);
    });
}
 
getArtworks();
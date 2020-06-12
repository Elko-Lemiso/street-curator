function locate() {
    var location = document.getElementById("location"); 
    navigator.geolocation.getCurrentPosition(success, error);
    function success(position) {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
    }
    function error() {
      location.innerHTML = "Unable to retrieve your location";
    }
  }

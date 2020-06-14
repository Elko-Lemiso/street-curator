let elm = document.querySelector("#location")
elm.onChange
elm.addEventListener("change", function() {
    window.location = elm.value
})
//redirects the page to the value of the selected option
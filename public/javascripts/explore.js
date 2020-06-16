window.onload = () => {

    let element = document.querySelector("#location")
    element.onChange
    element.addEventListener("change", function() {
        window.location = element.value
    })
    //redirects the page to the value of the selected option
}


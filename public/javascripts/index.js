document.querySelectorAll('.left-box').forEach(item => {
    const touristText = `Be your own tour guide! Navigate easily to the most recent street arts and get access to from incognito artists!`;

    item.addEventListener("click", (event) => {
        item.classList.toggle("flip-vertical-left");
        setTimeout(() => {
            document.querySelector('.tourist-title').classList.toggle("hide");
            document.querySelector('.tourist-here').classList.toggle("hide")
            document.querySelector('.tourist-text').classList.toggle("hide");  
        }, 500);
    })
})

document.querySelectorAll('.right-box').forEach(item => {
    const artistText = 
    `Post your latest yet unknown works get more exposure and enrich the city culture!`;

    item.addEventListener("click", (event) => {
        item.classList.toggle("flip-vertical-left");
        setTimeout(() => {
            document.querySelector('.artist-title').classList.toggle("hide");
            document.querySelector('.artist-here').classList.toggle("hide");
            document.querySelector('.artist-text').classList.toggle("hide");
        }, 500);
    
    })
})
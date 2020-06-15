document.querySelectorAll('.left-box').forEach(item => {
    const touristText = `Be your own tour guide! Navigate easily to the most recent street arts and get access to from incognito artists!`;

    item.addEventListener("click", (event) => {
        item.classList.toggle("flip-vertical-left");
        document.querySelector('.tourist-title').classList.toggle("hide");
        // document.querySelector('.tourist-signup').classList.toggle("hide");
        document.querySelector('.tourist-here').classList.toggle("hide")
        document.querySelector('.tourist-text').classList.toggle("hide")
        document.querySelector('.tourist-button').classList.toggle("hide");
    })
})

document.querySelectorAll('.right-box').forEach(item => {
    const artistText = 
    `Post your latest yet unknown works get more exposure and enrich the city culture!`;

    item.addEventListener("click", (event) => {
        item.classList.toggle("flip-vertical-left");
        document.querySelector('.artist-title').classList.toggle("hide");
        // document.querySelector('.artist-signup').classList.toggle("hide");
        document.querySelector('.artist-here').classList.toggle("hide")
        document.querySelector('.artist-text').classList.toggle("hide")
        document.querySelector('.artist-button').classList.toggle("hide");
    })
})



// .forEeach((item) =>{
//     item.addEventListener('mouseover', ()=>{
        
//     });
// })

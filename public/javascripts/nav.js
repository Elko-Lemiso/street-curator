window.addEventListener("load", addActive());
const navigationOptions = [
  {
    name: 'explore',
    color: '#dcd2e6'
  },
  {
    name: 'map',
    color: '#DA959E'
  },
  {
    name: 'list',
    color: '#dcd2e6'
  },
  {
    name: 'profile',
    color: '#DA959E'
  }
];


const links = document.querySelectorAll('nav a');


function handleClick(e) {
  links.forEach(link => {
    if (link.classList.contains('active')) {
      link.classList.remove('active');
    }
  });
  const name = this.textContent.trim().toLowerCase();
  const { color } = navigationOptions.find(item => item.name === name);
  const style = window.getComputedStyle(this);
  const hoverColor = style.getPropertyValue('--hover-c');
  if (color !== hoverColor) {
    this.style.setProperty('--hover-bg', `${color}20`);
    this.style.setProperty('--hover-c', color);
  }
  this.classList.add('active');
  document.querySelector('body').style.background = color;
}
 
function addActive() {
  var url = document.URL.split("/"); //replace string with location.href
  var i=0;
  const links = document.querySelectorAll('nav a span');
  const anchors = document.querySelectorAll('nav a');
  var currentPage = url[url.length - 1];
  for(i;i<links.length;i++){
    if(links[i].innerHTML.toLowerCase() === currentPage) {
    anchors[i].setAttribute("class" , "active");
    }
    }
}

links.forEach(link => link.addEventListener('click', handleClick));


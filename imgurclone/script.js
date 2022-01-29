const base_url = `https://api.unsplash.com/photos/?client_id=Gg5aZJemBZOFQLEVe7eb2fXxRIROz6IXxcdmd5ffy-Y&page=1&per_page=40`
const getImages = async ()=>{
    await fetch(base_url)
    .then(response => response.json())
    .then(result => showImages(result))
    .catch(error => console.log('error', error));
}
const container = document.getElementById("container")
const showImages =  (data)=>{
    let counter = 0;
   data.forEach(el =>{
    counter++;
    let div = document.createElement("div")
    div.id="imageDiv"
      let img = document.createElement("img")
      if(counter>6){
        img.className="lazy";
        img.setAttribute('data-src', el.links.download);
      }
    else{
        img.src= el.links.download;
    }
      div.append(img)
      container.appendChild(div)
   }) 
   lazyload()
}

getImages()



function lazyload() {
    var lazyloadImages = document.querySelectorAll(".lazy");    
    var lazyloadThrottleTimeout; 
    function lazyload () {
      if(lazyloadThrottleTimeout) {
        clearTimeout(lazyloadThrottleTimeout);
      }     
      lazyloadThrottleTimeout = setTimeout(function() {
          var scrollTop = window.pageYOffset;
          lazyloadImages.forEach(function(img) {
              if(img.offsetTop < (window.innerHeight + scrollTop)) {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
              }
          });
          if(lazyloadImages.length == 0) { 
            document.removeEventListener("scroll", lazyload);
            window.removeEventListener("resize", lazyload);
            window.removeEventListener("orientationChange", lazyload);
          }
      }, 20);
    }
    
    document.addEventListener("scroll", lazyload);
    window.addEventListener("resize", lazyload);
    window.addEventListener("orientationChange", lazyload);
  };

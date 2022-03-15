var mykey = "13c272ba573a4acfbb0f6e5611a3caf4";
var base_url = "http://newsapi.org/v2/top-headlines";
const main = document.getElementById("main");




if (localStorage.getItem("mynews")) {
    if (localStorage.getItem("mynews").length !== 0) {
        var mysearch = JSON.parse(localStorage.getItem("mynews"));
        var search_item = mysearch[mysearch.length - 1];
    }
}

function getnews() {

    fetch(`http://newsapi.org/v2/everything?q=${search_item}&from=2021-10-18&sortBy=popularity&apiKey=13c272ba573a4acfbb0f6e5611a3caf4`)
        .then(res => res.json())
        .then(resp => {
            console.log(resp);
            if(resp.totalResults==0 || resp.articles.length==0 ){
                   let x= document.getElementById("noresult");
                   x.textContent="No results found"
            }
            else{
                shownews(resp.articles)
            }
          
           
            var name = document.getElementById("same");
            name.textContent = "Searched keyword: "+ search_item;
            name.style.color="white";
            name.style.fontSize="30px";

        })
}

getnews()


function shownews(data) {
    main.innerHTML = "";
    data.forEach((news) => {
        const {
            title,
            urlToImage,
            url,
            description
        } = news;
        let newsDiv = document.createElement("div");
        newsDiv.classList.add("news");
        newsDiv.innerHTML = `
           <img src="${urlToImage}">
        <div class="news-info">
          <h3>${title}</h3>
        </div>
        <div class="description">
          <h3>description</h3>
          ${description}
        </div>
   `;
        newsDiv.onclick = function () {
            window.location.href = url;
        }
        main.appendChild(newsDiv);
    });

}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    console.log(searchTerm);
    window.location.href = "search.html";
    if (localStorage.getItem("mynews") === null) {
        localStorage.setItem("mynews", JSON.stringify([]));
    }
    let mysearch = JSON.parse(localStorage.getItem("mynews"));
    mysearch.push(searchTerm);
    localStorage.setItem("mynews", JSON.stringify(mysearch));
});
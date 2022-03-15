var mykey = "13c272ba573a4acfbb0f6e5611a3caf4";
var base_url = "http://newsapi.org/v2/top-headlines";
const main = document.getElementById("main");

function getnews() {
    fetch(base_url + "?country=ca&apikey=" + mykey)
        .then(res => res.json())
        .then(resp => {
            console.log(resp.articles)
            shownews(resp.articles)
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

            // window.location.href = url;
            window.location.href = "news.html";
            if (localStorage.getItem("selected") === null) {
                localStorage.setItem("selected", JSON.stringify([]));
            }
            let myselect = JSON.parse(localStorage.getItem("selected"));
            myselect.push(news);
            localStorage.setItem("selected", JSON.stringify(myselect));
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
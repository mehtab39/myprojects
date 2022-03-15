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
if (localStorage.getItem("selected")) {
    if (localStorage.getItem("selected").length !== 0) {
        var selection = JSON.parse(localStorage.getItem("selected"));
        var selected_item = selection[selection.length - 1];
    }

}
function shownews(news) {
    main.innerHTML = "";
        const {
            author,
            title,
            urlToImage,
            url,
            description,
            content
        } = news;
        let newsDiv = document.getElementById("main");
        newsDiv.classList.add("news");
        newsDiv.innerHTML = `
           <img src="${urlToImage}">
          <span>${title}</span>
          <p>${author}</p>
        <div class="description">
          <h3>description</h3>
          ${description}
        </div>
        <div class="content">
        ${content}
      </div>
        
   `;


}
shownews(selected_item)
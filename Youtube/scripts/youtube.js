
  let videos = document.getElementById("videos");

  var top =
    "https://www.googleapis.com/youtube/v3/videos?part=contentDetails&chart=mostPopular&regionCode=IN&key=AIzaSyDHlBRwSR7p7OK7N7dj5is1OdOM-ZLQ9E8";
  async function searchVideos() {
    var query = document.getElementById("query").value;
    var res = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?q=${query}&type=video&key=AIzaSyDHlBRwSR7p7OK7N7dj5is1OdOM-ZLQ9E8&maxResults=20`
    );
    let data = await res.json();

    console.log(data.items[2].id.videoId);
    appendVideos(data.items);
  }
  async function topVideos() {
    let res = await fetch(
      "https://www.googleapis.com/youtube/v3/videos?part=contentDetails&chart=mostPopular&regionCode=IN&key=AIzaSyDHlBRwSR7p7OK7N7dj5is1OdOM-ZLQ9E8&maxResults=20"
    );
    let data = await res.json();

    console.log(data.items[2].id);
    appendVideos2(data.items);
  }

  function appendVideos2(video_data) {
    videos.innerHTML = null;
    video_data.forEach((Id) => {
      let div = document.createElement("div");

      div.innerHTML = `<iframe width="280" height="315" src="https://www.youtube.com/embed/${Id.id}"></iframe>`;
      videos.append(div);
    });
  }

  function appendVideos(video_data) {
    videos.innerHTML = null;
    video_data.forEach(({ id: { videoId } }) => {
      let div = document.createElement("div");
      div.innerHTML = `<a href="myyoutube.html"><iframe width="310" height="315" src="https://www.youtube.com/embed/${videoId}"></iframe></a>`;
      videos.append(div);
    });
  }

  topVideos();

  var showing = document.getElementById("showname");
  if (localStorage.getItem("mybucket")) {
    if (localStorage.getItem("mybucket").length !== 0) {
      let mycart = JSON.parse(localStorage.getItem("mybucket"));
      console.log(mycart[0]);
      showing.textContent = mycart[0];
      let sign = document.getElementById("signinbtn");
      sign.style.display = "none";
    }
  }

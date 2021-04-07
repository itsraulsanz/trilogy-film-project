function loadFilm() {
  var filmTitleData = localStorage.getItem("film-history");
  //console.log(filmTitleData);
  var parseFilmTitleData = JSON.parse(filmTitleData);
  //console.log(parseFilmTitleData)
  var filmDataArray = [];
  for (let i = 0; i < parseFilmTitleData.length; i++) {
    var API_KEY = "930706b3";
    var requestURL = `http://www.omdbapi.com/?t=${parseFilmTitleData[i]}&apikey=${API_KEY}`;

    fetch(requestURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (movieListData) {
        //printItemList(data);
        //console.log("movieListData", movieListData);
        filmDataArray.push(movieListData);
        //console.log(filmDataArray);
        if (i === parseFilmTitleData.length - 1) {
            //filmDataArray.push(movieListData);
        printItemList(filmDataArray)
        }
      });
  }
}

function printItemList(data) {
  console.log("OMDB", data);
  var rowEl = document.querySelector("#movieselector");

  for (let i = 0; i < data.length; i++) {
    var itemCardEl = document.createElement("div");
    itemCardEl.classList.add("col", "s6", "m4", "l2");
    var cardEl = document.createElement("div");
    cardEl.classList.add("card", "itemSelector");
    var itemCardImageEl = document.createElement("div");
    itemCardImageEl.classList.add("card-image", "movieSelectorItem");

    var itemImageEl = document.createElement("img");
    var posterUrl = data[i].Poster;
    itemImageEl.setAttribute("src", posterUrl);
    itemCardImageEl.appendChild(itemImageEl);

    //console.log(data[i]);
    //  console.log(data[i].release_date.slice(0, 4))
    const title = data[i].title;
    //  const year = data[i].release_date.slice(0, 4);
    var itemTitleEl = document.createElement("div");
    itemTitleEl.classList.add("card-title", "itemTitle");
    itemTitleEl.textContent = data[i].title;

    itemCardImageEl.addEventListener("click", function (event) {
      //console.log("clicked");
      // getOpenMovieDatabaseAPI(title);
      // getOpenMovieDatabaseAPI();
    });

    cardEl.appendChild(itemCardImageEl);
    cardEl.appendChild(itemTitleEl);
    itemCardEl.appendChild(cardEl);
    rowEl.appendChild(itemCardEl);
  }
}

loadFilm();

var movieSelectorContainer = document.querySelector(".movieSelectorContainer");
var movieSelectedScreen = document.querySelector(".selected-movie");
movieSelectedScreen.style.display = "none";


function loadFilm() {
  var filmTitleData = localStorage.getItem("film-history");
  var parseFilmTitleData = JSON.parse(filmTitleData);
  var filmDataArray = [];
  for (let i = 0; i < parseFilmTitleData.length; i++) {
    var API_KEY = "930706b3";
    var requestURL = `http://www.omdbapi.com/?t=${parseFilmTitleData[i]}&apikey=${API_KEY}`;

    fetch(requestURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (movieListData) {
        filmDataArray.push(movieListData);
        if (i === parseFilmTitleData.length - 1) {
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
    
    var itemTitleEl = document.createElement("div");
    itemTitleEl.classList.add("card-title", "itemTitle");
    itemTitleEl.textContent = data[i].Title;
    itemCardImageEl.appendChild(itemImageEl);

    itemCardImageEl.addEventListener("click", function (event) {
      getOpenMovieDatabaseAPI(data[i].Title);
    });

    cardEl.appendChild(itemCardImageEl);
    cardEl.appendChild(itemTitleEl);
    itemCardEl.appendChild(cardEl);
    rowEl.appendChild(itemCardEl);
  }
}

// OPEN MOVIE DATABASE

function getOpenMovieDatabaseAPI(Title) {
  var API_KEY = "930706b3";
  var requestURL = `http://www.omdbapi.com/?t=${Title}&apikey=${API_KEY}`;

  fetch(requestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      displayExtraSelectedMovie(data);
      //trickorTreat(data);
    });
}

function displayExtraSelectedMovie(data) {
  movieSelectorContainer.style.display = "none";
  movieSelectedScreen.style.display = "block";
  console.log(data)

  var filmTitle = document.getElementById("film-title");
  filmTitle.textContent = data.Title;
  console.log(data.Title)

  var posterImage = document.getElementById("poster");
  var posterURL = data.Poster;
  posterImage.setAttribute("src", posterURL);
  var directorName = document.getElementById("director");
  directorName.textContent = data.Director;
  directorName.style.color = "orange";
  var ageCertificate = document.getElementById("age");
  ageCertificate.textContent = data.Rated;
  ageCertificate.style.color = "orange";
  var countryLanguage = document.getElementById("country");
  countryLanguage.textContent = data.Country + " / " + data.Language;
  countryLanguage.style.color = "orange";
  var runTime = document.getElementById("runtime");
  runTime.textContent = data.Runtime;
  runTime.style.color = "orange";
  var yearReleased = document.getElementById("year-released");
  yearReleased.textContent = data.Released;
  yearReleased.style.color = "orange";
  var filmSynopsis = document.getElementById("synopsis");
  filmSynopsis.textContent = data.Plot;
  filmSynopsis.classList.add("filmSynopsis");
}


loadFilm();
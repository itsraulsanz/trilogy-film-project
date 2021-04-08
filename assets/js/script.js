var typeEl = document.querySelector("#type");
var subgenreEl = document.querySelector("#subgenre");
var yearsEl = document.querySelector("#years");
var languageEl = document.querySelector("#language");
var movieSelectorContainer = document.querySelector(".movieSelectorContainer");
var movieSelectedScreen = document.querySelector(".selected-movie");

// Getting the movie criteria
var API_KEY = "7557a7686c1be5c7114f3c419653ff79";
var urlForm = "https://api.themoviedb.org/3/discover/";

// TYPE
if (document.querySelector('option[name="type"]')) {
  document.querySelectorAll('option[name="type"]').forEach((elem) => {
    elem.addEventListener("click", function (event) {
      var type = event.target.value;
      urlForm += type;
      urlForm += "?api_key=";
      urlForm += API_KEY;
      typeEl.style.display = "none";
      subgenreEl.style.display = "flex";
    });
  });
}

// SUBGENRE
if (document.querySelector('option[name="subgenre"]')) {
  document.querySelectorAll('option[name="subgenre"]').forEach((elem) => {
    elem.addEventListener("click", function (event) {
      var subgenre = event.target.value;
      urlForm += "&genres=horror&with_keywords=";
      urlForm += subgenre;
      subgenreEl.style.display = "none";
      yearsEl.style.display = "flex";
    });
  });
}

// YEARS
if (document.querySelector('option[name="years"]')) {
  document.querySelectorAll('option[name="years"]').forEach((elem) => {
    elem.addEventListener("click", function (event) {
      var years = event.target.value;
      urlForm += "&year=";
      urlForm += years;
      yearsEl.style.display = "none";
      languageEl.style.display = "flex";
    });
  });
}

// LANGUAGE
if (document.querySelector('option[name="language"]')) {
  document.querySelectorAll('option[name="language"]').forEach((elem) => {
    elem.addEventListener("click", function (event) {
      var language = event.target.value;
      urlForm += "&language=";
      urlForm += language;
      languageEl.style.display = "none";
      movieSelectorContainer.style.display = "block";
      getTheMovieDatabase();
    });
  });
}

function getTheMovieDatabase() {
  fetch(urlForm)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      printItemList(data.results);
    });
}



// OPEN MOVIE DATABASE

function getOpenMovieDatabaseAPI(title) {
  movieSelectorContainer.style.display = "none";
  movieSelectedScreen.style.display = "block";
  var API_KEY = "930706b3";
  var requestURL = `http://www.omdbapi.com/?t=${title}&apikey=${API_KEY}`;

  fetch(requestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      displayExtraSelectedMovie(data);
      trickorTreat(data);
    });
}

function displaySelectedMovie(movieData) {
  movieSelectorContainer.style.display = "none";
  movieSelectedScreen.style.display = "block";

  var posterUrl = "https://image.tmdb.org/t/p/w500" + movieData.poster_path;

  var filmTitle = document.getElementById("film-title");
  filmTitle.textContent = movieData.original_title;
  var posterImage = document.getElementById("poster");
  posterImage.setAttribute("src", posterUrl);
  var ageCertificate = document.getElementById("age");
  ageCertificate.textContent = movieData.adult;
  ageCertificate.style.color = "orange";
  var countryLanguage = document.getElementById("country");
  countryLanguage.textContent = movieData.original_language;
  countryLanguage.style.color = "orange";
  var yearReleased = document.getElementById("year-released");
  yearReleased.textContent = movieData.release_date;
  yearReleased.style.color = "orange";
  var filmSynopsis = document.getElementById("synopsis");
  filmSynopsis.textContent = movieData.overview;
  filmSynopsis.classList.add("filmSynopsis");
  document.getElementById("back-btn").addEventListener("click", function goBack() {
    window.history.back();
    });
  document
    .getElementById("save-btn")
    .addEventListener("click", function(e) {
      e.preventDefault();
      saveFilmHistory(movieData.id);
    });
}

function displayExtraSelectedMovie(data) {
  var directorName = document.getElementById("director");
  directorName.textContent = data.Director;
  directorName.style.color = "orange";
  var runTime = document.getElementById("runtime");
  runTime.textContent = data.Runtime;
  runTime.style.color = "orange";
  var ageCertificate = document.getElementById("age");
  ageCertificate.textContent = data.Rated;
  ageCertificate.style.color = "orange";
}

//TRICK OR TREAT FUNCTION
function trickorTreat(data) {
  var IMDBscore = data.Ratings[0].value;
  var rottenTomatoesScore = data.Ratings[1].value;
  var metacriticScore = data.Ratings[2].value;
  var trickOrTreatInput = document.getElementById("trickortreat");
  if (
    IMDBscore > parseInt("5.0/10", 5 / 10) &&
    rottenTomatoesScore > parseInt("50%", 50 / 100) &&
    metacriticScore > parseInt("50/100", 50 / 100)
  ) {
    trickOrTreatInput.textContent = " TREAT!";
    trickOrTreatInput.setAttribute("id", "treat");
  } else if (
    IMDBscore < parseInt("5.0/10", 5 / 10) &&
    rottenTomatoesScore < parseInt("50%", 50 / 100) &&
    metacriticScore < parseInt("50/100", 50 / 100)
  ) {
    trickOrTreatInput.textContent = " TRICK!";
    trickOrTreatInput.setAttribute("id", "trick");
  } else {
    trickOrTreatInput.textContent = " JURY'S OUT - APPROACH WITH CAUTION!";
    trickOrTreatInput.setAttribute("id", "caution");
  }
  if (IMDBscore && metacriticScore && rottenTomatoesScore === 0);
  trickOrTreatInput.textContent = "SPOOKY - NO RATINGS!";
  trickOrTreatInput.setAttribute("id", "spooky");
}

// LOCAL STORAGE

function saveFilmHistory(movieId) {
  var watchList =
    JSON.parse(window.localStorage.getItem("watchList")) || [];

  if (!watchList.includes(movieId)) {
    watchList.push(movieId);
  }
  
  window.localStorage.setItem("watchList", JSON.stringify(watchList));  
}

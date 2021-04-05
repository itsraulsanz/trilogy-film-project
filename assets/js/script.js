// Getting the movie criteria
var typeEl = document.querySelector("#type");
var subgenreEl = document.querySelector("#subgenre");
var yearsEl = document.querySelector("#years");
var languageEl = document.querySelector("#language");
var movieselectorEl = document.querySelector("#movieselector");

subgenreEl.style.display = "none";
yearsEl.style.display = "none";
languageEl.style.display = "none";
movieselectorEl.style.display = "none";

var API_KEY = "7557a7686c1be5c7114f3c419653ff79";
var urlForm = "https://api.themoviedb.org/3/discover/";
// var type = "movie"; // or "tv"
// var subgenre = "12377"; // looking for keywords for each subGenre
// var year = "2020";
// var language = "ko"; // make a function to convert the language to ISO_639-1 code
// Psychological ID: 157314
// Post Apocalyptic ID: 270348
// Slasher: 12339   // + Serial Killer ID: 10714
// Supernatural ID: 6152
// Paranormal ID: 9853
// Zombies ID: 12377
// Monsters ID: 1299
// Gore ID: 10292
// Religion ID: 11001

// TYPE
if (document.querySelector('input[name="type"]')) {
  document.querySelectorAll('input[name="type"]').forEach((elem) => {
    elem.addEventListener("click", function (event) {
      var type = event.target.value;
      console.log(type);
      urlForm += type;
      urlForm += "?api_key=";
      urlForm += API_KEY;
      console.log(urlForm);
      typeEl.style.display = "none";
      subgenreEl.style.display = "block";
    });
  });
}

// SUBGENRE
if (document.querySelector('input[name="subgenre"]')) {
  document.querySelectorAll('input[name="subgenre"]').forEach((elem) => {
    elem.addEventListener("click", function (event) {
      var subgenre = event.target.value;
      console.log(subgenre);
      urlForm += "&genres=horror&with_keywords=";
      urlForm += subgenre;
      console.log(urlForm);
      subgenreEl.style.display = "none";
      yearsEl.style.display = "block";
    });
  });
}

// YEARS
if (document.querySelector('input[name="years"]')) {
  document.querySelectorAll('input[name="years"]').forEach((elem) => {
    elem.addEventListener("click", function (event) {
      var years = event.target.value;
      console.log(years);
      urlForm += "&year=";
      urlForm += years;
      console.log(urlForm);
      yearsEl.style.display = "none";
      languageEl.style.display = "block";
    });
  });
}

// LANGUAGE
if (document.querySelector('input[name="language"]')) {
  document.querySelectorAll('input[name="language"]').forEach((elem) => {
    elem.addEventListener("click", function (event) {
      var language = event.target.value;
      console.log(language);
      urlForm += "&language=";
      urlForm += language;
      console.log(urlForm);
      languageEl.style.display = "none";
      movieselectorEl.style.display = "block";
      //console.log(userData)
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

function printItemList(movieData) {
  console.log(movieData);
  var movieSelectorContainerEl = document.querySelector("#movieselector");

  for (let i = 0; i < movieData.length; i++) {
    var itemWrapperEl = document.createElement("div");
    itemWrapperEl.classList.add("row","movieListContainer");
    var itemCardEl = document.createElement("div");
    itemCardEl.classList.add("col", "s6", "m4", "l2");
    var cardEl = document.createElement("div");
    cardEl.classList.add("card");
    var itemCardImageEl = document.createElement("div");
    itemCardImageEl.classList.add("card-image", "movieSelectorItem");

    var itemImageEl = document.createElement("img");
    itemImageEl.setAttribute(
      "src",
      "https://image.tmdb.org/t/p/w500/" + movieData[i].poster_path
    );
    itemCardImageEl.appendChild(itemImageEl);

    var itemTitleEl = document.createElement("span");
    itemTitleEl.classList.add("card-title");
    itemTitleEl.textContent = movieData[i].title;
    itemCardImageEl.appendChild(itemTitleEl);

    itemWrapperEl.addEventListener("click", function (event) {
      console.log("clicked");
      getOpenMovieDatabaseAPI();
    });
    cardEl.appendChild(itemCardImageEl);
    itemCardEl.appendChild(cardEl);
    itemWrapperEl.appendChild(itemCardEl);
    movieSelectorContainerEl.appendChild(itemWrapperEl);
  }
}

// OPEN MOVIE DATABASE

function getOpenMovieDatabaseAPI() {
  var API_KEY = "930706b3";
  var title = "the ring";
  var year = "2002";
  var requestURL = `http://www.omdbapi.com/?t=${title}&y=${year}&apikey=${API_KEY}`;

  fetch(requestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("OMDB", data);
      trickorTreat(data);
    });
}

getOpenMovieDatabaseAPI();

// TRICK OR TREAT FUNCTION
function trickorTreat(data) {
  var IMDBscore = data.Ratings[0].value;
  var rottenTomatoesScore = data.Ratings[1].value;
  var metacriticScore = data.Ratings[2].value;
  var trickOrTreatInput = document.getElementById("trickortreat");
  if (
    IMDBscore > parseInt("5.0/10", 5) &&
    rottenTomatoesScore > parseInt("50%", 50) &&
    metacriticScore > parseInt("50/100", 50)
  ) {
    trickOrTreatInput.textContent = "TREAT!";
  } else if (
    IMDBscore < parseInt("5.0/10", 5) &&
    rottenTomatoesScore < parseInt("50%", 50) &&
    metacriticScore < parseInt("50/100", 50)
  ) {
    trickOrTreatInput.textContent = "TRICK!";
  } else {
    trickOrTreatInput.textContent = " JURY'S OUT - APPROACH WITH CAUTION!";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll("select");
  var instances = M.FormSelect.init(elems, options);
});

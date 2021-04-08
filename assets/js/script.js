var typeEl = document.querySelector("#type");
var subgenreEl = document.querySelector("#subgenre");
var yearsEl = document.querySelector("#years");
var languageEl = document.querySelector("#language");
var movieSelectorContainer = document.querySelector(".movieSelectorContainer");
var movieSelectedScreen = document.querySelector(".selected-movie");

function hideEls() {
  subgenreEl.style.display = "none";
  yearsEl.style.display = "none";
  languageEl.style.display = "none";
  movieSelectorContainer.style.display = "none";
  errorModal.style.display = "none";
  movieSelectedScreen.style.display = "none";
}

hideEls();

// Getting the movie criteria
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
if (document.querySelector('option[name="type"]')) {
  document.querySelectorAll('option[name="type"]').forEach((elem) => {
    elem.addEventListener("click", function (event) {
      var type = event.target.value;
      //console.log(type);
      urlForm += type;
      urlForm += "?api_key=";
      urlForm += API_KEY;
      //console.log(urlForm);
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
      //console.log(subgenre);
      urlForm += "&genres=horror&with_keywords=";
      urlForm += subgenre;
      //console.log(urlForm);
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
      //console.log(years);
      urlForm += "&year=";
      urlForm += years;
      //console.log(urlForm);
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
      //console.log(language);
      urlForm += "&language=";
      urlForm += language;
      //console.log(urlForm);
      languageEl.style.display = "none";
      movieSelectorContainer.style.display = "block";
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

  // ERROR MODAL - Displays if no results match search
  var rowEl = document.querySelector("#movieselector");
  if (movieData.length == 0) {
    var errorModal = document.getElementById("errorModal");
    errorModal.style.display = "block";
  }

  for (let i = 0; i < movieData.length; i++) {
    var itemCardEl = document.createElement("div");
    itemCardEl.classList.add("col", "s6", "m4", "l2");
    var cardEl = document.createElement("div");
    cardEl.classList.add("card", "itemSelector");
    var itemCardImageEl = document.createElement("div");
    itemCardImageEl.classList.add("card-image", "movieSelectorItem");

    var itemImageEl = document.createElement("img");
    var posterUrl =
      "https://image.tmdb.org/t/p/w500/" + movieData[i].poster_path;
    itemImageEl.setAttribute("src", posterUrl);
    itemCardImageEl.appendChild(itemImageEl);

    //console.log(movieData[i]);
    //  console.log(movieData[i].release_date.slice(0, 4))
    const title = movieData[i].title;
    //  const year = movieData[i].release_date.slice(0, 4);
    var itemTitleEl = document.createElement("div");
    itemTitleEl.classList.add("card-title", "itemTitle");
    itemTitleEl.textContent = movieData[i].title;

    itemCardImageEl.addEventListener("click", function (event) {
      //console.log("clicked");
      getOpenMovieDatabaseAPI(title);
      getOpenMovieDatabaseAPI();
    });

    cardEl.appendChild(itemCardImageEl);
    cardEl.appendChild(itemTitleEl);
    itemCardEl.appendChild(cardEl);
    rowEl.appendChild(itemCardEl);
  }
}

// OPEN MOVIE DATABASE

function getOpenMovieDatabaseAPI(title) {
  movieSelectorContainer.style.display = "none";
  movieSelectedScreen.style.display = "block";
  //console.log(title);
  var API_KEY = "930706b3";
  var requestURL = `http://www.omdbapi.com/?t=${title}&apikey=${API_KEY}`;

  fetch(requestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("OMDB", data);
      displaySelectedMovie(data);
      trickorTreat(data.Ratings);
    });
}

// TRICK OR TREAT FUNCTION
  
 function trickorTreat(data) {
   var trickOrTreatInput = document.getElementById("trickortreat");
   var IMDBscore = data[0] && data[0].Value;
   var rottenTomatoesScore = data[1] && data[1].Value;
   var metacriticScore = data[2] && data[2].Value;

   // normalises all values out of 100
   // parseFloat takes decimal score and ignores suffix string
  
   var imdbParsed = parseFloat(IMDBscore) * 10;
   var rottenParsed = parseInt(rottenTomatoesScore);
   var metaParsed = parseInt(metacriticScore);
    console.log("imdb parsed " + imdbParsed);
    console.log("rotten parsed " + rottenParsed);
    console.log("meta parsed " + metaParsed);
    
  // checks error - if not enough score data
  if (Number.isNaN(imdbParsed) || Number.isNaN(rottenParsed) || Number.isNaN(metaParsed)) {
    trickOrTreatInput.textContent = " Not Enough Data";
    trickOrTreatInput.setAttribute("class", "spooky");
   
  } else if (
      imdbParsed > 50 &&
      rottenParsed > 50 &&
      metaParsed > 50
   ) {
     trickOrTreatInput.textContent = "TREAT!";
     trickOrTreatInput.setAttribute("class", "treat");
   } else if (
    imdbParsed < 50 &&
    rottenParsed < 50 &&
    metaParsed < 50
   ) {
     trickOrTreatInput.textContent = "TRICK!";
     trickOrTreatInput.setAttribute("class", "trick");
   } else {
     trickOrTreatInput.textContent = " JURY'S OUT - APPROACH WITH CAUTION!";
     trickOrTreatInput.setAttribute("class", "caution");
   }
}
  

function displaySelectedMovie(data) {
  console.log(data, "displayselectedmovie");
  var filmTitle = document.getElementById("film-title");
  filmTitle.textContent = data.Title;
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
  filmSynopsis.style.color = "black";
}

// LOCAL STORAGE

function saveFilmHistory() {
  var filmTitle = document.getElementById("film-title");
  var filmTitleData = filmTitle.textContent;

  if (!filmTitleData) {
    return;
  }

  var filmHistoryinput =
    JSON.parse(window.localStorage.getItem("film-history")) || [];
  filmHistoryinput.push(filmTitleData);
  window.localStorage.setItem("film-history", JSON.stringify(filmHistoryinput));
  console.log(filmTitleData)
}

document.getElementById("save-btn").addEventListener("click", saveFilmHistory);

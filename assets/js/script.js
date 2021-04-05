

// Getting the movie criteria
var typeEl = document.querySelector("#type");
var subgenreEl = document.querySelector("#subgenre");
var yearsEl = document.querySelector("#years");
var languageEl = document.querySelector("#language");
var movieselectorEl = document.querySelector("#movieselector");
 
function hideEls () {
subgenreEl.style.display = "none";
yearsEl.style.display = "none";
languageEl.style.display = "none";
movieselectorEl.style.display = "none";
}

hideEls();
 
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
 var rowEl = document.querySelector("#movieselector");
 
 for (let i = 0; i < movieData.length; i++) {
   var itemCardEl = document.createElement("div");
   itemCardEl.classList.add("col", "s6", "m4", "l2");
   var cardEl = document.createElement("div");
   cardEl.classList.add("card", "itemSelector");
   var itemCardImageEl = document.createElement("div");
   itemCardImageEl.classList.add("card-image", "movieSelectorItem");
 
   var itemImageEl = document.createElement("img");
   itemImageEl.setAttribute(
     "src",
     "https://image.tmdb.org/t/p/w500/" + movieData[i].poster_path
   );
   itemCardImageEl.appendChild(itemImageEl);
 
   var itemTitleEl = document.createElement("div");
   itemTitleEl.classList.add("card-title", "itemTitle");
   itemTitleEl.textContent = movieData[i].title;
   itemCardEl.appendChild(itemTitleEl);
 
   cardEl.addEventListener("click", function (event) {
     console.log("clicked");
     getOpenMovieDatabaseAPI();
   });
   cardEl.appendChild(itemCardImageEl);
   itemCardEl.appendChild(cardEl);
   rowEl.appendChild(itemCardEl);
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
      displaySelectedMovie(data)
    });
}
  
getOpenMovieDatabaseAPI();
  
  
// TRICK OR TREAT FUNCTION
function trickorTreat (data) {
  var IMDBscore = data.Ratings[0].value;
  var rottenTomatoesScore = data.Ratings[1].value;
  var metacriticScore = data.Ratings[2].value;
  var trickOrTreatInput = document.getElementById("trickortreat");
  if ((IMDBscore > parseInt("5.0/10", 5/10) && rottenTomatoesScore > parseInt("50%", 50/100) && metacriticScore > parseInt("50/100", 50/100))) {
    trickOrTreatInput.textContent = " TREAT!";
    trickOrTreatInput.setAttribute("id", "treat");
  } else if ((IMDBscore < parseInt("5.0/10", 5/10) && rottenTomatoesScore < parseInt("50%", 50/100) && metacriticScore < parseInt("50/100", 50/100))) {
    trickOrTreatInput.textContent = " TRICK!";
    trickOrTreatInput.setAttribute("id", "trick");
  } else {
    trickOrTreatInput.textContent = " JURY'S OUT - APPROACH WITH CAUTION!";
    trickOrTreatInput.setAttribute("id", "caution");
  }
}
  

// DISPLAY SELECTED MOVIE
  
function displaySelectedMovie(data) {
  console.log(data, "displayselectedmovie")
  
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
  var availableOn = document.getElementById("watchon");
  availableOn.textContent;
  var filmSynopsis = document.getElementById("synopsis");
  filmSynopsis.textContent = data.Plot;
  filmSynopsis.style.color = "black";
  
}
  
// ERROR MODAL
function runModal () {
  var errorModal = document.getElementById("errorModal");
  var modalSpan = document.getElementsByClassName("close")[0];

  // Button to Test Modal - remove this later...
  var modalBtn = document.getElementById("modalBtn");
  modalBtn.onclick = function() {
    errorModal.style.display = "block";
  }

  modalSpan.onclick = function() {
    errorModal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == errorModal) {
      errorModal.style.display = "none";
    }
  }
}
  
runModal()


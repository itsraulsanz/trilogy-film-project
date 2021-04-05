// Getting the movie criteria
var type;
var subgenre;
var years;
var language;

// TYPE
if (document.querySelector('input[name="type"]')) {
  document.querySelectorAll('input[name="type"]').forEach((elem) => {
    elem.addEventListener("change", function (event) {
      var type = event.target.value;
      console.log(type);
      window.location.href = "02_subgenre.html";
    });
  });
}

// SUBGENRE
if (document.querySelector('input[name="subgenre"]')) {
  document.querySelectorAll('input[name="subgenre"]').forEach((elem) => {
    elem.addEventListener("change", function (event) {
      var subgenre = event.target.value;
      console.log(subgenre);
      window.location.href = "03_years.html";
    });
  });
}

// YEARS
if (document.querySelector('input[name="years"]')) {
  document.querySelectorAll('input[name="years"]').forEach((elem) => {
    elem.addEventListener("change", function (event) {
      var years = event.target.value;
      console.log(years);
      window.location.href = "04_language.html";
    });
  });
}

// LANGUAGE
if (document.querySelector('input[name="language"]')) {
  document.querySelectorAll('input[name="language"]').forEach((elem) => {
    elem.addEventListener("change", function (event) {
      var language = event.target.value;
      console.log(language);
      window.location.href = "movieselector.html";
    });
  });
}

function getTheMovieDatabase() {
  var API_KEY = "7557a7686c1be5c7114f3c419653ff79";
  var type = "movie"; // or "tv"
  var subgenre = "12377"; // looking for keywords for each subGenre
  var year = "2020";
  var language = "ko"; // make a function to convert the language to ISO_639-1 code
  // Psychological ID: 157314
  // Post Apocalyptic ID: 270348
  // Slasher: 12339   // + Serial Killer ID: 10714
  // Supernatural ID: 6152
  // Paranormal ID: 9853
  // Zombies ID: 12377
  // Monsters ID: 1299
  // Gore ID: 10292
  // Religion ID: 11001

  fetch(
    "https://api.themoviedb.org/3/discover/" +
      type +
      "?api_key=" +
      API_KEY +
      "&genres=horror&with_keywords=" +
      subgenre +
      "&year=" +
      year +
      "&language=" +
      language
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("Movie DB", data);
    });
}

getTheMovieDatabase();

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
    trickOrTreatInput.style.backgroundColor = "green";
  } else if ((IMDBscore < parseInt("5.0/10", 5/10) && rottenTomatoesScore < parseInt("50%", 50/100) && metacriticScore < parseInt("50/100", 50/100))) { 
    trickOrTreatInput.textContent = " TRICK!";
    trickOrTreatInput.style.backgroundColor = "red";
  } else {
    trickOrTreatInput.textContent = " JURY'S OUT - APPROACH WITH CAUTION!";
    trickOrTreatInput.style.backgroundColor = "yellow";
  }
}


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

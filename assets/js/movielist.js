var movieSelectorContainer = document.querySelector(".movieSelectorContainer");
var movieSelectedScreen = document.querySelector(".selected-movie");
movieSelectedScreen.style.display = "none";


function loadFilms() {
  var watchList = JSON.parse(localStorage.getItem("watchList")) || [];
  var API_KEY = "7557a7686c1be5c7114f3c419653ff79";
  var movieListData = [];

  for (let i = 0; i < watchList.length; i++) {  
    var requestURL = `https://api.themoviedb.org/3/movie/${watchList[i]}?api_key=${API_KEY}`;

    fetch(requestURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (movie) {
        printItemList([movie]);    
      });
  }
}


loadFilms();
var API_KEY = "7557a7686c1be5c7114f3c419653ff79";

//Getting the movie criteria
function getTheMovieDatabase() {
  var type = "movie"; // or "tv"
  var keyword = "12377";
    // Zombies ID:12377 https://api.themoviedb.org/3/keyword/12377/movies?api_key=7557a7686c1be5c7114f3c419653ff79&language=en-US
    // Gore ID:10292 https://api.themoviedb.org/3/keyword/10292/movies?api_key=7557a7686c1be5c7114f3c419653ff79&language=en-US
    // Psychological https://api.themoviedb.org/3/keyword/157314/movies?api_key=7557a7686c1be5c7114f3c419653ff79&language=en-US
    // Post Apocalyptic https://api.themoviedb.org/3/keyword/270348/movies?api_key=7557a7686c1be5c7114f3c419653ff79&language=en-US
    // Slasher https://api.themoviedb.org/3/keyword/12339/movies?api_key=7557a7686c1be5c7114f3c419653ff79&language=en-US
    // + Serial Killer  https://api.themoviedb.org/3/keyword/10714/movies?api_key=7557a7686c1be5c7114f3c419653ff79&language=en-US
    // 

  fetch(
    "https://api.themoviedb.org/3/discover/" + movie + "?api_key=" API_KEY + "&genres=horror&with_keywords=" keyword "&year=" year "&language=" + language
)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data)

    return fetch(
    "https://api.themoviedb.org/3/search/multi?api_key=" + API_KEY + "&query=" + keyword

    );
  })
    .then(function (res) {
    return res.json();
    })
    .then((data) => {
    console.log(data);
    });
}

getTheMovieDatabase();
//Getting the movie criteria
function getTheMovieDatabase() {
  var API_KEY = "7557a7686c1be5c7114f3c419653ff79";
  var type = "movie"; // or "tv"
  var keyword = "12377"; // looking for keywords for each subGenre
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
  // Reigion ID: 11001

  fetch(
    "https://api.themoviedb.org/3/discover/" +
      type +
      "?api_key=" +
      API_KEY +
      "&genres=horror&with_keywords=" +
      keyword +
      "&year=" +
      year +
      "&language=" +
      language
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

getTheMovieDatabase();

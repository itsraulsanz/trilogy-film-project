function printItemList(movieData) {
  var rowEl = document.querySelector("#movieselector");

  // ERROR MODAL - Displays if no results match search
  var rowEl = document.querySelector("#movieselector");
  if (movieData.length == 0) {
    var errorModal = document.getElementById("errorModal");
    errorModal.style.display = "block";
  }

  for (let i = 0; i < movieData.length; i++) {
    // if there's no image, skip this movie
    if (!movieData[i].poster_path) continue;

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

    const title = movieData[i].title;
    var itemTitleEl = document.createElement("div");
    itemTitleEl.classList.add("card-title", "itemTitle");
    itemTitleEl.textContent = movieData[i].title;

    itemCardImageEl.addEventListener("click", function (event) {
      getOpenMovieDatabaseAPI(title);
      displaySelectedMovie(movieData[i]);
    });

    cardEl.appendChild(itemCardImageEl);
    cardEl.appendChild(itemTitleEl);
    itemCardEl.appendChild(cardEl);
    rowEl.appendChild(itemCardEl);
  }
}

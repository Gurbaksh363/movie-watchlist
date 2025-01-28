const watermarkContainer = document.getElementById('watermark-container')

document.addEventListener('click', (e)=>{
  const id = e.target.dataset.id
  if (id){
      let movieWatchlist = JSON.parse(localStorage.getItem('movieWatchlist'))
      let index = movieWatchlist.indexOf(id)
      if (index > -1){
          movieWatchlist.splice(index, 1)
          localStorage.setItem('movieWatchlist', JSON.stringify(movieWatchlist))
          renderMovies(movieWatchlist, 'minus')
        }     
  }
})

let movieWatchlist = JSON.parse(localStorage.getItem('movieWatchlist'))
if (movieWatchlist !== null) {
  watermarkContainer.style.display = 'none'
  let arr = JSON.parse(localStorage.getItem('movieWatchlist'))
  renderMovies(arr, 'minus')
}

// rendermovies import,
function renderMovies(moviesIdArr, WatchlistSign) {
  let htmlString = ""
  moviesIdArr.forEach(id => {
    // promise all
    fetch(`https://www.omdbapi.com/?apikey=e8a1f613&i=${id}`)
      .then(res => res.json())
      .then(movie => {
        htmlString +=
          `<div class="movie-card" >
        <img width="100" height="147"
                      src="${movie.Poster}" alt="movie poster"/>
                      <div>
                      <div class="movie-heading-container">
                      <h2 class="movie-title">${movie.Title}</h2>
                          <span>
                              <i class="fa-sharp fa-solid fa-star fa-xs" style="color: #fec64e"></i>
                              ${movie.imdbRating}
                              </span>
                      </div>
                      <div class="movie-details">
                          <span>${movie.imdbVotes} likes</span>
                          <span>${movie.Genre}</span>
                          <span>
                          <i class="fa-solid fa-circle-${WatchlistSign} fa-xl" data-id="${id}"></i>
                          Watchlist
                          </span>
                          </div>
                          <p>${movie.Plot}</p>
                          </div>
                          </div> `
        document.getElementById('movies-section').innerHTML = htmlString
      })
    })
    if(!htmlString){
    document.getElementById('movies-section').innerHTML = htmlString

  }
}


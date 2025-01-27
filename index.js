const searchInputEl = document.getElementById('search-input')
const watermarkContainer = document.getElementById('watermark-container')

searchInputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        searchMovies()
    }
})
document.addEventListener('click', (e)=>{
    const id = e.target.dataset.id
    if (id){
        let movieWatchlist = JSON.parse(localStorage.getItem('movieWatchlist'))
        if (movieWatchlist === null){
            movieWatchlist = []
        }
        if (!movieWatchlist.includes(id)){
            movieWatchlist.push(id)
            localStorage.setItem('movieWatchlist', JSON.stringify(movieWatchlist))
        }
    }
    if (e.target.id ==="serarchBtn"){
        searchMovies()

    }
})
function searchMovies() {
    let searchValue = searchInputEl.value.trim()
    fetch(`https://www.omdbapi.com/?apikey=e8a1f613&s=${searchValue}`)
        .then(response => response.json())
        .then(data => {
            let imdbids = []
            if (data.Response === "False"){
                watermarkContainer.innerHTML = `<p class="watermark-text">Unable to find what you’re looking for. Please try another search.</p>`  
                return
            }
            watermarkContainer.style.display = 'none'
            data.Search.forEach(movie => {
                imdbids.push(movie.imdbID)
            })
            renderMovies(imdbids, 'plus')
        })
    }
function renderMovies(moviesIdArr, WatchlistSign){
        let htmlString = ""
        moviesIdArr.forEach(id => {
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
}



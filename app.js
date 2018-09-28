
const movieInput = document.querySelector('#movieInput')

const moviesDiv = document.querySelector('#movies')
const movieDiv = document.querySelector('#movie')
movieInput.addEventListener('input',getMovies)

function getMovies(){

    const searchMovie = movieInput.value
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=64ff58f707e649c01184a156043bcf43&language=en-US&query=${searchMovie}`)
    .then(function (response) {
              let movies = response.data.results;
              console.log(typeof(movies));
              let output = '';

              movies.forEach(function(movie){
                output+=`
                    <div class="col-md-3">
                      <div class="well text-center">
                        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="img-responsive">
                        <h5>${movie.title}</h5>
                        <a onclick="movieSelected('${movie.id}')" class="btn btn-primary" href="#">Movie Details</a>
                      </div>
                    </div>
                  `;


              })

              moviesDiv.innerHTML = output


        })
        .catch((err) => {
           console.log(err);
         });

}


function movieSelected(id){
  sessionStorage.setItem('movieId',id)
  window.location = 'movie.html'
  return false
}

function getMovie(){
  let movieId = sessionStorage.getItem('movieId')

   axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=98325a9d3ed3ec225e41ccc4d360c817`)
   .then(function (response) {
    let movie = response.data;

        movieDiv.innerHTML = `
            <div class="row">
              <div class="col-md-4">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="thumbnail">
              </div>
              <div class="col-md-8">
                <h2>${movie.title}</h2>
                <ul class="list-group">
                  <li class="list-group-item"><strong>Genre:</strong> ${movie.genres[0].name}, ${movie.genres[1].name}</li>
                  <li class="list-group-item"><strong>Released:</strong> ${movie.release_date}</li>
                  <li class="list-group-item"><strong>Rated:</strong> ${movie.vote_average}</li>
                  <li class="list-group-item"><strong>Runtime:</strong> ${movie.runtime} min.</li>
                  <li class="list-group-item"><strong>Production Companies:</strong> ${movie.production_companies[0].name} min.</li>
                </ul>
              </div>
            </div>
            <div class="row">
              <div class="well">
                <h3>Plot</h3>
                ${movie.overview}
                <hr>
                <a href="http://imdb.com/title/${movie.imdb_id}" target="_blank" class="btn btn-primary">View IMDB</a>
                <a href="index.html" class="btn btn-default">Go Back To Search</a>
              </div>
            </div>
        `;

        })
    .catch(function (error) {
      console.log(error);
    });




}

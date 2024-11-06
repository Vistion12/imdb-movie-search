const MovieItem = ({ movie }) => (
    <fieldset>
      <div className="film-info">
        <a href={`https://www.imdb.com/title/${movie.imdbID}/`} target="_blank">
          <span><b>Title:</b> <span>{movie.Title}</span></span>
        </a>
        <span><b>Year:</b> <span>{movie.Year}</span></span>
        <span><b>Type:</b> <span>{movie.Type}</span></span>
      </div>
      <div className="film-poster">
        <img className="Poster" src={movie.Poster} alt={`Poster of ${movie.Title}`} />
      </div>
    </fieldset>
  );
  
  export default MovieItem;
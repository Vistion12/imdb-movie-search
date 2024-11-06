import MovieItem from './MovieItem';

const MovieList = ({ movies }) => (
  <div id="result">
    {movies.map(movie => <MovieItem key={movie.imdbID} movie={movie} />)}
  </div>
);

export default MovieList;
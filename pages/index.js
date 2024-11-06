import { useEffect, useState, useCallback } from 'react';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';
import Loader from '../components/Loader';
import axios from 'axios';


const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [hasMore, setHasMore] = useState(true);

  const fetchMovies = useCallback(async (searchQuery, currentPage) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://www.omdbapi.com/`, {
        params: {
          apikey: 'ddc35b3b',
          s: encodeURIComponent(searchQuery),
          page: currentPage,
        },
      });
      
      if (response.data.Search) {
        setMovies((prevMovies) => [...prevMovies, ...response.data.Search]);
        setHasMore(response.data.Search.length > 0);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    setMovies([]);
    setPage(1);
    fetchMovies(searchQuery, 1);
  };

  useEffect(() => {
    if (query) {
      fetchMovies(query, page);
    }
  }, [fetchMovies, query, page]);

  const handleScroll = useCallback(() => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [hasMore, loading]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div>
      <h1>IMDb® Movie & Series Database</h1>
      <SearchBar onSearch={handleSearch} />
      {loading && <Loader />}
      <MovieList movies={movies} />
    </div>
  );
};

export default Home;
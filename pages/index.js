import { useEffect, useState, useCallback } from 'react';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';
import Loader from '../components/Loader';
import axios from 'axios';
import ButtonToTop from '../components/ButtonToTop';

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState('');
    const [hasMore, setHasMore] = useState(true);
    const [showBackToTop, setShowBackToTop] = useState(false); // Для отображения кнопки

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
        // Показываем кнопку "Вернуться вверх", когда страница прокручена вниз
        if (window.scrollY > 200) {
            setShowBackToTop(true);
        } else {
            setShowBackToTop(false);
        }
    }, [hasMore, loading]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div>
            <h1>IMDb® Movie & Series Database</h1>
            <SearchBar onSearch={handleSearch} />
            {loading && <Loader />}
            <MovieList movies={movies} />
            {showBackToTop && <ButtonToTop onClick={scrollToTop} isVisible={showBackToTop} />} 
        </div>
    );
};

export default Home;
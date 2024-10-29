// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import Search from '../components/Search';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const Home = ({ selectedGenre }) => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let url;

        // Check if there's a search query
        if (query) {
          // Fetch movies based on search query
          url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=en-US`;
        } else {
          // Fetch popular movies
          const genreFilter = selectedGenre ? `&with_genres=${selectedGenre}` : '';
          url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc${genreFilter}`;
        }

        const response = await fetch(url);
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [query, selectedGenre]);

  const renderStars = (rating) => {
    const stars = [];
    const maxStars = 5;
    const fullStars = Math.floor(rating / 2);
    const halfStar = rating % 2 >= 1 ? true : false;

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`star-full-${i}`} className="text-yellow-500" />);
    }

    // Add half star if needed
    if (halfStar) {
      stars.push(<FaStarHalfAlt key="star-half" className="text-yellow-500" />);
    }

    // Add empty stars up to maxStars
    for (let i = stars.length; i < maxStars; i++) {
      stars.push(<FaRegStar key={`star-empty-${i}`} className="text-yellow-500" />);
    }

    return stars;
  };

  return (
    <div className="p-4 mt-20">
      <h1 className="text-2xl font-bold mb-4">
        {selectedGenre ? "Filtered Movies" : "Popular Movies"}
      </h1>
      <Search query={query} setQuery={setQuery} />
      <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {movies.map((movie) => (
          <li key={movie.id} className="mb-2">
            <div className="bg-gray-200 p-4 rounded shadow">
              <h2 className="text-lg font-semibold">{movie.title}</h2>
              <div className="flex items-center mt-1">{renderStars(movie.vote_average)}</div>
              <img 
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                alt={movie.title} 
                className="w-full h-auto rounded mt-2"
              />
              <button 
                onClick={() => navigate(`/movie/${movie.id}`)} 
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
              >
                View Reviews
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;

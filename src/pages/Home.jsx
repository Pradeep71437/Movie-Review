// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import Search from '../components/Search';

const Home = ({ selectedGenre }) => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const API_KEY = '0fae8cdb0aaa5306ef8bec98a99a070e';

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
  }, [query, selectedGenre]); // Run effect when query or selectedGenre changes

  // Filter movies based on the search query
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-4 mt-20">
      <h1 className="text-2xl font-bold mb-4">
        {selectedGenre ? "Filtered Movies" : "Popular Movies"}
      </h1>
      <Search query={query} setQuery={setQuery} />
      <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredMovies.map((movie) => (
          <li key={movie.id} className="mb-2">
            <div className="bg-gray-200 p-4 rounded shadow">
              <h2 className="text-lg font-semibold">{movie.title}</h2>
              <p className="text-gray-500">Rating: {movie.vote_average}</p>
              <img 
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                alt={movie.title} 
                className="w-full h-auto rounded mt-2"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;

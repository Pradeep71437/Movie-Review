// src/pages/Genres.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Genres = ({ onGenreSelect }) => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=0fae8cdb0aaa5306ef8bec98a99a070e`);
        const data = await response.json();
        setGenres(data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);
    onGenreSelect(genreId);
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="p-4 mt-20">
      <h1 className="text-2xl font-bold mb-4">Select Genre</h1>
      <div className="flex gap-4 flex-wrap mb-6">
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => handleGenreClick(genre.id)}
            className={`px-4 py-2 rounded ${selectedGenre === genre.id ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            {genre.name}
          </button>
        ))}
      </div>
      <button
        onClick={handleBackToHome}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
      >
        Back to Home
      </button>
    </div>
  );
};

export default Genres;

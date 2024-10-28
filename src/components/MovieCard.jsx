import React from 'react';

const MovieCard = ({ movie }) => (
  <div className="border rounded-lg shadow-md p-4">
    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="rounded" />
    <h2 className="text-xl font-semibold mt-2">{movie.title}</h2>
    <p className="text-sm mt-1">{movie.overview}</p>
  </div>
);

export default MovieCard;

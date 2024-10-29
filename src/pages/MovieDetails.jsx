  // src/pages/MovieDetails.jsx
  import React, { useEffect, useState } from 'react';
  import { useParams } from 'react-router-dom';
  import axios from 'axios';

  const MovieDetails = () => {
    const { id } = useParams(); // Get movie ID from the URL
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
    const [review, setReview] = useState(""); // State for review input
    const [reviews, setReviews] = useState([]); // State for reviews
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

    useEffect(() => {
      const fetchMovieDetails = async () => {
        if (!API_KEY || !id) {
          setError("API key or movie ID is missing");
          return;
        }

        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch movie data");
          }

          const data = await response.json();
          setMovie(data);
        } catch (err) {
          console.error("Error fetching movie details:", err);
          setError(err.message);
        }
      };

      const fetchReviews = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/reviews/${id}`);
          setReviews(response.data);
        } catch (err) {
          console.error("Error fetching reviews:", err);
        }
      };

      fetchMovieDetails();
      fetchReviews();
    }, [id, API_KEY]);

    const renderStars = (rating) => {
      const stars = [];
      const fullStars = Math.floor(rating / 2); // Convert rating out of 10 to 5 stars
      const halfStar = rating % 2 >= 1; // If there's a remainder, we add a half star

      for (let i = 0; i < fullStars; i++) {
        stars.push(<span key={i}>&#9733;</span>); // Full star
      }
      if (halfStar) {
        stars.push(<span key="half">&#9733;</span>); // Half star
      }
      while (stars.length < 5) {
        stars.push(<span key={stars.length + 1}>&#9734;</span>); // Empty star
      }
      return stars;
    };

    const handleReviewSubmit = async () => {
      const newReview = { movieId: id, content: review };
      try {
        const response = await axios.post(`http://localhost:5000/api/reviews`, newReview);
        setReviews([...reviews, response.data]); // Add new review to state
        setReview(""); // Clear the input after submitting
        setIsModalOpen(false); // Close the modal after submitting
      } catch (err) {
        console.error("Error submitting review:", err);
      }
    };

    if (error) return <p>Error: {error}</p>;
    if (!movie) return <p>Loading...</p>;

    return (
      <div className="lg:flex p-4 mt-20 gap-8">
        <div className="lg:w-1/3 flex justify-center items-start">
          <img 
            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/placeholder.jpg'} 
            alt={movie.title || "Movie Poster"} 
            className="rounded w-1/2 lg:w-[360px] shadow"
          />
        </div>
        <div className="lg:w-2/3 mx-auto">
          <h1 className="lg:text-6xl text-3xl font-bold lg:mb-8">{movie.title || "Title not available"}</h1>
          <h2 className="lg:text-4xl text-xl font-bold mt-4 lg:my-7">Overview</h2>
          <p className="text-gray-700 mb-2 text-md lg:text-xl pr-10">
            {movie.overview || "Overview not available"}
          </p>
          <p className="text-gray-700 lg:my-5 lg:text-xl">Release Date: {movie.release_date || "N/A"}</p>
          <div className="flex items-center mt-2">
            <p className="text-gray-500 lg:text-xl">Rating: </p>
            <span className="ml-2 text-yellow-500 lg:text-2xl">
              {renderStars(movie.vote_average)}
            </span>
            <p className="ml-2 text-gray-500">({movie.vote_average || "N/A"})</p>
          </div>

          {/* Reviews Section */}
          <h2 className="text-2xl font-bold mt-8">Reviews</h2>
          <ul className="mt-4">
            {reviews.map((review) => (
              <li key={review._id} className="border-b py-2">{review.content}</li>
            ))}
          </ul>

          {/* Add Review Button */}
          <button 
            onClick={() => setIsModalOpen(true)} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add Review
          </button>

          {/* Modal for Review Input */}
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
                <h3 className="text-2xl font-bold mb-4">Add Your Review</h3>
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Write your review here..."
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                  rows="4"
                />
                <div className="flex justify-end">
                  <button 
                    onClick={handleReviewSubmit} 
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Submit
                  </button>
                  <button 
                    onClick={() => setIsModalOpen(false)} 
                    className="ml-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  export default MovieDetails;

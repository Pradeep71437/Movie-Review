# Movie Review Application

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Overview
The Movie Review Application is a web application that allows users to view movies and add reviews for each movie. Users can search for movies, view existing reviews, and submit their own reviews. The application is built using React for the frontend and Node.js with Express for the backend, using MongoDB as the database.

## Features
- User authentication using Firebase
- View movie details and reviews
- Add reviews for movies
- Fetch reviews from the MongoDB database
- Responsive design for mobile and desktop

## Technologies Used
- **Frontend:** React.js, HTML, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** Firebase Authentication
- **Hosting:** (If applicable, mention where you are hosting the app, e.g., Vercel, Heroku)

## Getting Started
To run this project locally, follow these steps:

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/movie-review-app.git
   cd movie-review-app

2. Set up the backend

      Navigate to the backend directory and install dependencies:
   
        cd backend
        npm install
  
      Create a .env file in the backend directory and add your MongoDB URI:
   
        MONGODB_URI=your_mongodb_connection_string

      Start the backend server:
   
        npm start

4. Set up the frontend

      Navigate to the frontend directory and install dependencies:

        cd ../frontend
        npm install

      Start the frontend development server:

        npm start

4. Open your browser and navigate to http://localhost:3000 to view the application.

      API Endpoints

      GET:
   
         /api/reviews/

      Fetch reviews for a specific movie.

      Parameters:
        movieId: The ID of the movie for which to fetch reviews.

      POST:

         /api/reviews

      Submit a new review.

      Request Body:

        {
          "movieId": "string",
          "content": "string"
        }







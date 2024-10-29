// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Define a Review schema and model
const reviewSchema = new mongoose.Schema({
  movieId: String,
  content: String,
});

const Review = mongoose.model('Review', reviewSchema);

// API to get reviews by movie ID
app.get('/api/reviews/:movieId', async (req, res) => {
  try {
    const reviews = await Review.find({ movieId: req.params.movieId });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// API to post a review
app.post('/api/reviews', async (req, res) => {
  const { movieId, content } = req.body;
  const review = new Review({ movieId, content });

  try {
    const savedReview = await review.save();
    res.status(201).json(savedReview);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

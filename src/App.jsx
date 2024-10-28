// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { auth } from './firebase'; // Import auth
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Genres from './pages/Genres';
import { onAuthStateChanged } from 'firebase/auth'; // Import onAuthStateChanged

function App() {
  const [selectedGenre, setSelectedGenre] = useState('');
  const [user, setUser] = useState(null); // State to hold user information

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // Set user state when authenticated
      } else {
        setUser(null); // Set user state to null when not authenticated
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar user={user} /> {/* Pass user to Navbar */}
        <Routes>
          <Route path="/" element={<Home selectedGenre={selectedGenre} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/genres" element={<Genres onGenreSelect={handleGenreSelect} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

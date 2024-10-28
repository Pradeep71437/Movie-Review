// src/components/Navbar.jsx
import React, { useState } from 'react';
import { auth } from '../firebase'; // Import Firebase auth
import { signOut } from 'firebase/auth'; // Import signOut function
import { useNavigate } from 'react-router-dom';

const Navbar = ({ user }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/'); // Redirect to home after logout
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="bg-gray-800 sticky p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-white text-2xl cursor-pointer" onClick={() => navigate('/')}>Movie Review</h1>
        <div className="flex items-center gap-10">
          <button
            onClick={() => navigate('/genres')}
            className="text-white"
          >
            Genres
          </button>
          <div className="relative">
            {user ? (
              <div>
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="w-10 h-10 rounded-full cursor-pointer"
                  onClick={() => setDropdownOpen(!dropdownOpen)} // Toggle dropdown
                />
                {dropdownOpen && (
                  <div className="absolute right-0 bg-white shadow-md rounded mt-2">
                    <p className="px-4 py-2">{user.displayName}</p>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="text-white"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

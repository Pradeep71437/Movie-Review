// src/pages/Login.jsx
import React from 'react';
import { auth, provider } from '../firebase'; // Import auth and provider
import { signInWithPopup } from 'firebase/auth';

const Login = () => {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      // This gives you a Google Access Token. You can use it to access Google APIs.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log('User:', user);
    } catch (error) {
      console.error("Error during login:", error);
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="bg-white p-6 rounded shadow-md" onSubmit={(e) => e.preventDefault()}>
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <button 
          onClick={handleLogin} 
          className="bg-blue-600 text-white p-2 rounded mt-4 w-full"
        >
          Login with Google
        </button>
      </form>
    </div>
  );
};

export default Login;

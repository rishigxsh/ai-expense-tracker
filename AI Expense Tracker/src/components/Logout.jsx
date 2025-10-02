import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebase';

function Logout() {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Sign out failed:', error);
      alert('Logout failed. Please try again.');
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
    >
      Logout
    </button>
  );
}

export default Logout;



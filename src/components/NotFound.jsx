import React from 'react';
import { FiHome, FiFrown } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 text-center">
      <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg">
        <div className="flex justify-center mb-6">
          <FiFrown className="text-gray-400 text-6xl" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition duration-300"
        >
          <FiHome className="mr-2" />
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
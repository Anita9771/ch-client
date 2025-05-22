import React from 'react';
import { FiArrowRight } from 'react-icons/fi';

const CTA = () => {
  return (
    <div className="bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Join Capital Haven Today</h2>
            <p className="text-xl text-blue-100 mb-6">
              Open your account in minutes and start enjoying smarter banking right away.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <a href="/register" className="bg-white text-blue-600 px-6 py-4 rounded-lg font-medium hover:bg-gray-100 transition duration-300 text-center flex items-center justify-center">
              Sign Up Free <FiArrowRight className="ml-2" />
            </a>
            <a href="/about-us" className="border-2 border-white text-white px-6 py-4 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition duration-300 text-center flex items-center justify-center">
              Learn More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTA;
// import React from 'react';
import { FiArrowRight, FiSmartphone, FiCreditCard, FiDollarSign } from 'react-icons/fi';
import '../index.css';

const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Banking Made Simple, Fast & Secure</h1>
            <p className="text-xl mb-8 text-blue-100">Manage your finances effortlessly with our all-in-one digital banking platform.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/register" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition duration-300 text-center flex items-center justify-center">
                Open Free Account <FiArrowRight className="ml-2" />
              </a>
              <a href="/about-us" className="border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition duration-300 text-center flex items-center justify-center">
                Learn More
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl">
              <div className="flex items-center mb-6">
                <div className="bg-white/20 p-3 rounded-full mr-4">
                  <FiSmartphone className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Mobile Banking</h3>
                  <p className="text-blue-100">Bank on the go with our app</p>
                </div>
              </div>
              <div className="flex items-center mb-6">
                <div className="bg-white/20 p-3 rounded-full mr-4">
                  <FiCreditCard className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Digital Cards</h3>
                  <p className="text-blue-100">Instant virtual cards for online shopping</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="bg-white/20 p-3 rounded-full mr-4">
                  <FiDollarSign className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Smart Savings</h3>
                  <p className="text-blue-100">Automate your savings goals</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
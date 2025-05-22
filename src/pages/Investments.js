import React, { useState, useEffect } from 'react';
import { FiClock, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  // Add leading zeros to numbers less than 10
  const formatNumber = (num) => num < 10 ? `0${num}` : num;

  return (
    <div className="flex justify-center space-x-4 mb-12">
      {[
        { value: formatNumber(timeLeft.days), label: 'Days' },
        { value: formatNumber(timeLeft.hours), label: 'Hours' },
        { value: formatNumber(timeLeft.minutes), label: 'Minutes' },
        { value: formatNumber(timeLeft.seconds), label: 'Seconds' },
      ].map((item, index) => (
        <div key={index} className="bg-blue-600 text-white rounded-lg p-4 w-20">
          <div className="text-2xl font-bold">{item.value}</div>
          <div className="text-xs uppercase tracking-wider">{item.label}</div>
        </div>
      ))}
    </div>
  );
};

const Investments = () => {
  // Set your target launch date here (YYYY, MM-1, DD, HH, MM, SS)
  // Note: Months are 0-indexed in JavaScript (0 = January, 11 = December)
  const launchDate = new Date(2025, 6, 15, 9, 0, 0); // July 15, 2025 at 9:00 AM

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-lg">
            {/* Animated Clock Icon */}
            <div className="mx-auto w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-8">
              <FiClock className="text-blue-600 text-4xl animate-pulse" />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Exciting Things Are Coming
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              We're working hard to bring you innovative new banking features. 
              Stay tuned for updates on our upcoming launch!
            </p>

            {/* Functional Countdown Timer */}
            <CountdownTimer targetDate={launchDate} />

            {/* Email Notification Signup */}
            <div className="max-w-md mx-auto mb-12">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Get notified when we launch
              </h3>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow px-4 py-3 rounded-l-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                />
                <button className="bg-blue-600 text-white px-6 py-3 rounded-r-md hover:bg-blue-700 transition duration-300">
                  Notify Me
                </button>
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left max-w-4xl mx-auto">
              <div className="flex items-start">
                <FiMail className="text-blue-600 text-xl mt-1 mr-3" />
                <div>
                  <h4 className="font-medium text-gray-900">Email Us</h4>
                  <p className="text-gray-600">updates@Capital Haven.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <FiPhone className="text-blue-600 text-xl mt-1 mr-3" />
                <div>
                  <h4 className="font-medium text-gray-900">Call Us</h4>
                  <p className="text-gray-600">1-800-CAP-HAVEN</p>
                </div>
              </div>
              <div className="flex items-start">
                <FiMapPin className="text-blue-600 text-xl mt-1 mr-3" />
                <div>
                  <h4 className="font-medium text-gray-900">Visit Us</h4>
                  <p className="text-gray-600">123 Financial District, NYC</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
};

export default Investments;
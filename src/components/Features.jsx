import React from 'react';
import { FiShield, FiPieChart, FiZap, FiGlobe } from 'react-icons/fi';

const features = [
  {
    icon: <FiShield className="text-blue-600 text-3xl" />,
    title: "Bank-Level Security",
    description: "Your money is protected with industry-leading security measures and encryption."
  },
  {
    icon: <FiPieChart className="text-blue-600 text-3xl" />,
    title: "Smart Budgeting",
    description: "Get insights into your spending habits and set budgets automatically."
  },
  {
    icon: <FiZap className="text-blue-600 text-3xl" />,
    title: "Instant Transfers",
    description: "Send and receive money instantly to anyone, anywhere."
  },
  {
    icon: <FiGlobe className="text-blue-600 text-3xl" />,
    title: "Global Access",
    description: "Manage your finances from anywhere in the world with our mobile app."
  }
];

const Features = () => {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Capital Haven?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're redefining what it means to bank in the digital age with innovative features designed for your lifestyle.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition duration-300">
              <div className="bg-blue-50 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Ready to experience the future of banking?</h3>
              <p className="text-blue-100 mb-6">Join over 2 million customers who trust Capital Haven with their finances.</p>
              <a href="/register" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition duration-300 inline-block">
                Get Started Now
              </a>
            </div>
            <div className="flex justify-center">
              <div className="bg-white/20 backdrop-blur-md p-6 rounded-xl max-w-xs">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">4.9/5</div>
                  <div className="flex justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-blue-100">Customer satisfaction rating</p>
                  <p className="text-sm mt-2 text-blue-200">Based on 15,000+ reviews</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
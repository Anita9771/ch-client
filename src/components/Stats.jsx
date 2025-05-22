import React from 'react';

const stats = [
  { value: "2M+", label: "Happy Customers" },
  { value: "$50B+", label: "Assets Managed" },
  { value: "99.9%", label: "Uptime Reliability" },
  { value: "24/7", label: "Customer Support" }
];

const Stats = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">{stat.value}</div>
              <div className="text-gray-600 uppercase text-sm tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;
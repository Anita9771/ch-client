import React from 'react';
import { PageLayout } from '../components';
import { FiShield, FiUsers, FiAward, FiGlobe } from 'react-icons/fi';

const AboutUs = () => {
  const stats = [
    { value: "2M+", label: "Customers Worldwide", icon: <FiUsers className="text-blue-600 text-2xl" /> },
    { value: "$50B+", label: "Assets Under Management", icon: <FiAward className="text-blue-600 text-2xl" /> },
    { value: "150+", label: "Countries Served", icon: <FiGlobe className="text-blue-600 text-2xl" /> },
    { value: "24/7", label: "Customer Support", icon: <FiShield className="text-blue-600 text-2xl" /> }
  ];

  const team = [
    { name: "Sarah Johnson", role: "CEO & Founder", bio: "Former Wall Street executive with 20+ years in finance" },
    { name: "Michael Chen", role: "CTO", bio: "Fintech innovator specializing in secure banking platforms" },
    { name: "Emma Rodriguez", role: "CFO", bio: "Expert in financial strategy and risk management" }
  ];

  return (
    <PageLayout 
      title="Who We Are" 
      subtitle="Get to know us better"
    >
      {/* Mission Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white mb-12">
        <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
        <p className="text-blue-100 text-lg">
          At Capital Haven, we're committed to making banking simpler, faster, and more secure for everyone. 
          We combine cutting-edge technology with financial expertise to deliver innovative solutions that 
          help our customers achieve their financial goals.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-2 rounded-full mr-4">
                {stat.icon}
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* History Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Story</h2>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="space-y-4 text-gray-700">
            <p>
              Founded in 2010, Capital Haven began as a small community bank with a vision to 
              revolutionize personal finance. Today, we've grown into a global financial institution 
              serving millions of customers while maintaining our commitment to personalized service.
            </p>
            <p>
              Our digital transformation in 2018 marked a turning point, allowing us to combine 
              traditional banking values with modern technology. This unique approach has earned us 
              numerous industry awards and recognition as one of the most innovative banks in the world.
            </p>
            <p>
              What sets us apart is our customer-first philosophy. Every product we develop and every 
              service we offer is designed with one question in mind: How does this make our customers' 
              financial lives better?
            </p>
          </div>
        </div>
      </div>

      {/* Leadership Team */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Leadership Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {team.map((member, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300">
              <div className="bg-blue-100 h-40 rounded-lg mb-4 flex items-center justify-center">
                <div className="bg-blue-600 text-white rounded-full w-20 h-20 flex items-center justify-center text-2xl font-bold">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
              <p className="text-blue-600 mb-2">{member.role}</p>
              <p className="text-gray-600">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Values Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <FiShield className="text-blue-600 mr-2" /> Security First
            </h3>
            <p className="text-gray-600">
              We prioritize the safety of your assets and data with bank-level encryption and 
              continuous monitoring systems.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <FiUsers className="text-blue-600 mr-2" /> Customer Focus
            </h3>
            <p className="text-gray-600">
              Every decision we make is guided by what's best for our customers. Your success is our success.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <FiAward className="text-blue-600 mr-2" /> Excellence
            </h3>
            <p className="text-gray-600">
              We strive for excellence in everything we do, from customer service to financial products.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <FiGlobe className="text-blue-600 mr-2" /> Global Perspective
            </h3>
            <p className="text-gray-600">
              We think globally to bring you the best financial solutions from around the world.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default AboutUs;
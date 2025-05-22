import React from 'react';
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';

const Footer = () => {
  const links = [
    {
      title: "Products",
      items: ["Investments", "Loans", "Insurance"]
    },
    // {
    //   title: "Company",
    //   items: ["About Us", "Careers", "Press", "Blog", "Contact"]
    // },
    // {
    //   title: "Resources",
    //   items: ["Help Center", "Security", "Privacy", "Terms", "FAQ"]
    // }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2">
            <h3 className="text-2xl font-bold mb-4">Capital Haven</h3>
            <p className="text-gray-400 mb-6">
              The modern banking platform that helps you save, spend, and invest smarter.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com" target='blank'  className="text-gray-400 hover:text-white transition duration-300">
                <FiFacebook size={20} />
              </a>
              <a href="https://www.x.com" target='blank'  className="text-gray-400 hover:text-white transition duration-300">
                <FiTwitter size={20} />
              </a>
              <a href="https://www.instagram.com" target='blank' className="text-gray-400 hover:text-white transition duration-300">
                <FiInstagram size={20} />
              </a>
              <a href="https://www.linkedin.com" target='blank'  className="text-gray-400 hover:text-white transition duration-300">
                <FiLinkedin size={20} />
              </a>
            </div>
          </div>
          
          {links.map((link, index) => (
            <div key={index}>
              <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">{link.title}</h4>
              <ul className="space-y-2">
                {link.items.map((item, i) => (
                  <li key={i}>
                    <a href="/investments" className="text-gray-400 hover:text-white transition duration-300">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          <div>
            <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Get the App</h4>
            <div className="space-y-3">
              <a href="/" className="block bg-gray-800 hover:bg-gray-700 transition duration-300 rounded-lg p-2 text-center">
                App Store
              </a>
              <a href="/" className="block bg-gray-800 hover:bg-gray-700 transition duration-300 rounded-lg p-2 text-center">
                Google Play
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Capital Haven. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/privacy" className="text-gray-400 hover:text-white text-sm transition duration-300">Privacy Policy</a>
              <a href="/terms" className="text-gray-400 hover:text-white text-sm transition duration-300">Terms of Service</a>
              <a href="/about-us" className="text-gray-400 hover:text-white text-sm transition duration-300">About Us</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
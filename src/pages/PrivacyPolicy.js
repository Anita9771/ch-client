import React from 'react';
import {PageLayout} from '../components';
import { FiShield, FiLock, FiDatabase, FiUser } from 'react-icons/fi';

const PrivacyPolicy = () => {
  return (
    <PageLayout 
      title="Privacy Policy" 
      subtitle="How we protect and use your information"
    >
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6">
          <p className="text-gray-700 mb-6">
            Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <FiShield className="text-blue-600 mr-3" />
              Information We Collect
            </h2>
            <p className="text-gray-700 mb-6">
              We collect information to provide better services to all our users. This includes:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li>Personal identification information (Name, email, phone number, etc.)</li>
              <li>Financial information needed to provide our services</li>
              <li>Technical data about your device and how you use our services</li>
              <li>Location information (with your consent)</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <FiLock className="text-blue-600 mr-3" />
              How We Use Your Information
            </h2>
            <p className="text-gray-700 mb-6">
              Your information helps us to:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li>Provide and maintain our banking services</li>
              <li>Improve, personalize, and expand our services</li>
              <li>Develop new products and features</li>
              <li>Communicate with you about updates and security alerts</li>
              <li>Prevent fraud and enhance security</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <FiDatabase className="text-blue-600 mr-3" />
              Data Security
            </h2>
            <p className="text-gray-700 mb-6">
              We implement industry-standard security measures including:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li>256-bit SSL encryption for all data transmissions</li>
              <li>Regular security audits and penetration testing</li>
              <li>Multi-factor authentication options</li>
              <li>Secure data storage with strict access controls</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <FiUser className="text-blue-600 mr-3" />
              Your Rights
            </h2>
            <p className="text-gray-700 mb-6">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li>Access, correct, or delete your personal information</li>
              <li>Object to or restrict certain data processing</li>
              <li>Receive your data in a portable format</li>
              <li>Withdraw consent at any time</li>
            </ul>

            <div className="bg-blue-50 p-6 rounded-lg mt-8">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Contact Us</h3>
              <p className="text-blue-700">
                For any privacy-related questions or concerns, please contact our Data Protection Officer at:
                <br />
                <a href="mailto:privacy@capitalhaven.com" className="text-blue-600 hover:underline">
                  privacy@capitalhaven.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default PrivacyPolicy;
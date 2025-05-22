import React from 'react';
import { PageLayout } from '../components';
import { FiFileText, FiAlertTriangle, FiCreditCard, FiGlobe } from 'react-icons/fi';

const TermsConditions = () => {
  return (
    <PageLayout 
      title="Terms & Conditions" 
      subtitle="The legal agreement between you and Capital Haven Bank"
    >
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6">
          <p className="text-gray-700 mb-6">
            Effective Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <FiFileText className="text-blue-600 mr-3" />
              Account Terms
            </h2>
            <p className="text-gray-700 mb-6">
              By opening an account with Capital Haven Bank, you agree to:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Notify us immediately of any unauthorized account activity</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <FiCreditCard className="text-blue-600 mr-3" />
              Banking Services
            </h2>
            <p className="text-gray-700 mb-6">
              Our banking services are subject to the following conditions:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li>Transactions may be subject to processing times and limits</li>
              <li>We reserve the right to refuse any transaction</li>
              <li>Fees may apply for certain services (see Fee Schedule)</li>
              <li>Interest rates are variable and subject to change</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <FiAlertTriangle className="text-blue-600 mr-3" />
              Limitations of Liability
            </h2>
            <p className="text-gray-700 mb-6">
              Capital Haven Bank shall not be liable for:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li>Indirect, incidental, or consequential damages</li>
              <li>Losses due to circumstances beyond our reasonable control</li>
              <li>Unauthorized access due to compromised credentials</li>
              <li>Third-party services integrated with our platform</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <FiGlobe className="text-blue-600 mr-3" />
              Governing Law
            </h2>
            <p className="text-gray-700 mb-6">
              These terms shall be governed by and construed in accordance with the laws of the State of New York, 
              without regard to its conflict of law provisions.
            </p>

            <div className="bg-blue-50 p-6 rounded-lg mt-8">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Changes to Terms</h3>
              <p className="text-blue-700">
                We may modify these terms at any time. Continued use of our services after changes constitutes 
                acceptance of the new terms. You will be notified of significant changes via email or through 
                our banking platform.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default TermsConditions;
import React from 'react';

const PageLayout = ({ title, subtitle, children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
            {subtitle && <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>}
          </div>
          {children}
        </div>
      </main>
    </div>
  );
};

export default PageLayout;
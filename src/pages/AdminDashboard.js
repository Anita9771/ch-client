import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { getToken } from '../utils/auth';
import {
  WithdrawalRequests,
  CreditRequests,
  CryptoRequests,
  UserManagement,
  TransferRequests,
} from '../components';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('transfers');
  const [adminInfo, setAdminInfo] = useState({
    name: 'Admin',
    lastLogin: '',
  });

  // Fetch admin info including last login on mount
  // useEffect(() => {
  //   const fetchAdminInfo = async () => {
  //     try {
  //       const res = await axios.get('/api/admin/info', {
  //         headers: { Authorization: `Bearer ${getToken()}` },
  //       });
  //       setAdminInfo({
  //         name: res.data.name || 'Admin',
  //         lastLogin: res.data.lastLogin || 'Unknown',
  //       });
  //     } catch (err) {
  //       console.error('Failed to fetch admin info:', err);
  //       // Optionally handle error (e.g. logout if unauthorized)
  //     }
  //   };
  //   fetchAdminInfo();
  // }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/login'; // Or use your router's redirect method
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'transfers':
        return <TransferRequests />;
      case 'crypto':
        return <CryptoRequests />;
      case 'users':
        return <UserManagement />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-3 sm:space-y-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Welcome Admin</h1>
          {/* <p className="text-sm text-gray-500">Last login: {adminInfo.lastLogin}</p> */}
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded w-full sm:w-auto"
        >
          Logout
        </button>
      </div>

      <div className="mb-4 border-b border-gray-200 overflow-x-auto">
        <nav className="-mb-px flex space-x-4 sm:space-x-8 min-w-max">
          <button
            className={`whitespace-nowrap pb-3 px-3 border-b-2 font-medium text-sm ${
              activeTab === 'transfers'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('transfers')}
          >
            Withdrawal Requests
          </button>
          <button
            className={`whitespace-nowrap pb-3 px-3 border-b-2 font-medium text-sm ${
              activeTab === 'crypto'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('crypto')}
          >
            Crypto Requests
          </button>
          <button
            className={`whitespace-nowrap pb-3 px-3 border-b-2 font-medium text-sm ${
              activeTab === 'users'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('users')}
          >
            User Management
          </button>
        </nav>
      </div>

      <div>{renderTabContent()}</div>
    </div>
  );
};

export default AdminDashboard;

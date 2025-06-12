import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Register,
  Login,
  Dashboard,
  AdminDashboard,
  // NewTransaction,
  // AdminTransactions,
  Landing,
  AboutUs,
  Investments,
  PrivacyPolicy,
  TermsConditions,
  AdminLogin,
} from "./pages";
import { Navbar, Footer, ProtectedRoute,
  NotFound, AdminProtectedRoute, 
  ForgotPassword,
  ResetPassword} from "./components";
import "./index.css";
import React, {useEffect, useState} from "react";

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Check authentication status (example)
useEffect(() => {
  const token = localStorage.getItem('token') || localStorage.getItem('adminToken');
  setIsAuthenticated(!!token);
}, []);

  // In your parent component (e.g., App.js, Layout.js)
const handleLogout = () => {
  // 1. Clear authentication tokens
  localStorage.removeItem('token');          // For regular users
  localStorage.removeItem('adminToken');    // For admins
  
  // 2. Clear any user data from state/context if using
  // setUser(null);
  // setAdmin(null);
  
  // 3. Redirect to login page
  window.location.href = '/login'; // Simple redirect
  // Or better with React Router:
  // navigate('/login');
};

  return (
    <div className="App">
      <Router>
        <Navbar  isAuthenticated={true} isAdmin={true} onLogout={handleLogout}  />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/forgot-password" element={<ForgotPassword/>} />
          <Route
            path="/reset-password/:token"
            element={<ResetPassword />}
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
               </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <AdminProtectedRoute>
                <AdminDashboard />
               </AdminProtectedRoute>
            }
          />
          <Route
            path="/investments"
            element={
              // <ProtectedRoute>
                <Investments />
              // </ProtectedRoute>
            }
          />
          {/* <Route
            path="/new-transaction"
            element={
              // <ProtectedRoute>
                // <NewTransaction />
              // </ProtectedRoute>
            }
          /> */}
          {/* <Route
            path="/admin/transactions"
            element={
              // <ProtectedRoute>
                <AdminTransactions />
              // </ProtectedRoute>
            }
          /> */}
           <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

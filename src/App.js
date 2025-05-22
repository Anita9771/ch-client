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
  NotFound, } from "./components";
import "./index.css";
import React from "react";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/dashboard"
            element={
              // <ProtectedRoute>
                <Dashboard />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              // <ProtectedRoute>
                <AdminDashboard />
              // </ProtectedRoute>
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

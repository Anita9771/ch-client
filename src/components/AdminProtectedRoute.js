import { Navigate } from "react-router-dom";
import { isAdminAuthenticated } from "../utils/auth";
import { useEffect, useState } from "react";

const AdminProtectedRoute = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication when component mounts
    const checkAuth = async () => {
      const authStatus = await isAdminAuthenticated();
      setAuthenticated(authStatus);
      setLoading(false);
    };
    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // or a spinner
  }

  console.log('Auth status:', authenticated); // Debug log

  return authenticated ? children : <Navigate to="/admin/login" replace />;
};

export default AdminProtectedRoute;
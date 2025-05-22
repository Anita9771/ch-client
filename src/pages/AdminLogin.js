import { useState } from "react";
import axios from "../api/axios";
import { FiArrowRight, FiEye, FiEyeOff, FiLock, FiUser } from 'react-icons/fi';

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/admin-login", { username, password });
      localStorage.setItem("adminToken", res.data.token);
      localStorage.setItem("adminRole", res.data.role);
      setMsg("Admin authentication successful!");
      setTimeout(() => {
        window.location.href = "/admin/dashboard";
      }, 1500);
    } catch (err) {
      setMsg(err.response?.data?.message || "Admin login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 mb-10 p-6 border rounded-lg shadow-lg bg-white">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Admin Portal</h2>
        <p className="text-gray-600 mt-2">Restricted access to authorized personnel only</p>
      </div>

      <form onSubmit={handleAdminLogin} className="space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiUser className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Admin Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full pl-10 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiLock className="text-gray-400" />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 pr-10 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Authenticating...
            </>
          ) : 'Login as Admin'}
        </button>
      </form>

      {msg && (
        <p className={`mt-4 text-center text-sm ${
          msg.includes("failed") ? "text-red-600" : "text-green-600"
        }`}>
          {msg}
        </p>
      )}

      <div className="mt-6 text-center">
        <a
          href="/login"
          className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center justify-center"
        >
          <FiArrowRight className="transform rotate-180 mr-2" />
          Return to User Login
        </a>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200 text-center">
        <p className="text-xs text-gray-500">
          Unauthorized access to this system is prohibited and may be subject to legal action.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;

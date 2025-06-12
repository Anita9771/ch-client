import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { FiEye, FiEyeOff } from "react-icons/fi";

const ResetPassword = () => {
//   const { token } = useParams();
//   const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState({ text: "", isError: false });
  const [loading, setLoading] = useState(false);
  const { token } = useParams();
// const token = localStorage.getItem("token")
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  
  // Debugging logs
  useEffect(() => {
    console.log("Pathname:", window.location.pathname);
    console.log("Token from useParams():", token);
    
    if (!token) {
      console.error("No token found in URL");
      // Optional: redirect if no token
      navigate('/forgot-password');
    }
  }, [token, navigate]);
  
//   const handleReset = async (e) => {
//     e.preventDefault();
    
//     // Client-side validation
//     if (password.length < 8) {
//       setMsg({ text: "Password must be at least 8 characters", isError: true });
//       return;
//     }
    
//     if (password !== confirmPassword) {
//       setMsg({ text: "Passwords do not match", isError: true });
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.post(`/api/auth/reset-password/${token}`, { password });
//       setMsg({ text: response.data.message || "Password reset successful", isError: false });
//       setTimeout(() => navigate("/login"), 2000); // Redirect after success
//     } catch (err) {
//       setMsg({
//         text: err.response?.data?.message || "Reset failed. Please try again.",
//         isError: true
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

const handleReset = async (e) => {
  e.preventDefault();
  
  try {
    const response = await axios.post(
      `/api/auth/reset-password/${token}`,
      { password },
      { validateStatus: (status) => status < 500 } // 🔥 Accept 400 as response
    );

    if (response.data.success) {
      setMsg({ text: response.data.message, isError: false });
      navigate('/login'); // Redirect on success
      localStorage.removeItem('token'); // Clear token from local storage
    } else {
      setMsg({ text: response.data.message, isError: true });
    }
    
  } catch (err) {
    setMsg({ 
      text: err.response?.data?.message || "Request failed", 
      isError: true 
    });
  }
};

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-lg font-bold mb-4">Reset Password</h2>
      <form onSubmit={handleReset} className="space-y-4">
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New Password (min 8 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 pr-10 border rounded"
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
        
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 pr-10 border rounded"
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>

        <button 
          type="submit" 
          className="w-full bg-green-500 text-white p-2 rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Processing..." : "Reset Password"}
        </button>
        
        {msg.text && (
          <p className={`text-sm text-center mt-4 ${
            msg.isError ? "text-red-600" : "text-green-600"
          }`}>
            {msg.text}
          </p>
        )}
      </form>
    </div>
  );
};

export default ResetPassword;
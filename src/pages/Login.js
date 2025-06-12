import { useState } from "react";
import axios from "../api/axios";
import { FiArrowRight, FiEye, FiEyeOff } from "react-icons/fi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState({ text: "", isError: false });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/login", { email, password });
      setShowOtp(true);
      setMsg("OTP sent to email.");
    } catch (err) {
      setMsg(err.response?.data?.message || "Login failed");
    }
  };

  const handleOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/verify-otp", { email, otp });
      localStorage.setItem("token", res.data.token);
      setMsg("Login successful!");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2000);
    } catch (err) {
      setMsg(err.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 mb-10 p-4 border rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={showOtp ? handleOtp : handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
        />

        {!showOtp && (
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 pr-10 border rounded"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        )}

        {showOtp && (
          <input
            type="text"
            placeholder="Enter OTP"
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-2 border rounded"
          />
        )}

        {showOtp && (
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={async () => {
                try {
                  await axios.post("/api/auth/resend-otp", { email });
                  setMsg("OTP resent successfully.");
                } catch (err) {
                  setMsg("Failed to resend OTP.");
                }
              }}
              className="text-sm text-blue-600 underline"
            >
              Resend OTP
            </button>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          {showOtp ? "Verify OTP" : "Login"}
        </button>
      </form>

   {msg.text && (
          <p className={`text-sm text-center mt-4 ${
            msg.isError ? "text-red-600" : "text-green-600"
          }`}>
            {msg.text}
          </p>
        )}

      {/* Add forgot password link */}
      <div className="text-right mt-2">
        <a href="/forgot-password" className="text-sm text-blue-600 underline">
          Forgot Password?
        </a>
      </div>

      <p className="my-10 text-center text-sm text-green-600">
        <a
          href="/admin/login"
          className="bg-white text-blue-600 px-6 py-4 font-medium text-center flex items-center justify-center"
        >
          Sign In as Admin <FiArrowRight className="ml-2" />
        </a>
      </p>
    </div>
  );
};

export default Login;

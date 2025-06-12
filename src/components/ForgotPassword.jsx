import { useState } from "react";
import axios from "../api/axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
   const [msg, setMsg] = useState({ text: "", isError: false });

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/forgot-password", { email });
      setMsg("Password reset instructions sent to your email.");
    } catch (err) {
      setMsg("Failed to send reset email.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
      <form onSubmit={handleReset} className="space-y-4">
        <input
          type="email"
          placeholder="Enter your email"
          onChange={e => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Send Reset Link
        </button>
      </form>
       {msg.text && (
          <p className={`text-sm text-center mt-4 ${
            msg.isError ? "text-red-600" : "text-green-600"
          }`}>
            {msg.text}
          </p>
        )}
    </div>
  );
};

export default ForgotPassword;

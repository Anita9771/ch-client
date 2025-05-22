import { useEffect, useState } from "react";
import axios from "../api/axios";
import { FiUser } from "react-icons/fi";

const AccountSummary = () => {
  const [summary, setSummary] = useState({
    balance: 0,
    crypto: {},
    name: "",
    email: "",
  });
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch both data in parallel
        const [summaryRes, profileRes] = await Promise.all([
          axios.get("/api/account/summary", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }),
          axios.get("/api/user/profile", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }),
        ]);
        setSummary(summaryRes.data);
        setProfile(profileRes.data);
      } catch (err) {
        console.error("Failed to fetch data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // Adjust if using a router
  };

  if (loading) return <p>Loading account data...</p>;

  return (
    <div className="bg-white p-6 rounded shadow mb-4 space-y-6">
      {/* Profile and Logout */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <FiUser className="text-blue-600 text-xl" />
          </div>
          <div>
            <p className="text-lg font-semibold">{summary.name || profile?.name || "User"}</p>
            <p className="text-sm text-gray-600">{summary.email || profile?.email || "user@example.com"}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded w-full sm:w-auto"
        >
          Logout
        </button>
      </div>

      {/* User Profile Details */}
      {profile && (
        <div>
          <h2 className="text-lg font-semibold mb-2">User Profile</h2>
          <ul className="space-y-2">
            <li>
              <strong>Name:</strong> {profile.name}
            </li>
            <li>
              <strong>Email:</strong> {profile.email}
            </li>
            <li>
              <strong>Username:</strong> {profile.username}
            </li>
            <li>
              <strong>Registered:</strong>{" "}
              {new Date(profile.createdAt).toLocaleDateString()}
            </li>
          </ul>
        </div>
      )}

      {/* Account Summary */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Account Summary</h2>
        <p className="mb-2">Main Balance: ${summary.balance.toFixed(2)}</p>

        <div>
          <h3 className="font-medium mb-2">Crypto Holdings:</h3>
          {Object.keys(summary.crypto).length > 0 ? (
            <ul className="list-disc pl-6">
              {Object.entries(summary.crypto).map(([key, value]) => (
                <li key={key}>
                  {key.toUpperCase()}: {value}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">No crypto holdings available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountSummary;

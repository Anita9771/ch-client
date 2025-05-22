import { useEffect, useState } from "react";
import axios from "../api/axios";
import { getToken } from "../utils/auth";

const CreditRequests = () => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const res = await axios.get("/api/admin/credits", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setRequests(res.data);
    } catch (error) {
      console.error("Failed to fetch credit requests", error);
    }
  };

  const handleAccept = async (id) => {
    try {
      await axios.post(
        `/api/admin/credits/accept/${id}`,
        {},
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      fetchRequests();
    } catch (error) {
      console.error("Error accepting credit request:", error);
    }
  };

  const handleDecline = async (id) => {
    try {
      await axios.post(
        `/api/admin/credits/decline/${id}`,
        {},
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      fetchRequests();
    } catch (error) {
      console.error("Error declining credit request:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Credit Requests</h2>
      <div className="overflow-x-auto">
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">User</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id} className="text-center">
                <td className="p-2 border">{req.userEmail}</td>
                <td className="p-2 border">${req.amount}</td>
                <td className="p-2 border">{req.status}</td>
                <td className="p-2 border">
                  {new Date(req.date).toLocaleDateString()}
                </td>
                <td className="p-2 border space-x-2">
                  {req.status === "pending" ? (
                    <>
                      <button
                        onClick={() => handleAccept(req._id)}
                        className="bg-green-500 text-white px-2 py-1 rounded"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleDecline(req._id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Decline
                      </button>
                    </>
                  ) : (
                    <span className="text-gray-500">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CreditRequests;

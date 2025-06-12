import { useEffect, useState } from "react";
import axios from "../api/axios";
import { getToken } from "../utils/auth";

const WithdrawalRequests = () => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const res = await axios.get("/api/admin/withdrawals", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setRequests(res.data);
    } catch (error) {
      console.error("Failed to fetch withdrawal requests", error);
    }
  };

  const handleAccept = async (id) => {
    try {
      await axios.post(
        `/api/admin/withdrawals/accept/${id}`,
        {},
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      fetchRequests(); // refresh list
    } catch (error) {
      console.error("Error accepting withdrawal:", error);
    }
  };

  const handleDecline = async (id) => {
    try {
      await axios.post(
        `/api/admin/withdrawals/decline/${id}`,
        {},
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      fetchRequests(); // refresh list
    } catch (error) {
      console.error("Error declining withdrawal:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Withdrawal Requests</h2>
      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100 text-sm">
              <th className="p-2 border">User</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Account Name</th>
              <th className="p-2 border">Account Number</th>
              <th className="p-2 border">Bank Name</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id} className="text-sm text-center">
                <td className="p-2 border">{req.firstName} {req.lastName}</td>
                <td className="p-2 border">${req.amount}</td>
                <td className="p-2 border">{req.accountName || "—"}</td>
                <td className="p-2 border">{req.accountNumber || "—"}</td>
                <td className="p-2 border">{req.bankName || "—"}</td>
                <td className="p-2 border">{req.status}</td>
                <td className="p-2 border">{new Date(req.date).toLocaleDateString()}</td>
                <td className="p-2 border space-x-2">
                  {req.status === "pending" && (
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
                  )}
                  {req.status !== "pending" && <span className="text-gray-500">—</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WithdrawalRequests;

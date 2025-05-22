// src/components/TransferRequests.jsx
import { useEffect, useState } from "react";
import axios from "../api/axios";
import { getToken } from "../utils/auth";

const TransferRequests = () => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [credits, setCredits] = useState([]);

  // FETCH FUNCTIONS
  const fetchWithdrawals = async () => {
    try {
      const res = await axios.get("/api/admin/withdrawals", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setWithdrawals(res.data);
    } catch (error) {
      console.error("Failed to fetch withdrawal requests", error);
    }
  };

  const fetchCredits = async () => {
    try {
      const res = await axios.get("/api/admin/credits", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setCredits(res.data);
    } catch (error) {
      console.error("Failed to fetch credit requests", error);
    }
  };

  // ACTION HANDLERS
  const handleWithdrawalAction = async (id, action) => {
    try {
      await axios.post(`/api/admin/withdrawals/${action}/${id}`, {}, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      fetchWithdrawals();
    } catch (error) {
      console.error(`Error ${action}ing withdrawal:`, error);
    }
  };

  const handleCreditAction = async (id, action) => {
    try {
      await axios.post(`/api/admin/credits/${action}/${id}`, {}, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      fetchCredits();
    } catch (error) {
      console.error(`Error ${action}ing credit:`, error);
    }
  };

  useEffect(() => {
    fetchWithdrawals();
    fetchCredits();
  }, []);

  return (
    <div className="space-y-8">
      {/* WITHDRAWALS TABLE */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Withdrawal Requests</h2>
        <div className="overflow-x-auto">
          <table className="w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
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
              {withdrawals.map((req) => (
                <tr key={req._id} className="text-center">
                  <td className="p-2 border">{req.userEmail}</td>
                  <td className="p-2 border">${req.amount}</td>
                  <td className="p-2 border">{req.accountName || "—"}</td>
                  <td className="p-2 border">{req.accountNumber || "—"}</td>
                  <td className="p-2 border">{req.bankName || "—"}</td>
                  <td className="p-2 border">{req.status}</td>
                  <td className="p-2 border">
                    {new Date(req.date).toLocaleDateString()}
                  </td>
                  <td className="p-2 border space-x-2">
                    {req.status === "pending" ? (
                      <>
                        <button
                          onClick={() => handleWithdrawalAction(req._id, "accept")}
                          className="bg-green-500 text-white px-2 py-1 rounded"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleWithdrawalAction(req._id, "decline")}
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

      {/* CREDITS TABLE */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Credit Requests</h2>
        <div className="overflow-x-auto">
          <table className="w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">User</th>
                <th className="p-2 border">Amount</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {credits.map((req) => (
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
                          onClick={() => handleCreditAction(req._id, "accept")}
                          className="bg-green-500 text-white px-2 py-1 rounded"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleCreditAction(req._id, "decline")}
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
    </div>
  );
};

export default TransferRequests;

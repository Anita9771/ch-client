import { useEffect, useState } from "react";
import axios from "../api/axios";
import { getToken } from "../utils/auth";

const CryptoRequests = () => {
  const [sendingRequests, setSendingRequests] = useState([]);
  const [receivingRequests, setReceivingRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const res = await axios.get("/api/admin/crypto-requests", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      // Separate by type
      const send = res.data.filter((r) => r.type === "send");
      const receive = res.data.filter((r) => r.type === "receive");

      setSendingRequests(send);
      setReceivingRequests(receive);
    } catch (error) {
      console.error("Failed to fetch crypto requests", error);
    }
  };

  const handleAction = async (id, type, action) => {
    try {
      await axios.post(
        `/api/admin/crypto-requests/${action}/${id}`,
        {},
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      fetchRequests();
    } catch (err) {
      console.error(`${action} failed:`, err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="space-y-12">
      {/* Crypto Sending Table */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Crypto Sending Requests</h2>
        <div className="overflow-x-auto">
          <table className="w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">User</th>
                <th className="p-2 border">Amount</th>
                <th className="p-2 border">Crypto</th>
                <th className="p-2 border">Network</th>
                <th className="p-2 border">Wallet Address</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sendingRequests.map((req) => (
                <tr key={req._id} className="text-center">
                  <td className="p-2 border">{req.userEmail}</td>
                  <td className="p-2 border">{req.amount}</td>
                  <td className="p-2 border">{req.currency.toUpperCase()}</td>
                  <td className="p-2 border">{req.network}</td>
                  <td className="p-2 border break-all">{req.walletAddress}</td>
                  <td className="p-2 border">{req.status}</td>
                  <td className="p-2 border">{new Date(req.date).toLocaleDateString()}</td>
                  <td className="p-2 border space-x-2">
                    {req.status === "pending" ? (
                      <>
                        <button
                          onClick={() => handleAction(req._id, "send", "accept")}
                          className="bg-green-500 text-white px-2 py-1 rounded"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleAction(req._id, "send", "decline")}
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

      {/* Crypto Receiving Table */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Crypto Receiving Requests</h2>
        <div className="overflow-x-auto">
          <table className="w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">User</th>
                <th className="p-2 border">Amount</th>
                <th className="p-2 border">Crypto</th>
                <th className="p-2 border">Network</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {receivingRequests.map((req) => (
                <tr key={req._id} className="text-center">
                  <td className="p-2 border">{req.userEmail}</td>
                  <td className="p-2 border">{req.amount}</td>
                  <td className="p-2 border">{req.currency.toUpperCase()}</td>
                  <td className="p-2 border">{req.network}</td>
                  <td className="p-2 border">{req.status}</td>
                  <td className="p-2 border">{new Date(req.date).toLocaleDateString()}</td>
                  <td className="p-2 border space-x-2">
                    {req.status === "pending" ? (
                      <>
                        <button
                          onClick={() => handleAction(req._id, "receive", "accept")}
                          className="bg-green-500 text-white px-2 py-1 rounded"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleAction(req._id, "receive", "decline")}
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

export default CryptoRequests;

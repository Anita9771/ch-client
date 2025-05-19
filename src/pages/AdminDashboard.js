import { useEffect, useState } from "react";
import axios from "../api/axios";
import { getToken } from "../utils/auth";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await axios.get("/api/admin/users", {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    setUsers(res.data);
  };

  const approveUser = async (id) => {
    await axios.put(`/api/admin/approve/${id}`, {}, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    fetchUsers(); // refresh list
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Admin Dashboard</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Approved</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border">{user.category}</td>
              <td className="p-2 border">{user.approved ? "Yes" : "No"}</td>
              <td className="p-2 border">
                {!user.approved && (
                  <button
                    onClick={() => approveUser(user._id)}
                    className="bg-green-500 text-white px-2 py-1 rounded"
                  >
                    Approve
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;

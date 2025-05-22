import { useEffect, useState } from "react";
import axios from "../api/axios";
import { getToken } from "../utils/auth";

const UserManagement = () => {
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
    fetchUsers();
  };

  const updateCategory = async (id, category) => {
    await axios.put(`/api/admin/category/${id}`, { category }, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    fetchUsers();
  };

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await axios.delete(`/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      fetchUsers();
    }
  };

  const blockUser = async (id) => {
    await axios.put(`/api/admin/block/${id}`, {}, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const getBadgeClass = (category) => {
    switch (category?.toLowerCase()) {
      case 'gold':
        return 'bg-yellow-100 text-yellow-800';
      case 'silver':
        return 'bg-gray-100 text-gray-800';
      case 'platinum':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-200 text-gray-700';
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">User Management</h2>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Approved</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="text-center">
                <td className="p-2 border">{user.name}</td>
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border">{user.approved ? "✅" : "❌"}</td>
                <td className="p-2 border space-y-1">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getBadgeClass(user.category)}`}
                  >
                    {user.category || 'None'}
                  </span>
                  <select
                    value={user.category}
                    onChange={(e) => updateCategory(user._id, e.target.value)}
                    className="mt-1 p-1 rounded border bg-white w-full"
                  >
                    <option value="">None</option>
                    <option value="gold">Gold</option>
                    <option value="silver">Silver</option>
                    <option value="platinum">Platinum</option>
                  </select>
                </td>
                <td className="p-2 border space-y-1 sm:space-x-2 sm:space-y-0 sm:flex sm:justify-center sm:items-center">
                  {!user.approved && (
                    <button
                      onClick={() => approveUser(user._id)}
                      className="bg-green-500 text-white px-2 py-1 rounded w-full sm:w-auto"
                    >
                      Approve
                    </button>
                  )}
                  <button
                    onClick={() => blockUser(user._id)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded w-full sm:w-auto"
                  >
                    Block
                  </button>
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="bg-red-600 text-white px-2 py-1 rounded w-full sm:w-auto"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;

import { useEffect, useState } from "react";
import axios from "../api/axios";
import { getToken } from "../utils/auth";

const AdminSummary = () => {
  const [admin, setAdmin] = useState({ name: "", lastLogin: "" });

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const res = await axios.get("/api/admin/profile", {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        setAdmin(res.data);
      } catch (err) {
        console.error("Failed to fetch admin info");
      }
    };
    fetchAdminData();
  }, []);

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-2 text-blue-700">Admin Information</h2>
      <p><strong>Name:</strong> {admin.name}</p>
      <p><strong>Last Login:</strong> {new Date(admin.lastLogin).toLocaleString()}</p>
    </div>
  );
};

export default AdminSummary;

// src/components/ProfileTab.jsx
import { useEffect, useState } from "react";
import axios from "../api/axios";

const ProfileTab = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/api/user/profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setProfile(res.data);
      } catch (err) {
        console.error("Failed to fetch profile", err);
      }
    };
    fetchProfile();
  }, []);

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">User Profile</h2>
      <ul className="space-y-2">
        <li><strong>Name:</strong> {profile.name}</li>
        <li><strong>Email:</strong> {profile.email}</li>
        <li><strong>Username:</strong> {profile.username}</li>
        <li><strong>Registered:</strong> {new Date(profile.createdAt).toLocaleDateString()}</li>
      </ul>
    </div>
  );
};

export default ProfileTab;

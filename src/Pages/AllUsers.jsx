import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "../Pages/AdminDashboard";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("No token found. Please log in again.");
        navigate("/login");
        return;
      }

      try {
        const backendUrl = "https://event-management-system-backend-zg2b.onrender.com";
        const response = await axios.get(`${backendUrl}/api/users/all-users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data && Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          throw new Error("Users data is not in the expected format.");
        }
      } catch (err) {
        if (err.response?.status === 401) {
          toast.error("Unauthorized: Invalid or expired token.");
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          setError(
            err.response?.data?.message ||
              err.message ||
              "Failed to load users!"
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [navigate]);

  const deleteUser = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const backendUrl = "https://event-management-system-backend-zg2b.onrender.com";

      await axios.delete(`${backendUrl}/api/users/delete/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(users.filter((user) => user._id !== userId));
      toast.success("User deleted successfully!");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to delete user!";
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <AdminDashboard />
      <div className="p-5">
        <h1 className="text-2xl font-bold text-center mb-5">All Users</h1>

        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : users.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2">Name</th>
                  <th className="border border-gray-300 px-4 py-2">Email</th>
                  <th className="border border-gray-300 px-4 py-2">Role</th>
                  <th className="border border-gray-300 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="text-center">
                    <td className="border border-gray-300 px-4 py-2">
                      {user.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {user.email}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {user.role}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                        onClick={() => deleteUser(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center">No users available</p>
        )}
      </div>
    </>
  );
};

export default AllUsers;

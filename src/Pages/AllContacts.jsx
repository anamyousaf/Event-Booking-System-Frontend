import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AdminDashboard from "./AdminDashboard";

const AllContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const backendUrl = "https://event-management-system-backend-zg2b.onrender.com";

        const token = localStorage.getItem("token");

        // Make the request with Authorization header
        const response = await axios.get(`${backendUrl}/contact/get-contacts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setContacts(response.data.contacts);
        setLoading(false);
      } catch (err) {
        console.error(
          "Error fetching contacts:",
          err.response?.data || err.message
        );
        setError("Failed to fetch contacts!");
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const handleDeleteContact = async (id) => {
    try {
      const backendUrl = "https://event-management-system-backend-zg2b.onrender.com";

      // Retrieve the token from localStorage
      const token = localStorage.getItem("token");

      // Include the token in the delete request
      await axios.delete(`${backendUrl}/contact/del-contact/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setContacts(contacts.filter((contact) => contact._id !== id));
      toast.success("Contact deleted successfully.");
    } catch (err) {
      console.error(
        "Error deleting contact:",
        err.response?.data || err.message
      );
      toast.error("Failed to delete contact.");
    }
  };

  return (
    <>
      <AdminDashboard />
      <div className="p-6">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
          Contacts
        </h1>

        {loading ? (
          <div className="flex justify-center items-center min-h-screen">
            <div className="loader"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 font-semibold">{error}</div>
        ) : contacts.length > 0 ? (
          <div className="flex items-center justify-center gap-7 flex-wrap">
            {contacts.map((contact) => (
              <div
                key={contact._id}
                className="relative w-[250px] h-[350px] bg-black flex flex-col justify-end p-4 gap-3 rounded-lg cursor-pointer group"
              >
                <h2 className="text-lg font-bold text-white">{contact.name}</h2>
                <p className="text-sm text-gray-300 font-semibold">
                  <strong>Email:</strong> {contact.email}
                </p>
                <p className="text-sm text-gray-300 font-semibold">
                  <strong>Phone:</strong> {contact.phone}
                </p>
                <p className="text-sm text-gray-300">
                  <strong>Message:</strong> {contact.message}
                </p>
                <p className="text-sm text-gray-300">
                  <strong>Created At:</strong>{" "}
                  {new Date(contact.createdAt).toLocaleString()}
                </p>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => handleDeleteContact(contact._id)}
                    className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg text-gray-600">
            No contacts available
          </p>
        )}
      </div>
    </>
  );
};

export default AllContacts;

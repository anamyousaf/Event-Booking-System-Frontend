import { useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AdminDashboard from "./AdminDashboard";

const AllEvents = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const backendUrl = "https://event-management-system-backend-zg2b.onrender.com";
        const token = localStorage.getItem("token");

        if (!token) {
          toast.error("Authentication token not found. Please log in again.");
          return;
        }

        const response = await axios.get(`${backendUrl}/api/events/get-all`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data && Array.isArray(response.data)) {
          setEvents(response.data);
        } else if (
          response.data.events &&
          Array.isArray(response.data.events)
        ) {
          setEvents(response.data.events);
        } else {
          console.error("Unexpected Response Format:", response.data);
        }
      } catch (err) {
        if (err.response && err.response.status === 401) {
          toast.error("Unauthorized access. Please log in again.");
          navigate("/login");
        } else {
          console.error("Error Fetching Events:", err.message || err);
          toast.error("Failed to fetch events.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [navigate]);

  const handleDelete = async (eventId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (!confirmDelete) return;

    try {
      const backendUrl = "https://event-management-system-backend-zg2b.onrender.com";
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Authentication token not found. Please log in again.");
        return;
      }

      const response = await axios.delete(
        `${backendUrl}/api/events/delete-event/${eventId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setEvents(events.filter((event) => event._id !== eventId));
        toast.success("Event deleted successfully!");
      } else {
        toast.error(response.data.msg || "Failed to delete event.");
      }
    } catch (err) {
      console.error("Delete Error:", err.response?.data || err.message);
      toast.error(err.response?.data?.msg || "Failed to delete event.");
    }
  };

  const handleUpdate = (event) => {
    navigate(`/event/update/${event._id}`, { state: { event } });
  };

  return (
    <>
      <AdminDashboard />
      <div className="p-5">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Our Events
        </h1>

        {loading ? (
          <div className="flex justify-center items-center min-h-screen">
            <div className="w-16 h-16 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
          </div>
        ) : events.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-gray-900 rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow"
              >
                <h2 className="text-xl font-bold text-white mb-3">
                  {event.title}
                </h2>
                {event.image && (
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 object-cover rounded-lg mb-3"
                  />
                )}
                <p className="text-gray-400 mb-2">
                  <strong>Description:</strong>{" "}
                  {event.description.length > 100
                    ? `${event.description.slice(0, 100)}...`
                    : event.description}
                </p>
                <p className="text-gray-400 mb-2">
                  <strong>Date:</strong>{" "}
                  {new Date(event.date).toLocaleDateString()}
                </p>
                <p className="text-gray-400 mb-2">
                  <strong>Location:</strong> {event.location}
                </p>
                <p className="text-gray-400 mb-2">
                  <strong>Capacity:</strong> {event.capacity}
                </p>
                <p className="text-gray-400 mb-2">
                  <strong>Status:</strong> {event.status}
                </p>
                <p className="text-gray-400 mb-2">
                  <strong>Price:</strong> ${event.price}
                </p>
                <div className="mt-4 flex justify-between gap-3">
                  <button
                    onClick={() => handleUpdate(event)}
                    className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(event._id)}
                    className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg text-gray-500">
            No events available at the moment.
          </p>
        )}
      </div>
    </>
  );
};

export default AllEvents;

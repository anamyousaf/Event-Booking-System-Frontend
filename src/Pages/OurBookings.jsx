import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminDashboard from "./AdminDashboard";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const OurBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate(); 

  // Fetch bookings from the API
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const backendUrl = "https://event-management-system-backend-zg2b.onrender.com"; 
        const token = localStorage.getItem("token"); 

        const response = await axios.get(`${backendUrl}/api/bookings/get-all`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (Array.isArray(response.data.bookings)) {
          setBookings(response.data.bookings);
        } else {
          setError("Invalid data format received from the server.");
        }
      } catch (err) {
        setError("Failed to load bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Handle Delete Booking
  const handleDelete = async (bookingId) => {
    try {
      const backendUrl = "https://event-management-system-backend-zg2b.onrender.com";
      const token = localStorage.getItem("token");

      await axios.delete(`${backendUrl}/api/bookings/delete/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking._id !== bookingId)
      );

      toast.success("Booking deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete booking.");
    }
  };

  // Navigate to Update Booking Page
  const handleUpdate = (bookingId) => {
    navigate(`/update-booking/${bookingId}`); 
  };

  return (
    <>
      {/* Admin Dashboard */}
      <AdminDashboard />
      <h1 className="text-3xl font-semibold text-center mb-6 text-blue-600">
        Our Bookings
      </h1>

      <div className="p-5 min-h-screen">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : bookings && bookings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="w-full max-w-[570px] rounded-[20px] bg-gray-900 py-6 px-4 text-center shadow-lg"
              >
                <h2 className="text-xl font-bold text-white mb-4">
                  Booking ID: {booking._id.slice(0, 4)}
                </h2>
                <span className="bg-indigo-500 mx-auto mb-4 inline-block h-1 w-[70px] rounded"></span>
                <p className="text-gray-400">
                  <strong>User Email:</strong>{" "}
                  {booking.user?.email || "Unknown User"}
                </p>
                <p className="text-gray-400">
                  <strong>Event Title:</strong> {booking.event?.title || "N/A"}
                </p>
                <p className="text-gray-400">
                  <strong>Status:</strong> {booking.status || "N/A"}
                </p>
                <p className="text-gray-400">
                  <strong>Total Amount:</strong> ${booking.totalAmount || "N/A"}
                </p>
                <p
                  className={`text-gray-400 ${
                    booking.paymentStatus === "completed"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  <strong>Payment Status:</strong>{" "}
                  {booking.paymentStatus || "N/A"}
                </p>
                <p className="text-gray-400">
                  <strong>Booked At:</strong>{" "}
                  {booking.bookedAt
                    ? new Date(booking.bookedAt).toLocaleString()
                    : "N/A"}
                </p>
                <div className="flex flex-wrap gap-3 justify-center mt-6">
                  <button
                    onClick={() => handleDelete(booking._id)}
                    className="text-white w-[45%] rounded-lg border border-gray-700 p-2 text-base font-medium transition hover:border-red-600 hover:bg-red-600"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleUpdate(booking._id)}
                    className="bg-indigo-500 border-indigo-500 w-[45%] rounded-lg border p-2 text-base font-medium text-white transition hover:bg-opacity-90"
                  >
                    Update
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg text-gray-600">
            No bookings available
          </p>
        )}
      </div>
    </>
  );
};

export default OurBookings;

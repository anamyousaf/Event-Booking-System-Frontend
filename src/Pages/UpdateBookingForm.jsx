import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateBookingForm = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const [data, setData] = useState({
    eventId: "",
    status: "pending",
    paymentStatus: "pending",
    totalAmount: 0,
  });

  const [availableEvents, setAvailableEvents] = useState([]);
  const [changeEvent, setChangeEvent] = useState(false); 
  const [currentEventName, setCurrentEventName] = useState(""); 
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const backendUrl = "https://event-management-system-backend-zg2b.onrender.com";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Unauthorized access. Please log in.");

        // Fetch booking details
        const bookingResponse = await axios.get(
          `${backendUrl}/api/bookings/booking/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const booking = bookingResponse.data.data;

        // Set booking data and current event name
        setData({
          eventId: booking.event?._id || "",
          status: booking.status || "pending",
          paymentStatus: booking.paymentStatus || "pending",
          totalAmount: booking.totalAmount || 0,
        });
        setCurrentEventName(
          `${booking.event?.title || "Unknown Event"} - ${
            booking.event?.date?.split("T")[0] || "No Date"
          }`
        );

        // Fetch available events
        const eventsResponse = await axios.get(
          `${backendUrl}/api/events/available`
        );
        setAvailableEvents(eventsResponse.data.events || []);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching booking data:", err.message);
        setError("Failed to fetch booking data.");
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields
    if (!data.eventId) {
      toast.error("Please select an event.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized access. Please log in.");

      await axios.put(`${backendUrl}/api/bookings/update-booking/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Booking updated successfully!");
      setTimeout(() => navigate("/all-bookings"), 2000); 
    } catch (err) {
      console.error("Error updating booking:", err.message);
      setError("Failed to update booking.");
      toast.error("Failed to update booking.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-700">Loading booking details...</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen py-10 bg-gray-50">
      <form
        className="border-2 border-gray-300 p-6 rounded-md shadow-xl w-full max-w-lg bg-white"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center font-bold text-2xl mb-5 text-indigo-600">
          Update Event Booking
        </h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Change Event Toggle */}
        <div className="mb-6">
          <label className="flex items-center space-x-3 text-sm font-medium text-gray-600">
            <input
              type="checkbox"
              checked={changeEvent}
              onChange={() => setChangeEvent(!changeEvent)}
              className="h-4 w-4 border-gray-300 rounded"
            />
            <span>Change Event</span>
          </label>
        </div>

        {/* Event Selection */}
        {!changeEvent ? (
          <div className="mb-6">
            <label className="mb-2 text-gray-600 text-sm font-medium">
              Current Event
            </label>
            <input
              type="text"
              value={currentEventName}
              className="block w-full h-11 px-5 py-2 bg-gray-100 border border-gray-300 rounded-md"
              readOnly
            />
          </div>
        ) : (
          <div className="mb-6">
            <label className="mb-2 text-gray-600 text-sm font-medium">
              Select New Event
            </label>
            <select
              name="eventId"
              value={data.eventId}
              onChange={handleChange}
              className="block w-full h-11 px-5 py-2 bg-white border border-gray-300 rounded-md"
              required
            >
              <option value="">Select an Event</option>
              {availableEvents.map((event) => (
                <option key={event._id} value={event._id}>
                  {event.title} - {event.date?.split("T")[0]} - ${event.price}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Status Dropdown */}
        <div className="mb-6">
          <label className="mb-2 text-gray-600 text-sm font-medium">
            Status
          </label>
          <select
            name="status"
            value={data.status}
            onChange={handleChange}
            className="block w-full h-11 px-5 py-2 bg-white border border-gray-300 rounded-md"
            required
          >
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Payment Status Dropdown */}
        <div className="mb-6">
          <label className="mb-2 text-gray-600 text-sm font-medium">
            Payment Status
          </label>
          <select
            name="paymentStatus"
            value={data.paymentStatus}
            onChange={handleChange}
            className="block w-full h-11 px-5 py-2 bg-white border border-gray-300 rounded-md"
            required
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        {/* Total Amount */}
        <div className="mb-6">
          <label className="mb-2 text-gray-600 text-sm font-medium">
            Total Amount
          </label>
          <input
            type="number"
            name="totalAmount"
            value={data.totalAmount}
            onChange={handleChange}
            className="block w-full h-11 px-5 py-2 bg-white border border-gray-300 rounded-md"
            placeholder="Enter total amount"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold rounded-md"
        >
          Update Booking
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default UpdateBookingForm;

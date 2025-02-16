import { useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const BookingForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    eventId: "",
    userEmail: "",
    userName: "",
    phone: "",
    totalAmount: 0,
    paymentStatus: "pending",
    notes: "",
  });

  const [availableEvents, setAvailableEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const backendUrl = "https://event-management-system-backend-zg2b.onrender.com";

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/events/available`);
        setAvailableEvents(response.data.events);
      } catch (error) {
        toast.error("No Events Available.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${backendUrl}/api/bookings/create-booking`,
        formData
      );

      if (response.status === 201) {
        toast.success("Booking created successfully!");
        navigate("/"); // Redirect to the home page
      }
    } catch (error) {
      toast.error("Failed to create booking.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Book an Event</h1>

        {/* Event Dropdown */}
        <div className="mb-4">
          <label
            htmlFor="eventId"
            className="block text-gray-700 font-bold mb-2"
          >
            Select Event
          </label>
          {loading ? (
            <p>Loading events...</p>
          ) : (
            <select
              id="eventId"
              name="eventId"
              value={formData.eventId}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 p-2 rounded"
            >
              <option value="" disabled>
                Choose an event
              </option>
              {availableEvents && availableEvents.length > 0 ? (
                availableEvents.map((event) => (
                  <option key={event._id} value={event._id}>
                    {event.title} - ${event.price}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  No events available
                </option>
              )}
            </select>
          )}
        </div>

        {/* User Name */}
        <div className="mb-4">
          <label
            htmlFor="userName"
            className="block text-gray-700 font-bold mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        {/* User Email */}
        <div className="mb-4">
          <label
            htmlFor="userEmail"
            className="block text-gray-700 font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="userEmail"
            name="userEmail"
            value={formData.userEmail}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">
            Phone
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        {/* Total Amount */}
        <div className="mb-4">
          <label
            htmlFor="totalAmount"
            className="block text-gray-700 font-bold mb-2"
          >
            Total Amount
          </label>
          <input
            type="number"
            id="totalAmount"
            name="totalAmount"
            value={formData.totalAmount}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        {/* Notes */}

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Book Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;

import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const UpdateEventForm = () => {
  const location = useLocation(); 
  const navigate = useNavigate();
  const { event } = location.state || {};

  const [updatedEvent, setUpdatedEvent] = useState({
    title: event?.title || "",
    description: event?.description || "",
    date: event?.date ? new Date(event.date).toISOString().split("T")[0] : "", 
    location: event?.location || "",
    capacity: event?.capacity || "",
    price: event?.price || "",
    status: event?.status || "upcoming",
  });

  const backendUrl = "https://event-management-system-backend-zg2b.onrender.com";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${backendUrl}/api/events/update-event/${event._id}`,
        updatedEvent,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        toast.success("Event updated successfully!");
        navigate("/all-events");
      }
    } catch (error) {
      console.error(
        "Error updating event:",
        error.response?.data?.message || error.message
      );
      toast.error(error.response?.data?.message || "Failed to update event!");
    }
  };

  return (
    <div className="font-[sans-serif] bg-white max-w-4xl mx-auto p-4 pt-20 min-h-screen flex flex-wrap items-center">
      <div className="grid md:grid-cols-3 items-center shadow-lg rounded-xl overflow-hidden w-full">
        {/* Sidebar Section */}
        <div className="md:flex hidden flex-col justify-center space-y-8 min-h-full bg-gradient-to-r from-gray-900 to-gray-700 lg:px-8 px-4 py-4">
          <div>
            <h4 className="text-white text-lg">Update Your Event</h4>
            <p className="text-[13px] text-gray-300 mt-3 leading-relaxed">
              Make changes to your event details below.
            </p>
          </div>
          <div>
            <h4 className="text-white text-lg">
              Easy & Secure Event Management
            </h4>
            <p className="text-[13px] text-gray-300 mt-3 leading-relaxed">
              Update your event details with ease and security.
            </p>
          </div>
        </div>

        {/* Form Section */}
        <form
          onSubmit={handleUpdate}
          className="md:col-span-2 w-full py-6 px-6 sm:px-10 max-w-2xl mx-auto"
        >
          <div className="mb-6">
            <h3 className="text-gray-800 text-xl font-bold text-center md:text-left">
              Update Event
            </h3>
          </div>

          <div className="space-y-6">
            {/* Event Title */}
            <div>
              <label className="text-gray-600 text-sm mb-2 block">Title</label>
              <input
                name="title"
                type="text"
                value={updatedEvent.title}
                onChange={handleInputChange}
                required
                className="text-gray-800 bg-white border border-gray-300 w-full text-sm p-2 rounded-md outline-blue-500"
                placeholder="Enter event title"
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-gray-600 text-sm mb-2 block">
                Description
              </label>
              <textarea
                name="description"
                value={updatedEvent.description}
                onChange={handleInputChange}
                required
                className="text-gray-800 bg-white border border-gray-300 w-full text-sm p-2 rounded-md outline-blue-500"
                placeholder="Enter event description"
              ></textarea>
            </div>

            {/* Date */}
            <div>
              <label className="text-gray-600 text-sm mb-2 block">Date</label>
              <input
                name="date"
                type="date"
                value={updatedEvent.date}
                onChange={handleInputChange}
                required
                className="text-gray-800 bg-white border border-gray-300 w-full text-sm p-2 rounded-md outline-blue-500"
              />
            </div>

            {/* Location */}
            <div>
              <label className="text-gray-600 text-sm mb-2 block">
                Location
              </label>
              <input
                name="location"
                type="text"
                value={updatedEvent.location}
                onChange={handleInputChange}
                required
                className="text-gray-800 bg-white border border-gray-300 w-full text-sm p-2 rounded-md outline-blue-500"
                placeholder="Enter event location"
              />
            </div>

            {/* Capacity */}
            <div>
              <label className="text-gray-600 text-sm mb-2 block">
                Capacity
              </label>
              <input
                name="capacity"
                type="number"
                value={updatedEvent.capacity}
                onChange={handleInputChange}
                required
                className="text-gray-800 bg-white border border-gray-300 w-full text-sm p-2 rounded-md outline-blue-500"
                placeholder="Enter capacity"
              />
            </div>

            {/* Price */}
            <div>
              <label className="text-gray-600 text-sm mb-2 block">Price</label>
              <input
                name="price"
                type="number"
                value={updatedEvent.price}
                onChange={handleInputChange}
                required
                className="text-gray-800 bg-white border border-gray-300 w-full text-sm p-2 rounded-md outline-blue-500"
                placeholder="Enter price"
              />
            </div>

            {/* Status */}
            <div>
              <label className="text-gray-600 text-sm mb-2 block">Status</label>
              <select
                name="status"
                value={updatedEvent.status}
                onChange={handleInputChange}
                required
                className="text-gray-800 bg-white border border-gray-300 w-full text-sm p-2 rounded-md outline-blue-500"
              >
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
                <option value="available">Available</option>
                <option value="ongoing">Ongoing</option>
              </select>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              type="submit"
              className="flex-1 py-2 px-4 text-sm rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none"
            >
              Update Event
            </button>
            <button
              type="button"
              onClick={() => navigate("/all-events")}
              className="flex-1 py-2 px-4 text-sm rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateEventForm;

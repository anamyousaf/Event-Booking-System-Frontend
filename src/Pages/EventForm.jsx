import axios from "axios";
import { toast } from "react-toastify";
import React, { useState } from "react";
import AdminDashboard from "./AdminDashboard";

const EventForm = () => {
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    capacity: "",
    price: "",
    category: "Concert",
    status: "upcoming",
    image: "",
  });

  const handleInputChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setEventData({ ...eventData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      title,
      description,
      date,
      location,
      capacity,
      price,
      category,
      status,
      image,
    } = eventData;

    if (
      !title ||
      !description ||
      !date ||
      !location ||
      !capacity ||
      !price ||
      !category ||
      !status ||
      !image
    ) {
      toast.error("All required fields must be filled!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const resp = await axios.post(
        "https://event-management-system-backend-zg2b.onrender.com/api/events/create-event",
        eventData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(resp.data.msg);

      setEventData({
        title: "",
        description: "",
        date: "",
        location: "",
        capacity: "",
        price: "",
        category: "Concert",
        status: "upcoming",
        image: "",
      });
    } catch (error) {
      console.error("Submission Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.msg || "Something went wrong!");
    }
  };

  return (
    <>
      <AdminDashboard />
      <div className="font-[sans-serif] bg-white max-w-5xl flex items-center mx-auto h-auto p-6">
        <div className="grid md:grid-cols-3 items-center shadow-lg rounded-xl overflow-hidden w-full">
          {/* Sidebar Section */}
          <div className="max-md:order-1 flex flex-col justify-center md:space-y-12 space-y-6 bg-gradient-to-r from-gray-900 to-gray-700 lg:px-8 px-6 py-6">
            <div>
              <h4 className="text-white text-lg">Create Your Event</h4>
              <p className="text-[13px] text-gray-300 mt-2 leading-relaxed">
                Organize and manage events effortlessly. Fill in the details
                below to add your event.
              </p>
            </div>
            <div>
              <h4 className="text-white text-lg">
                Easy & Secure Event Management
              </h4>
              <p className="text-[13px] text-gray-300 mt-2 leading-relaxed">
                Our system ensures that event creation is simple, secure, and
                efficient.
              </p>
            </div>
          </div>

          {/* Form Section */}
          <form
            onSubmit={handleSubmit}
            className="md:col-span-2 w-full py-6 px-8 sm:px-14 max-md:max-w-xl mx-auto"
          >
            <div className="mb-6">
              <h3 className="text-gray-800 text-xl font-bold">
                Add Event Details
              </h3>
            </div>

            <div className="space-y-5">
              {/* Event Title */}
              <div>
                <label className="text-gray-600 text-sm mb-2 block">
                  Title
                </label>
                <input
                  name="title"
                  type="text"
                  value={eventData.title}
                  onChange={handleInputChange}
                  required
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm pl-4 pr-6 py-2.5 rounded-md outline-blue-500"
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
                  value={eventData.description}
                  onChange={handleInputChange}
                  required
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm pl-4 pr-6 py-2.5 rounded-md outline-blue-500"
                  placeholder="Enter event description"
                ></textarea>
              </div>

              {/* Date */}
              <div>
                <label className="text-gray-600 text-sm mb-2 block">Date</label>
                <input
                  name="date"
                  type="date"
                  value={eventData.date}
                  onChange={handleInputChange}
                  required
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm pl-4 pr-6 py-2.5 rounded-md outline-blue-500"
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
                  value={eventData.location}
                  onChange={handleInputChange}
                  required
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm pl-4 pr-6 py-2.5 rounded-md outline-blue-500"
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
                  value={eventData.capacity}
                  onChange={handleInputChange}
                  required
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm pl-4 pr-6 py-2.5 rounded-md outline-blue-500"
                  placeholder="Enter capacity"
                />
              </div>

              {/* Price */}
              <div>
                <label className="text-gray-600 text-sm mb-2 block">
                  Price
                </label>
                <input
                  name="price"
                  type="number"
                  value={eventData.price}
                  onChange={handleInputChange}
                  required
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm pl-4 pr-6 py-2.5 rounded-md outline-blue-500"
                  placeholder="Enter price"
                />
              </div>

              {/* Status */}
              <div>
                <label className="text-gray-600 text-sm mb-2 block">
                  Status
                </label>
                <select
                  name="status"
                  value={eventData.status}
                  onChange={handleInputChange}
                  required
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm pl-4 pr-6 py-2.5 rounded-md outline-blue-500"
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="available">Available</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {/* Image Upload */}
              <div>
                <label className="text-gray-600 text-sm mb-2 block">
                  Upload Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm pl-4 pr-6 py-2.5 rounded-md outline-blue-500"
                  required
                />
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full py-2.5 px-4 tracking-wider text-sm rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none"
              >
                Create Event
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EventForm;

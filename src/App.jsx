import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import LandingPage from "./static/LandingPage";
import Contact from "./Pages/Contact";
import About from "../src/static/About";
import BookingForm from "./Pages/BookingForm";
import AllEvents from "./Pages/AllEvents";
import OurBookings from "./Pages/OurBookings";
import AllUsers from "./Pages/AllUsers";
import AllContacts from "./Pages/AllContacts";
import UpdateBookingForm from "./Pages/UpdateBookingForm";
import UpdateEventForm from "./Pages/UpdateEventForm";

import AdminDashboard from "./Pages/AdminDashboard";
import AcountPage from "./Pages/AcountPage";
import Services from "./static/Services";
import NotFoundPage from "./static/NotFoundPage";
import EventForm from "./Pages/EventForm";
import Gallery from "../src/static/Gallery";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="*" element={<NotFoundPage />} />

        <Route
          path="/book-now"
          element={
            <PrivateRoute roles={["user", "admin"]}>
              <BookingForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/account"
          element={
            <PrivateRoute roles={["user"]}>
              <AcountPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoute roles={["admin"]}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/all-events"
          element={
            <PrivateRoute roles={["admin"]}>
              <AllEvents />
            </PrivateRoute>
          }
        />
        <Route
          path="/all-users"
          element={
            <PrivateRoute roles={["admin"]}>
              <AllUsers />
            </PrivateRoute>
          }
        />
        <Route
          path="/all-contacts"
          element={
            <PrivateRoute roles={["admin"]}>
              <AllContacts />
            </PrivateRoute>
          }
        />
        <Route
          path="/all-bookings"
          element={
            <PrivateRoute roles={["admin"]}>
              <OurBookings />
            </PrivateRoute>
          }
        />
        <Route
          path="/create-event"
          element={
            <PrivateRoute roles={["admin"]}>
              <EventForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/event/update/:eventId"
          element={
            <PrivateRoute roles={["admin"]}>
              <UpdateEventForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/update-booking/:id"
          element={
            <PrivateRoute roles={["admin"]}>
              <UpdateBookingForm />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;

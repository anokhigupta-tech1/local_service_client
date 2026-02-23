import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FindProfessionals from "./pages/FindProfessionals";
import ProfessionalProfile from "./pages/ProfessionalProfile";
import BookServiceman from "./pages/BookServiceman";
import MyBookings from "./pages/MyBookings";
import LandingPage from "./pages/regisetr/LandingPage";
import Login from "./pages/Login";
import ServiceProviderDashboard from "./pages/ServiceProdiderDashboard";
import Layout from "./pages/dashboard/Layout";
import EarningsPage from "./pages/dashboard/serviceProvider/EarningsPage";
import ProfilePro from "./pages/dashboard/serviceProvider/profile/ProfilePro";
import AddServices from "./pages/dashboard/serviceProvider/AddServices";
import ProfilePage from "./pages/dashboard/customer/ProfilePage";
export default function RoutePath() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-account" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/customer/profile/:id" element={<ProfilePage />} />
      <Route path="/services/:serviceName" element={<FindProfessionals />} />
      <Route
        path="/service-provider-dashboard"
        element={
          <Layout>
            <ServiceProviderDashboard />
          </Layout>
        }
      />
      <Route
        path="/service-provider-dashboard/add-services"
        element={
          <Layout>
            <AddServices />
          </Layout>
        }
      />

      <Route
        path="/service-provider-dashboard/earnings"
        element={
          <Layout>
            <EarningsPage />
          </Layout>
        }
      />
      <Route
        path="/service-provider-dashboard/profile"
        element={
          <Layout>
            <ProfilePro />
          </Layout>
        }
      />

      <Route path="/profile/:id" element={<ProfessionalProfile />} />
      <Route path="/book-serviceman" element={<BookServiceman />} />
      <Route path="/my-bookings" element={<MyBookings />} />
      <Route path="/explore" element={<FindProfessionals />} />
    </Routes>
  );
}

import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FindProfessionals from "./pages/FindProfessionals";
import ProfessionalProfile from "./pages/ProfessionalProfile";
export default function RoutePath() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/your-serviceman/:serviceName"
        element={<FindProfessionals />}
      />
      <Route path="/profile/:id" element={<ProfessionalProfile />} />
    </Routes>
  );
}

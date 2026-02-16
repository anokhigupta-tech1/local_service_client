import React from "react";
import { Navbar } from "./components/layout/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import RoutePath from "./RoutePath";
import Locationbar from "./components/layout/Locationbar";
import FindProfessionals from "./pages/FindProfessionals";
export default function App() {
  return (
    <div>
      <Router>
        <Locationbar />
        <Navbar />
        <RoutePath />
        {/* <FindProfessionals/> */}
      </Router>
    </div>
  );
}

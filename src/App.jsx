import React, { useState } from "react";
import { Navbar } from "./components/layout/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import RoutePath from "./RoutePath";
import Locationbar from "./components/layout/Locationbar";
import Searchbar from "./components/Searchbar";
import ServiceCards from "./pages/ServiceCards";
export default function App() {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(searchValue);
    setSearchValue("");
  };
  return (
    <div>
      <Router>
        <Locationbar />
        <Navbar />
        <div className="flex items-center justify-center md:mx-auto mx-2 my-3 ">
          <Searchbar
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            handleSearch={handleSearch}
          />
        </div>
        <ServiceCards/>
        <RoutePath />
      </Router>
    </div>
  );
}

import React from "react";
import ServiceCards from "./home/ServiceCards";
import ServicesSection from "./home/ServicesSection";
import RecommendedProfessionals from "./home/RecommendedProfessionals";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      <ServiceCards />
      <ServicesSection />
      <RecommendedProfessionals />
    </div>
  );
}

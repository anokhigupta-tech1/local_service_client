import {
  Wrench,
  Zap,
  GraduationCap,
  Brush,
  CookingPot,
  Flower2,
  Hammer,
  Scissors,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const services = [
  { name: "Plumber", icon: Wrench },
  { name: "Electrician", icon: Zap },
  { name: "Tutor", icon: GraduationCap },
  { name: "Cleaner", icon: Brush },
  { name: "Cook", icon: CookingPot },
  { name: "Gardener", icon: Flower2 },
  { name: "Handyman", icon: Hammer },
  { name: "Beauty", icon: Scissors },
];

export default function ServicesSection() {
  const navigate=useNavigate();
  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
          Services
        </h2>
        <button className="text-teal-600 font-medium hover:underline">
          See All
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <div
              key={index}
              className="flex flex-col items-center text-center group cursor-pointer"
              onClick={() => {
                navigate(`/your-serviceman/${service.name}`);
              }}
            >
              {/* Icon Box */}
              <div className="w-24 h-24 flex items-center justify-center rounded-2xl bg-gray-100 group-hover:bg-teal-50 transition">
                <Icon
                  size={36}
                  className="text-teal-600 group-hover:scale-110 transition"
                />
              </div>

              {/* Label */}
              <p className="mt-4 text-gray-700 font-medium">{service.name}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

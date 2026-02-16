"use client";

import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  Star,
  Clock,
  MapPin,
  Calendar,
  SlidersHorizontal,
} from "lucide-react";
import { useParams } from "react-router-dom";

const data = [
  {
    name: "Arthur Miller",
    role: "Master Electrician",
    price: 65,
    rating: 4.9,
    reviews: 86,
    nextDay: "Tomorrow",
    nextTime: "9 AM",
    distance: 0.8,
    serviceCategory: "electrician",
  },
  {
    name: "Sarah Jenkins",
    role: "Senior Interior Designer",
    price: 85,
    rating: 5.0,
    reviews: 120,
    nextDay: "Monday",
    nextTime: "11 AM",
    distance: 1.5,
    serviceCategory: "developer",
  },
  {
    name: "David Chen",
    role: "Math & Physics Tutor",
    price: 45,
    rating: 4.8,
    reviews: 54,
    nextDay: "Today",
    nextTime: "4 PM",
    distance: 2.2,
    serviceCategory: "tutor",
  },
  {
    name: "Marcus Thorne",
    role: "Licensed Plumber",
    price: 70,
    rating: 4.7,
    reviews: 102,
    nextDay: "Tomorrow",
    nextTime: "10 AM",
    distance: 3.5,
    serviceCategory: "plumber",
  },
];

export default function FindProfessionals() {
  const [search, setSearch] = useState("");
  const [todayOnly, setTodayOnly] = useState(false);
  const [topRated, setTopRated] = useState(false);
  const [under60, setUnder60] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");
  const { serviceName } = useParams();
  console.log(serviceName);
  // FILTER + SEARCH LOGIC
  const filteredData = useMemo(() => {
    let result = [...data];

    // Search
    if (search) {
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.role.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // Today filter
    if (todayOnly) {
      result = result.filter((item) => item.nextDay === "Today");
    }
    if (serviceName) {
      result = result.filter(
        (item) =>
          item.serviceCategory.toLocaleLowerCase() ===
          serviceName.toLocaleLowerCase(),
      );
    }
    // Top rated filter
    if (topRated) {
      result = result.filter((item) => item.rating >= 4.8);
    }

    // Under $60 filter
    if (under60) {
      result = result.filter((item) => item.price < 60);
    }

    // Sorting
    if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    if (sortBy === "price") {
      result.sort((a, b) => a.price - b.price);
    }

    return result;
  }, [search, todayOnly, topRated, under60, sortBy, serviceName]);

  return (
    <div className="min-h-screen bg-[#f6f8f7] p-8 my-5">
      {/* DESKTOP CONTAINER */}
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Find Professionals</h1>

          <div className="flex items-center gap-4">
            <select
              className="border rounded-lg px-3 py-2"
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="relevance">Sort by: Relevance</option>
              <option value="rating">Sort by: Rating</option>
              <option value="price">Sort by: Price</option>
            </select>

            <SlidersHorizontal className="cursor-pointer" />
          </div>
        </div>

        {/* SEARCH */}
        <div className="mb-6">
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search professionals..."
              className="pl-9 h-11"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* FILTER BUTTONS */}
        <div className="flex gap-4 mb-8 flex-wrap">
          <Button
            variant={todayOnly ? "default" : "outline"}
            onClick={() => setTodayOnly(!todayOnly)}
          >
            Today
          </Button>

          <Button
            variant={topRated ? "default" : "outline"}
            onClick={() => setTopRated(!topRated)}
          >
            Top Rated
          </Button>

          <Button
            variant={under60 ? "default" : "outline"}
            onClick={() => setUnder60(!under60)}
          >
            Under $60
          </Button>
        </div>

        {/* RESULT COUNT */}
        <p className="mb-6 text-lg font-semibold">
          {filteredData.length} professionals found
        </p>

        {/* GRID LAYOUT (DESKTOP FIRST) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((pro, index) => (
            <Card key={index} className="rounded-2xl shadow-sm">
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between">
                  <div className="flex gap-4">
                    <Avatar className="h-14 w-14">
                      <AvatarImage
                        src={`https://i.pravatar.cc/150?img=${index + 10}`}
                      />
                    </Avatar>

                    <div>
                      <h3 className="font-semibold text-lg">{pro.name}</h3>
                      <p className="text-sm text-teal-600 font-medium">
                        {pro.role}
                      </p>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        {pro.rating} ({pro.reviews})
                      </div>
                    </div>
                  </div>

                  <div className="text-lg font-semibold text-teal-700">
                    ${pro.price}/hr
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Clock size={14} />
                    Next: {pro.nextDay}, {pro.nextTime}
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin size={14} />
                    {pro.distance} miles
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

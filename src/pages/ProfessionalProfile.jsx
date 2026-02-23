"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

import { CalendarDays } from "lucide-react"
import {
  ArrowLeft,
  Heart,
  Share2,
  MapPin,
  Star,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProfessionalProfile() {
  const navigate= useNavigate();
  return (
    <div className="min-h-screen bg-[#f5f7f6]">
      {/* DESKTOP CONTAINER */}
      <div className="max-w-5xl mx-auto px-8 py-10">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
          <ArrowLeft className="cursor-pointer"  onClick={()=>navigate(-1)}/>
          <h2 className="tracking-widest text-sm font-semibold text-gray-500">
            PROFESSIONAL PROFILE
          </h2>
          <div className="flex gap-5">
            <Heart className="cursor-pointer" />
            <Share2 className="cursor-pointer" />
          </div>
        </div>

        {/* PROFILE SECTION */}
        <div className="text-center mb-10">
          <div className="relative w-fit mx-auto">
            <Avatar className="h-32 w-32 border-4 border-teal-200">
              <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" />
              <AvatarFallback>MT</AvatarFallback>
            </Avatar>

            <div className="absolute bottom-2 right-2 bg-teal-600 p-2 rounded-full border-4 border-white">
              <ShieldCheck className="text-white h-5 w-5" />
            </div>
          </div>

          <h1 className="text-3xl font-bold mt-5">Marcus Thorne</h1>

          <p className="text-teal-700 font-medium mt-2">
            Master Electrician · Smart Home Specialist
          </p>

          <div className="flex items-center justify-center gap-2 text-gray-500 mt-2">
            <MapPin size={16} />
            Brooklyn, NY · 8 miles away
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          <Card className="rounded-2xl text-center">
            <CardContent className="p-6">
              <p className="text-sm text-gray-500 mb-2">EXPERIENCE</p>
              <p className="text-xl font-bold">12 Yrs</p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl text-center">
            <CardContent className="p-6">
              <p className="text-sm text-gray-500 mb-2">RATING</p>
              <p className="text-xl font-bold flex justify-center items-center gap-1">
                4.9 <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl text-center">
            <CardContent className="p-6">
              <p className="text-sm text-gray-500 mb-2">JOBS</p>
              <p className="text-xl font-bold">840+</p>
            </CardContent>
          </Card>
        </div>

        {/* EXPERTISE */}
        <section className="mb-12">
          <h3 className="text-xl font-semibold mb-5">Expertise</h3>

          <div className="flex flex-wrap gap-3">
            {[
              "EV Charging",
              "Panel Upgrades",
              "Smart Lighting",
              "Emergency Fixes",
            ].map((item, index) => (
              <Badge
                key={index}
                className="rounded-full bg-teal-100 text-teal-700 px-4 py-2 text-sm"
              >
                {item}
              </Badge>
            ))}
          </div>
        </section>

        {/* SERVICES */}
        <section className="mb-12">
          <h3 className="text-xl font-semibold mb-6">Services & Pricing</h3>

          <div className="space-y-5">
            <Card className="rounded-2xl">
              <CardContent className="p-6 flex justify-between">
                <div>
                  <h4 className="font-semibold text-lg">Diagnostic Visit</h4>
                  <p className="text-gray-500 mt-2 max-w-lg">
                    Full system inspection and troubleshooting. Includes up to
                    30 mins of minor fixes.
                  </p>
                </div>
                <p className="font-semibold text-teal-700 text-lg">₹75</p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardContent className="p-6 flex justify-between">
                <div>
                  <h4 className="font-semibold text-lg">
                    EV Charger Installation
                  </h4>
                  <p className="text-gray-500 mt-2 max-w-lg">
                    Level 2 charger setup including wiring, breaker upgrade, and
                    safety testing.
                  </p>
                </div>
                <p className="font-semibold text-teal-700 text-lg">From ₹450</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* REVIEWS */}
        <section>
          <h3 className="text-xl font-semibold mb-6">Customer Reviews</h3>

          <div className="space-y-5">
            <Card className="rounded-2xl">
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <Avatar>
                      <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">James Sullivan</p>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-yellow-500 text-yellow-500"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className="text-gray-400 text-sm">2 days ago</span>
                </div>

                <p className="text-gray-600 italic">
                  "Marcus was professional and very knowledgeable about the
                  smart panel setup. Clean workspace and fast communication."
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 flex items-center justify-end ">
            <Button
              variant="outline"
              className="w-[200px] py-5  cursor-pointer rounded-xl text-teal-700 border-teal-300"
            >
              Read All 184 Reviews
            </Button>
          </div>
        </section>
        <div className="w-full border-t bg-white my-5">
      <div className="max-w-6xl mx-auto px-8 py-6 flex items-center justify-between">

        {/* LEFT SIDE */}
        <div>
          <p className="text-sm tracking-widest text-gray-400 uppercase">
            Starting From
          </p>
          <p className="text-3xl font-bold mt-1">
           ₹75
          </p>
        </div>

        {/* RIGHT SIDE BUTTON */}
        <Button
          size="lg"
          className="bg-teal-700 hover:bg-teal-800 text-white px-10 py-6 rounded-2xl text-lg shadow-xl hover:shadow-2xl transition-all"
          onClick={()=>navigate("/book-serviceman")}
        >
          Book Now
          <CalendarDays className="ml-3 h-5 w-5" />
        </Button>

      </div>
    </div>
      </div>
    </div>
  );
}

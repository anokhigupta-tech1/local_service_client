"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star, BadgeCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const professionals = [
  {
    id: 1,
    name: "Marcus Thorne",
    role: "Master Electrician",
    reviews: 128,
    rating: 4.9,
    price: 45,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,

    name: "Elena Rodriguez",
    role: "PhD Math Tutor",
    reviews: 84,
    rating: 5.0,
    price: 55,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    name: "James Wilson",
    role: "Garden Specialist",
    reviews: 52,
    rating: 4.8,
    price: 38,
    image: "https://randomuser.me/api/portraits/men/65.jpg",
  },
];

export default function RecommendedProfessionals() {
  const navigate = useNavigate();
  return (
    <div className=" mx-auto p-4 md:p-6">
      <h2 className="text-2xl font-semibold mb-6">Recommended Professionals</h2>

      <div className="flex flex-wrap items-center justify-start gap-8 mx-auto">
        {professionals.map((pro, index) => (
          <Card
            key={index}
            className="rounded-2xl shadow-sm border bg-white"
            
          >
            <CardContent className="py-0 px-3 flex  md:flex-row md:items-center md:justify-between gap-4">
              {/* LEFT SECTION */}
              <div className="flex items-center gap-4">
                <Avatar className="h-full w-full rounded-xl">
                  <AvatarImage src={pro.image} />
                  <AvatarFallback>{pro.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
              </div>

              {/* RIGHT SECTION */}
              <div className="flex flex-col items-center justify-between md:justify-end gap-4 w-full md:w-auto">
                <div className="">
                  <div className="flex items-start justify-start gap-3">
                    <h3 className="text-lg font-semibold">{pro.name}</h3>
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-700"
                    >
                      <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      {pro.rating}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mt-1">
                    <BadgeCheck className="h-4 w-4 text-emerald-600" />
                    <span>
                      {pro.role} · {pro.reviews} reviews
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-start gap-3">
                  <p className=" text-lg font-semibold">
                    ${pro.price}
                    <span className="text-muted-foreground font-normal text-base">
                      /hr
                    </span>
                  </p>
                  <Button className="bg-teal-700 hover:bg-teal-800 rounded-xl px-6" onClick={() => navigate(`/profile/${pro.id}`)}>
                    Book Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

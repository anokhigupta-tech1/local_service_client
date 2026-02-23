import { useState, useMemo } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, ArrowLeft } from "lucide-react";
import BookingCard from "@/components/BookingCard";
import { useNavigate } from "react-router-dom";

export default function MyBookings() {
  const [tab, setTab] = useState("all");
const navigate=useNavigate();
  const bookings = [
    {
      id: 1,
      image:"https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/14235/production/_100058428_mediaitem100058424.jpg",
      status: "PENDING",
      category: "upcoming",
      title: "Plumbing Repair",
      provider: "Alex Johnson",
      price: "₹85",
      date: "Oct 24 • 10:00 AM",
      statusColor: "yellow",
    },
    {
      id: 2,
      image:"https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/14235/production/_100058428_mediaitem100058424.jpg",
      status: "ACCEPTED",
      category: "ongoing",
      title: "Calculus Tutoring",
      provider: "Sarah Miller ⭐ 4.9",
      price: "₹45/hr",
      date: "Oct 26 • 04:30 PM",
      statusColor: "teal",
    },
    {
      id: 3,
      image:"https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/14235/production/_100058428_mediaitem100058424.jpg",
      status: "COMPLETED",
      category: "history",
      title: "Light Installation",
      provider: "Professional: David Chen",
      price: "₹120",
      date: "Finished on Oct 20, 2023",
      statusColor: "gray",
      completed: true,
    },
  ];

  // ✅ Real Filtering Logic
  let filteredBookings = useMemo(() => {
    return bookings.filter((booking) => booking.category === tab);
  }, [tab]);
  if (tab == "all") {
    filteredBookings = bookings;
  }
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10 px-4">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <ArrowLeft className="cursor-pointer" onClick={()=>navigate(-1)}/>
          <h1 className="text-3xl font-semibold">My Bookings</h1>
          <Bell />
        </div>

        {/* Tabs */}
        <Tabs value={tab} onValueChange={setTab} className="mb-8">
          <TabsList className="grid grid-cols-4 w-full max-w-md bg-gray-200 rounded-xl">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Section Title */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-teal-600 font-semibold tracking-widest text-sm uppercase">
            {tab} bookings
          </h2>
          <span className="text-gray-500 text-sm">
            {filteredBookings.length} Requests
          </span>
        </div>

        {/* Cards */}
        <div className="space-y-6">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <BookingCard key={booking.id} {...booking} />
            ))
          ) : (
            <div className="text-center py-10 text-gray-400">
              No bookings found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

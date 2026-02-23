"use client";

import {
  Search,
  Bell,
  TrendingUp,
  Users,
  Briefcase,
  DollarSign,
  CheckCircle,
  UserPlus,
  Star,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { StatCard } from "./dashboard/serviceProvider/StatCard";
import { VerificationCard } from "./dashboard/serviceProvider/VerificationCard";
import { ActivityItem } from "./dashboard/serviceProvider/ActivityItem";

const revenueData = [
  { day: "MON", value: 2000 },
  { day: "TUE", value: 5000 },
  { day: "WED", value: 4200 },
  { day: "THU", value: 6000 },
  { day: "FRI", value: 4800 },
  { day: "SAT", value: 3000 },
  { day: "SUN", value: 2500 },
];

export default function ServiceProviderDashboard() {
  return (
    <div className="min-h-screen bg-muted/40 p-6">
      <div className="max-w-7xl mx-auto space-y-8">

       

        {/* Overview Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Overview</h2>
          <Button variant="outline" className="rounded-xl">
            Last 30 Days
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          <Card className="bg-teal-700 text-white rounded-2xl shadow-lg">
            <CardContent className="p-6 space-y-3">
              <div className="flex justify-between">
                <p>Total Revenue</p>
                <DollarSign />
              </div>
              <h2 className="text-3xl font-bold">₹45,280</h2>
              <p className="text-sm flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                +12.5%
              </p>
            </CardContent>
          </Card>

          <StatCard
            title="Bookings"
            value="1,240"
            growth="+8.2%"
            icon={<Briefcase />}
          />

          <StatCard
            title="Customers"
            value="7,120"
            icon={<Users />}
          />

          <StatCard
            title="Professionals"
            value="1,380"
            icon={<Users />}
          />

        </div>

        {/* Revenue Chart */}
        <Card className="rounded-2xl shadow-md">
          <CardContent className="p-6 space-y-6">
            <div>
              <p className="text-muted-foreground">Revenue Growth</p>
              <h2 className="text-3xl font-bold">
                ₹12,450 <span className="text-base text-muted-foreground">this week</span>
              </h2>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <XAxis dataKey="day" />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#0f766e"
                    fill="#99f6e4"
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Pending Verifications */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Pending Verifications</h2>
            <button className="text-teal-600 font-medium hover:underline">
              VIEW ALL
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <VerificationCard image="https://static.vecteezy.com/vite/assets/photo-masthead-375-BoK_p8LG.webp" name="Marcus Chen" role="Electrician · 2d ago" />
            <VerificationCard image="https://static.vecteezy.com/vite/assets/photo-masthead-375-BoK_p8LG.webp" name="Sarah Jenkins" role="Math Tutor · 5h ago" />
            <VerificationCard image="https://static.vecteezy.com/vite/assets/photo-masthead-375-BoK_p8LG.webp" name="David Lee" role="Plumber · 1d ago" />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Recent Activity</h2>

          <ActivityItem
            icon={<CheckCircle className="text-green-600" />}
            title="New Booking: Electrician"
            subtitle="John D. booked Marcus C. for a repair"
            time="2m ago"
          />

          <ActivityItem
            icon={<UserPlus className="text-blue-600" />}
            title="New Professional Sign-up"
            subtitle="Elena Wright applied as Yoga Instructor"
            time="15m ago"
          />

          <ActivityItem
            icon={<Star className="text-yellow-500" />}
            title="High Rating Received"
            subtitle="David L. rated his experience 5.0 stars"
            time="1h ago"
          />
        </div>

      </div>
    </div>
  );
}

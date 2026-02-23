import { useCallback, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Home,
  Plus,
} from "lucide-react";
import PaymentPage from "@/components/PaymentPage";
import { useNavigate } from "react-router-dom";

export default function BookPlumber() {
  const [isPaymentpage, setIsPaymentpage] = useState(false);
  const today = new Date();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(today.getDate());
  const [selectedTime, setSelectedTime] = useState(null);

  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const generateTimeSlots = useCallback(() => {
    const slots = [];
    let startHour = 9; // 9 AM
    const totalHours = 12;

    for (let i = 0; i < totalHours; i++) {
      let hour = startHour + i;
      let period = hour >= 12 ? "PM" : "AM";

      let formattedHour = hour % 12;
      if (formattedHour === 0) formattedHour = 12;

      slots.push(`${formattedHour.toString().padStart(2, "0")}:00 ${period}`);
    }

    return slots;
  }, []);

  const times = generateTimeSlots();
  console.log(times);
  // Convert time string to Date object
  const parseTime = (timeStr) => {
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":");
    if (modifier === "PM" && hours !== "12") hours = parseInt(hours) + 12;
    if (modifier === "AM" && hours === "12") hours = 0;

    return new Date(currentYear, currentMonth, selectedDate, hours, minutes);
  };

  const isPastDate = (date) => {
    const checkDate = new Date(currentYear, currentMonth, date);
    return checkDate < new Date(today.setHours(0, 0, 0, 0));
  };

  const isPastTime = (time) => {
    if (selectedDate !== today.getDate()) return false;
    return parseTime(time) < new Date();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10 px-4">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <ChevronLeft onClick={() => navigate(-1)} className="cursor-pointer"/>
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Book Plumber</h1>
            <p className="text-gray-500">Alex Thompson ⭐ 4.9</p>
          </div>
          <MoreHorizontal />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-8">
            {/* Select Date */}
            <Card className="rounded-2xl shadow-sm">
              <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle>Select Date</CardTitle>
                <div className="flex items-center gap-3 text-sm font-medium">
                  October 2023
                </div>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-7 gap-3 text-center">
                  {[...Array(31)].map((_, i) => {
                    const date = i + 1;
                    const disabled = isPastDate(date);

                    return (
                      <Button
                        key={date}
                        disabled={disabled}
                        onClick={() => {
                          setSelectedDate(date);
                          setSelectedTime(null);
                        }}
                        variant={selectedDate === date ? "default" : "ghost"}
                        className={`rounded-xl ${
                          selectedDate === date
                            ? "bg-teal-600 text-white hover:bg-teal-700"
                            : ""
                        } ${disabled ? "opacity-40 cursor-not-allowed" : ""}`}
                      >
                        {date}
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Time Slots */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Available Slots</h2>
                <Badge className="bg-yellow-100 text-yellow-700">
                  HIGH DEMAND
                </Badge>
              </div>

              <div className="flex flex-wrap gap-4">
                {times?.length > 0 &&
                  times.map((time) => {
                    const disabled = isPastTime(time);

                    return (
                      <Button
                        key={time}
                        disabled={disabled}
                        onClick={() => setSelectedTime(time)}
                        variant="outline"
                        className={`rounded-xl px-6 ${
                          selectedTime === time
                            ? "bg-teal-600 text-white hover:bg-teal-700"
                            : ""
                        } ${disabled ? "opacity-40 cursor-not-allowed" : ""}`}
                      >
                        {time}
                      </Button>
                    );
                  })}
              </div>
            </div>

            {/* Service Address */}
            <Card className="rounded-2xl">
              <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle>Service Address</CardTitle>
                <Button variant="ghost" size="sm">
                  <Plus size={16} /> Add New
                </Button>
              </CardHeader>

              <CardContent>
                <div className="flex items-center gap-4 border rounded-xl p-4">
                  <div className="bg-teal-100 p-3 rounded-lg">
                    <Home className="text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Home</h3>
                    <p className="text-gray-500 text-sm">
                      123 Maple Street, Brooklyn
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Instructions */}
            <div>
              <h2 className="font-semibold mb-3">Specific Instructions</h2>
              <Textarea
                placeholder="Enter additional instructions..."
                className="rounded-xl"
              />
            </div>
          </div>

          {/* RIGHT SIDE SUMMARY */}
          <div>
            <Card className="rounded-2xl sticky top-10">
              <CardHeader>
                <CardTitle>Estimated Cost</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span>Service Fee</span>
                  <span>₹85.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Call-out Charge</span>
                  <span>₹25.00</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>- ₹10.00</span>
                </div>

                <Separator />

                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span className="text-teal-600">₹100.00</span>
                </div>

                <Button
                  disabled={!selectedTime}
                  className="w-full mt-4 bg-teal-600 hover:bg-teal-700 rounded-xl"
                  onClick={() => setIsPaymentpage(!isPaymentpage)}
                >
                  Confirm Booking →
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      {isPaymentpage && (
        <Dialog open={isPaymentpage} onOpenChange={setIsPaymentpage}>
          <DialogContent className="sm:max-w-lg rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">
                Complete Payment
              </DialogTitle>
            </DialogHeader>

            <PaymentPage
              amount={100}
              country="IN"
              userId="USER_123"
              phone="9876543210"
              email="user@example.com"
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

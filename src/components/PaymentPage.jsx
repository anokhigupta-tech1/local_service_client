import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export default function PaymentPage({ amount, country, userId, phone, email }) {
  const navigate = useNavigate();
  const handlePayment = () => {
    const options = {
      key: import.meta.env.VITE_ROZARPAY_KEY, // 👈 Replace with your test key
      amount: amount * 100, // Razorpay works in paise
      currency: country === "IN" ? "INR" : "USD",
      name: "Service Booking",
      description: `Booking for User ${userId}`,
      image: "https://yourlogo.com/logo.png", // optional

      handler: function (response) {
        console.log("Payment Success:", response);

        alert(
          `Payment Successful!\nPayment ID: ${response.razorpay_payment_id}`,
        );
        navigate("/my-bookings");
      },

      prefill: {
        name: userId,
        email: email,
        contact: phone,
      },

      notes: {
        user_id: userId,
        country: country,
      },

      theme: {
        color: "#0f766e", // teal
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="m flex items-center justify-center bg-gray-100 px-4 py-10">
      <Card className="w-full max-w-lg rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Complete Payment
          </CardTitle>
        </CardHeader>

        <CardContent className="space">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>User ID</span>
              <span>{userId}</span>
            </div>

            <div className="flex justify-between">
              <span>Email</span>
              <span>{email}</span>
            </div>

            <div className="flex justify-between">
              <span>Phone</span>
              <span>{phone}</span>
            </div>

            <div className="flex justify-between">
              <span>Country</span>
              <span>{country}</span>
            </div>

            <div className="flex justify-between font-semibold text-lg pt-4 border-t">
              <span>Total Amount</span>
              <span>
                {country === "IN" ? "₹" : "$"}
                {amount}
              </span>
            </div>
          </div>

          <Button
            onClick={handlePayment}
            className="w-full bg-teal-600 hover:bg-teal-700 rounded-xl"
          >
            Pay Now
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

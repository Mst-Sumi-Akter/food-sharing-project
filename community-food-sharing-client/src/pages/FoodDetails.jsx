import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const FoodDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const res = await fetch(`https://community-food-sharing-server-iota.vercel.app/foods/${id}`);
        if (!res.ok) throw new Error("Failed to fetch food details");
        const data = await res.json();
        setFood(data);
      } catch (err) {
        console.error(err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchFood();
  }, [id]);

  const handleRequestFood = async () => {
    if (!user) return alert("Please login to request food");

    try {
      const res = await fetch(`https://community-food-sharing-server-iota.vercel.app/foods/${id}/request`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email }),
      });

      if (!res.ok) throw new Error("Failed to request this food");

      const result = await res.json();
      if (result.modifiedCount > 0) {
        alert(`You have successfully requested "${food.food_name}"`);
        setFood({ ...food, food_status: "Requested", requested_by_email: user.email });
      } else {
        alert("You have already requested this food");
      }
    } catch (err) {
      console.error(err);
      alert(err.message || "Something went wrong");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );

  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!food) return <p className="p-6">Food not found</p>;

  return (
    <div className="hero bg-gradient-to-r from-orange-50 to-pink-50 min-h-screen py-12 rounded-2xl">
      <div className="hero-content flex-col lg:flex-row gap-12 max-w-6xl">
        {/* Left Side — Food Image */}
        <img
          src={food.food_image}
          alt={food.food_name}
          className="max-w-sm w-full rounded-2xl shadow-2xl object-cover"
        />

        {/* Right Side — Food Info */}
        <div className="space-y-4 text-gray-700">
          <h1 className="text-4xl font-bold text-gray-900">{food.food_name}</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            <p>
              <span className="font-semibold">🍽 Quantity:</span> {food.food_quantity}
            </p>
            <p>
              <span className="font-semibold">📍 Pickup:</span> {food.pickup_location}
            </p>
            <p>
              <span className="font-semibold">🕓 Expire Date:</span> {food.expire_date}
            </p>
            <p>
              <span className="font-semibold">🧑 Donator:</span> {food.donator_name}
            </p>
          </div>

          {food.additional_notes && (
            <p className="pt-2">
              <span className="font-semibold">📝 Notes:</span> {food.additional_notes}
            </p>
          )}

          {/* Request Button */}
          <button
            onClick={handleRequestFood}
            disabled={food.food_status === "Requested"}
            className={`btn mt-6 text-white font-semibold ${
              food.food_status === "Requested"
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-[#ff8a0c] to-[#07a0e3]"
            }`}
          >
            {food.food_status === "Requested" ? "Already Requested" : "Request This Food"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;

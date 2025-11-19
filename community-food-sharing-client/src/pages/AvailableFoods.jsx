import React, { useEffect, useState } from "react";
import FoodCard from "../components/FoodCard";
import Spinner from "../components/Spinner";

const AvailableFoods = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await fetch("https://community-food-sharing-server-iota.vercel.app/foods/status/Available");
        if (!res.ok) throw new Error("Failed to fetch available foods");
        const data = await res.json();
        setFoods(data);
      } catch (err) {
        console.error(err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  if (loading) return <Spinner />;
  if (error) return <p className="text-center text-red-500">{error}</p>; 

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-extrabold drop-shadow-sm">
          🍽️{" "}
          <span className="bg-amber-500 bg-clip-text text-transparent">
            Available Foods
          </span>
        </h1>
        <p className="mt-3 text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
          Discover community-shared meals waiting for you — fresh, homemade, and
          shared with love. 🌿
        </p>
        <div className="mt-4 flex justify-center">
          <div className="w-24 h-1 rounded-full bg-gradient-to-r from-[#ff8a0c] to-[#07a0e3]"></div>
        </div>
      </div>

      {/* Food Cards Grid */}
      {foods.length === 0 ? (
        <p className="text-center text-gray-500">No foods available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {foods.map((food) => (
            <FoodCard key={food._id} food={food} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableFoods;

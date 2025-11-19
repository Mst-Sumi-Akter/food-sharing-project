import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import FoodCard from "../components/FoodCard";
import { Link } from "react-router-dom";

const Home = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    fetch("https://community-food-sharing-server-iota.vercel.app/foods")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a, b) => b.quantity - a.quantity);
        setFoods(sorted.slice(0, 6));
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
      {/*  Banner Section */}
      <section className="mb-12">
        <Banner />
      </section>

      {/* Featured Foods Section */}
      <section className="py-12">
        <h2 className="text-2xl font-semibold mb-8 text-center text-gray-800">
          Featured Dishes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {foods.map((food) => (
            <FoodCard key={food._id} food={food} />
          ))}
        </div>

        {/* Show All Foods Button */}
        <div className="text-center mt-8">
          <Link
            to="/all-foods"
            className="px-6 py-3 bg-gradient-to-r from-[#ff8a0c] via-[#ff9e2b] to-[#07a0e3] text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Show All Foods
          </Link>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 bg-gray-50 rounded-xl my-10">
        <h2 className="text-2xl font-semibold mb-8 text-center text-gray-800">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center px-4">
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-xl transition">
            <h3 className="font-semibold text-lg mb-2">1. Post Food</h3>
            <p className="text-gray-600 text-sm">
              Donate your surplus food by posting it with all necessary details.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-xl transition">
            <h3 className="font-semibold text-lg mb-2">2. Find Food</h3>
            <p className="text-gray-600 text-sm">
              Browse the available food posts shared by others in your community.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-xl transition">
            <h3 className="font-semibold text-lg mb-2">3. Collect Food</h3>
            <p className="text-gray-600 text-sm">
              Request and pick up the food from the donator safely and efficiently.
            </p>
          </div>
        </div>
      </section>

      {/* Community Stats Section */}
      <section className="py-12">
        <h2 className="text-2xl font-semibold mb-8 text-center text-gray-800">
          Our Mission
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center px-4">
          <div className="p-6 bg-gradient-to-r from-[#ff8a0c] to-[#07a0e3] text-white rounded-lg shadow">
            <h3 className="font-bold text-xl mb-2">500+</h3>
            <p>Meals Shared</p>
          </div>
          <div className="p-6 bg-gradient-to-r from-[#ff8a0c] to-[#07a0e3] text-white rounded-lg shadow">
            <h3 className="font-bold text-xl mb-2">200+</h3>
            <p>Active Donators</p>
          </div>
          <div className="p-6 bg-gradient-to-r from-[#ff8a0c] to-[#07a0e3] text-white rounded-lg shadow">
            <h3 className="font-bold text-xl mb-2">100+</h3>
            <p>Communities Reached</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

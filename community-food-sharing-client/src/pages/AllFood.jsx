import React, { useEffect, useState } from 'react';
import FoodCard from '../components/FoodCard';
import Spinner from '../components/Spinner';

const AllFood = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://community-food-sharing-server-iota.vercel.app/foods')
      .then(res => res.json())
      .then(data => {
        const availableFoods = data;
        setFoods(availableFoods);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);
 if (loading) return <Spinner/>;

  if (foods.length === 0)
    return <p className="text-center mt-10">No available foods found.</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
      <h2 className="text-2xl font-semibold mb-8 text-center text-gray-800">
        All Foods
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {foods.map(food => (
          <FoodCard key={food._id} food={food} />
        ))}
      </div>
    </div>
  );
};

export default AllFood;

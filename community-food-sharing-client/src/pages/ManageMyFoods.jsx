import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
 import Spinner from "../components/Spinner";

const ManageMyFoods = () => {
  const { user } = useAuth();
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's foods
  useEffect(() => {
    if (!user) return;

    fetch(`https://community-food-sharing-server-iota.vercel.app/my-foods?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setFoods(data);
        setLoading(false);
      });
  }, [user]);

  // Delete food
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this food?");
    if (!confirm) return;

    const res = await fetch(`https://community-food-sharing-server-iota.vercel.app/foods/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (data.deletedCount) {
      setFoods(foods.filter((f) => f._id !== id));
      alert("Food deleted successfully!");
    }
  };

  // Update food (navigate to update page)
  const handleUpdate = (id) => {
    window.location.href = `/update-food/${id}`;
  };

if (loading) return <Spinner />;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage My Foods</h1>
      {foods.length === 0 ? (
        <p>No foods added yet.</p>
      ) : (
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Food Name</th>
              <th className="border px-4 py-2">Quantity</th>
              <th className="border px-4 py-2">Pickup Location</th>
              <th className="border px-4 py-2">Expire Date</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {foods.map((food) => (
              <tr key={food._id}>
                <td className="border px-4 py-2">{food.food_name}</td>
                <td className="border px-4 py-2">{food.food_quantity}</td>
                <td className="border px-4 py-2">{food.pickup_location}</td>
                <td className="border px-4 py-2">{food.expire_date}</td>
                <td className="border px-4 py-2 flex gap-2">
                  <button
                    onClick={() => handleUpdate(food._id)}
                    className="px-2 py-1 bg-blue-500 text-white rounded"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(food._id)}
                    className="px-2 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageMyFoods;

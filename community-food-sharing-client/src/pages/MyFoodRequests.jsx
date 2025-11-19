import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import Spinner from "../components/Spinner";

const MyFoodRequests = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;

    const fetchRequests = async () => {
      try {
        const res = await fetch(`https://community-food-sharing-server-iota.vercel.app/food-requests?email=${user.email}`);
        if (!res.ok) throw new Error("Failed to load your food requests");
        const data = await res.json();
        setRequests(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load your food requests");
        setLoading(false);
      }
    };

    fetchRequests();
  }, [user]);

  if (loading) return <Spinner />;

  if (error) return <p>{error}</p>;
  if (requests.length === 0) return <p>No food requests yet.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Food Requests</h1>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Food Name</th>
            <th className="border px-4 py-2">Quantity</th>
            <th className="border px-4 py-2">Pickup Location</th>
            <th className="border px-4 py-2">Expire Date</th>
            <th className="border px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((food) => (
            <tr key={food._id}>
              <td className="border px-4 py-2">{food.food_name}</td>
              <td className="border px-4 py-2">{food.food_quantity}</td>
              <td className="border px-4 py-2">{food.pickup_location}</td>
              <td className="border px-4 py-2">
                {food.expire_date
                  ? new Date(food.expire_date).toISOString().split("T")[0]
                  : "N/A"}
              </td>
              <td className="border px-4 py-2">{food.food_status || "Requested"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyFoodRequests;

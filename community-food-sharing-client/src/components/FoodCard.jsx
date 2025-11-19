import { Link } from "react-router-dom";

const FoodCard = ({ food }) => {
  const {
    _id,
    food_name,
    food_image,
    food_quantity,
    pickup_location,
    expire_date,
    additional_notes,
    donator_name,
    donator_image,
    food_status,
  } = food;

  return (
    <div className="card bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
      {/* Food Image */}
      <figure className="h-52 overflow-hidden relative">
        <img
          src={food_image}
          alt={food_name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />

        {/* Food Status Badge */}
        <div
          className={`absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full shadow-md ${
            food_status === "Available"
              ? "bg-gradient-to-r from-green-500 to-green-400 text-white"
              : "bg-gradient-to-r from-red-500 to-red-400 text-white"
          }`}
        >
          {food_status}
        </div>
      </figure>

      {/* Card Body */}
      <div className="card-body p-5 flex flex-col justify-between">
        <h2 className="card-title text-lg font-bold text-gray-800 mb-2">
          {food_name}
        </h2>

        <div className="flex items-center gap-2 mb-3">
          <img
            src={donator_image}
            alt={donator_name}
            className="w-8 h-8 rounded-full border border-gray-200 object-cover"
          />
          <span className="text-sm text-gray-600">{donator_name}</span>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
          {additional_notes}
        </p>

        <div className="text-sm text-gray-500 space-y-1 mb-5">
          <p>
            <span className="font-semibold text-gray-700">Quantity:</span>{" "}
            {food_quantity}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Pickup:</span>{" "}
            {pickup_location}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Expire:</span>{" "}
            {expire_date}
          </p>
        </div>

        <div className="card-actions mt-auto">
          <Link
            to={`/food/${_id}`}
            className="btn w-full rounded-full text-white text-sm font-semibold 
              bg-gradient-to-r from-[#ff8a0c] via-[#ff9e2b] to-[#07a0e3]
              hover:from-[#07a0e3] hover:via-[#2ec8f9] hover:to-[#ff8a0c]
              border-none shadow-md hover:shadow-xl transition-all duration-300"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;

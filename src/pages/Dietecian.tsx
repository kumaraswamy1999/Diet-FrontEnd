import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Dietician {
  _id: string;
  name: string;
  experience: number;
  description: string;
  email: string;
  gender: string;
}

const DieticianCardList: React.FC = () => {
  const [dieticians, setDieticians] = useState<Dietician[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchDieticians = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/user/dieticians");
        setDieticians(response.data);
      } catch (error) {
        console.error("Error fetching dieticians:", error);
      }
    };

    fetchDieticians();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 via-blue-100 to-purple-200 p-6">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-8">Choose a Dietician</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dieticians.map((dietician) => (
          <div key={dietician._id} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-green-700">{dietician.name}</h3>
            <p className="text-sm text-gray-600">Gender: {dietician.gender}</p>
            <p className="mt-2 text-gray-700">Experience: {dietician.experience} years</p>
            <p className="mt-2 text-gray-700">Description: {dietician.description || "No description provided."}</p>
            <button
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              onClick={() => {
                navigate('/dashboard/goals')
              }}
            >
              Create Goal
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DieticianCardList;

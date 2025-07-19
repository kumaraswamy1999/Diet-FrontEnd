import React from "react";


interface GoalCardProps {
  height: number;
  currentWeight: number;
  targetedWeight: number;
  healthDescription: string;
  createdAt: string;
}

const GoalCard: React.FC = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-green-500">
      <h3 className="text-xl font-bold text-green-700 mb-2">Health Goal</h3>
      <p className="text-sm text-gray-600 mb-1">
        <strong>Height:</strong> height cm
      </p>
      <p className="text-sm text-gray-600 mb-1">
        <strong>Current Weight:</strong>currentWeight kg
      </p>
      <p className="text-sm text-gray-600 mb-1">
        <strong>Targeted Weight:</strong> targetedWeigh kg
      </p>
      <p className="text-sm text-gray-600 mb-1">
        <strong>Health Description:</strong> healthDescription
      </p>
      <p className="text-xs text-gray-400 mt-4">
        Created on: 
      </p>
    </div>
  );
};

export default GoalCard;

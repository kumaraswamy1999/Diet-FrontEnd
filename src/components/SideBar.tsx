import React from "react";
import { Link } from "react-router-dom";
import { adminSideBarRouteList, userSideBarRouteList } from "../routes/routeList";

const Sidebar: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  const user = localStorage.getItem('profile');
  const role = JSON.parse(user!)?.role;

  const routeList = role === 'user' ? userSideBarRouteList : adminSideBarRouteList;

  return (
    <div
      className={`inset-y-0 left-0 bg-gradient-to-b from-green-500 via-blue-400 to-purple-500 p-4 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-200 ease-in-out md:relative md:translate-x-0 md:w-64`}
    >
      <nav className="space-y-4">
        {routeList.map((route) => (
          <Link
            to={route.link}
            key={route.link}
            className="block text-white font-medium hover:text-gray-100 transition"
          >
            {route.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;

import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="h-screen w-full bg-gradient-to-br from-green-200 via-blue-100 to-purple-200 flex items-center justify-center">
      <div className="bg-white bg-opacity-90 p-10 rounded-xl shadow-2xl text-center max-w-xl">
        <h1 className="text-5xl font-extrabold text-green-700 mb-6">
          Welcome to Diet Generator
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Transform your lifestyle with personalized diet plans. Start your journey to a healthier you!
        </p>
        <Link
          to="/login"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

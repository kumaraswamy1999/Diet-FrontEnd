import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/auth/auth";
import type { RootState } from "../redux/store";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const userProfile: any = useSelector((state: RootState) => state.auth.profile);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login')
  };

  return (
    <nav className="bg-gradient-to-r from-green-500 via-blue-400 to-purple-500 text-white px-6 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white hover:text-gray-100">
          Diet Generator
        </Link>
        <ul className="flex space-x-6 items-center">
          <li>
            <Link to="/" className="hover:text-gray-100 font-medium">Home</Link>
          </li>
          {userProfile && userProfile.role === 'Passenger' && (
            <li>
              <Link to="/passenger/myTickets" className="hover:text-gray-100 font-medium">My Bookings</Link>
            </li>
          )}
          <li>
            <Link to="/about" className="hover:text-gray-100 font-medium">About</Link>
          </li>
          {!isLoggedIn ? (
            <li>
              <Link to="/login" className="hover:text-gray-100 font-medium">Login</Link>
            </li>
          ) : (
            <li>
              <button
                onClick={handleLogout}
                className="hover:text-gray-100 font-medium focus:outline-none"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;

import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ErrorComponent from "../components/ErrorComponent";


  
export const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/register', element: <Register /> },
  { path: '/login', element: <Login /> },
  { path: '*', element: <ErrorComponent /> },
]);

export default router
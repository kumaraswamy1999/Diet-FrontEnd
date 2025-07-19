import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ErrorComponent from "../components/ErrorComponent";
import Dashboard from "../pages/Dashboard";
import BMICalculatorForm from "../pages/bmi";
import DieticianCardList from "../pages/Dietecian";


  
export const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/register', element: <Register /> },
  { path: '/login', element: <Login /> },

  {path:'/dashboard',element:<Dashboard/>,
    children:[
      {path:'',element:<DieticianCardList/>},
      {path:'bmi',element:<BMICalculatorForm/>}
    ]
  },
  { path: '*', element: <ErrorComponent /> },
]);

export default router
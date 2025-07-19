import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ErrorComponent from "../components/ErrorComponent";
import Dashboard from "../pages/Dashboard";
import BMICalculatorForm from "../pages/bmi";
import DieticianCardList from "../pages/Dietecian";
import CreateGoalForm from "../pages/GoalCreation";
import GoalCard from "../pages/GoalCard";


  
export const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/register', element: <Register /> },
  { path: '/login', element: <Login /> },

  {path:'/dashboard',element:<Dashboard/>,
    children:[
      {path:'',element:<DieticianCardList/>},
      {path:'goals',element:<CreateGoalForm/>},
      {path:'bmi',element:<BMICalculatorForm/>},
      {path:'goalData',element:<GoalCard/>}
    ]
  },
  { path: '*', element: <ErrorComponent /> },
]);

export default router
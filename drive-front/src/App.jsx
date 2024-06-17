import Navbar from './components/navbar/Navbar';
import './index.css';
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import Home from './Pages/Home/Home'
import Racing from './Pages/Racing/Racing'
import RaceDetails from './Pages/Racing/RaceDetails'
import CardRacing from './Pages/Racing/CardRacing'

import {
  BrowserRouter as Router,
  createBrowserRouter, 
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";



function App() {
  const currentUser = true;

  const Layout = () => {
    return (
      <div>
        <Navbar /> 
        <Outlet /> 

      </div>
    )
  }

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />
    }
    return children
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute> <Layout /></ProtectedRoute>,
      children: [
        {
          path: '/',
          element: <Racing />
        },
        {
          path: '/racing',
          element: <Racing />
        },
        {
          path: '/races/:rideId',   
          element: <RaceDetails />,
        },
        {
          path: '/card',
          element: <CardRacing to="/air-conditioner"
          status="pendiente"
          title="CLiente 1"
          createTime="2023-06-15 08:00"
          km="18"/>
        },
        
      ]
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return (
    <div>
      
       <RouterProvider router={router} />
    </div>
  )

}


export default App;

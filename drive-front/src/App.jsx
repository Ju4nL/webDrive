import React, { useContext } from 'react';
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from './components/navbar/Navbar';
import './index.css';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Racing from './Pages/Racing/Racing';
import RaceDetails from './Pages/Racing/RaceDetails';
import Customers from './Pages/Customers/Customers';
import Drivers from './Pages/Drivers/Drivers';
import { AuthContext, AuthContextProvider } from './context/AuthContext';
import { DarkModeContextProvider } from './context/DarkModeContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return children;
};

const Layout = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
        <Navbar />
        <Outlet />
      </div>
    </QueryClientProvider>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute><Layout /></ProtectedRoute>,
    children: [
      { path: '/', element: <Racing /> },
      { path: '/racing', element: <Racing /> },
      { path: '/drivers', element: <Drivers /> },
      { path: '/clients', element: <Customers /> },
      { path: '/races/:rideId', element: <RaceDetails  /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);

function App() {
  return (
    <AuthContextProvider>
      <DarkModeContextProvider>
        <RouterProvider router={router} />
      </DarkModeContextProvider>
    </AuthContextProvider>
  );
}

export default App;

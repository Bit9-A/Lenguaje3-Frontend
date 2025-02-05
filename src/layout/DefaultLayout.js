import React, { useEffect, useState } from 'react';
import { AppContent, AppSidebar, AppFooter, DashboardHeader } from '../components/index';
import HomeHeader from "../components/HomeHeader";
import { useLocation, useNavigate } from 'react-router-dom';
import SessionPopup from '../components/SessionPopup';
import { helpHttp } from '../helpers/helpHTTP';

const api = helpHttp();

const DefaultLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);


  
  const dashboardRoutes = [
    '/dashboard',
    '/clients/list',
    '/clients/new',
    '/clients/interactions',
    '/projects/manage',
    '/projects/development',
    '/progress/tracking',
    '/projects/progress',
    '/services/reservations',
    '/billing/payments',
    '/proposals/pending',
    '/proposals/history',
    '/admin/employees',
    '/admin/reports',
    '/admin/users',
    '/communication/messages',
  ];

  const isDashBoard = dashboardRoutes.includes(location.pathname);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (isDashBoard && !loggedInUser) {
      navigate('/login');
    }

    const checkTokenExpiration = () => {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Math.floor(Date.now() / 1000);
        const timeLeft = decoded.exp - currentTime;

        if (timeLeft < 600) { // 10 minutes
          setShowPopup(true);
        }
      }
    };

    const interval = setInterval(checkTokenExpiration, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [isDashBoard, navigate]);

  const handleExtendSession = async () => {
    try {
      const response = await api.post('/extend-session');
      localStorage.setItem('token', response.data.token);
      setShowPopup(false);
    } catch (error) {
      console.error('Error extending session:', error);
      navigate('/login');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div>
      {isDashBoard ? <AppSidebar /> : null}
      <div className="wrapper d-flex flex-column min-vh-100">
        {isDashBoard ? <DashboardHeader /> : <HomeHeader />}
        <div className="body flex-grow-1">
          <AppContent />
        </div>
        <AppFooter />
      </div>
      <SessionPopup show={showPopup} onExtendSession={handleExtendSession} onLogout={handleLogout} />
    </div>
  );
};

export default DefaultLayout;
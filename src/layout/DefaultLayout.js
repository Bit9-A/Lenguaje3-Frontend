import React, { useEffect } from 'react';
import { AppContent, AppSidebar, AppFooter, DashboardHeader } from '../components/index';
import HomeHeader from "../components/HomeHeader";
import { useLocation, useNavigate } from 'react-router-dom';

const DefaultLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

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
  }, [isDashBoard, navigate]);

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
    </div>
  );
};

export default DefaultLayout;
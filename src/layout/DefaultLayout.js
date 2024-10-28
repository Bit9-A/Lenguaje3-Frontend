import React from 'react'
import { AppContent, AppSidebar, AppFooter, DashboardHeader } from '../components/index'
import HomeHeader from "../components/HomeHeader"
import { useLocation } from 'react-router-dom'

const DefaultLayout = () => {
  const location = useLocation();
  const isDashBoard = location.pathname == '/dashboard';
  console.log(isDashBoard);

  return (
    <div>
      <div className="wrapper d-flex flex-column min-vh-100">
        {isDashBoard ? <DashboardHeader/> : <HomeHeader/>}
        <div className="body flex-grow-1">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
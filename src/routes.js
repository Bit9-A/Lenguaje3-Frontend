import { elements } from 'chart.js'
import { element } from 'prop-types'
import React from 'react'




const HomePage = React.lazy(() => import('./views/pages/home/homepage'))

const ClientList = React.lazy(() => import('./views/pages/clients/clientList'))
const ProjectManagement = React.lazy(() => import('./views/pages/projects/projectManage'))
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const ClientInteractions = React.lazy(() => import('./views/pages/clients/ClientInteractions'))
const ReceivedProposals = React.lazy(() => import ('./views/pages/proposals/ReceivedProposals'))
const ProposalHistory = React.lazy(() => import ('./views/pages/proposals/ProposalHistory'))
const ProgressTracking =  React.lazy(() => import ('./views/pages/projects/ProgressTracking'))
const ServiceBooking =  React.lazy(() => import ('./views/pages/services/ServiceBooking'))
const Payments =  React.lazy(() => import ('./views/pages/payments/Payments'))



const routes = [
  { path: '/', exact: true, name: 'Home', element: HomePage},
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/clients/list', name: 'ClientList', element: ClientList },
  { path: '/projects/manage', name: 'ProjectsManage', element: ProjectManagement },
  { path: '/clients/interactions', name: 'ClientInteractions', element: ClientInteractions},
  { path: '/proposals/pending', name: 'ProposalsReceived', element: ReceivedProposals },
  { path: '/proposals/history', name: 'ProposalHistory', element: ProposalHistory },
  { path: '/projects/progress', name: 'ProgressTracking', element: ProgressTracking },
  { path: '/services/reservations', name: 'ProgressTracking', element: ServiceBooking },
  { path: '/billing/payments', name: 'Payments', element: Payments },
]

export default routes

import { elements } from 'chart.js'
import react from 'react'
import React from 'react'



const HomePage = React.lazy(() => import('./views/pages/home/homepage'))

const ClientList = React.lazy(() => import('./views/pages/clients/clientList'))
const ProjectManagement = React.lazy(() => import('./views/pages/projects/projectManage'))
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const ClientInteractions = React.lazy(() => import('./views/pages/clients/ClientInteractions'))
const ReceivedProposals = React.lazy(() => import ('./views/pages/proposals/ReceivedProposals'))


const routes = [
  { path: '/', exact: true, name: 'Home', element: HomePage},
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/clients/list', name: 'ClientList', element: ClientList },
  { path: '/projects/manage', name: 'ProjectsManage', element: ProjectManagement },
  { path: '/clients/interactions', name: 'ClientInteractions', element: ClientInteractions},
  { path: '/proposals/received', name: 'ProposalsReceived', element: ReceivedProposals },
]

export default routes

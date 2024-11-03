import React from 'react'
import classNames from 'classnames'
import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPeople, cilCloudDownload, cilUser } from '@coreui/icons'

import WidgetsDropdown from '../widgets/WidgetsDropdown'
import MainChart from './MainChart'

const Dashboard = () => {
  const metrics = {
    activeProjects: 15,
    totalClients: 120,
    totalRevenue: '$50,000',
    performanceStats: [
      { title: 'Completed Projects', value: 100 },
      { title: 'Satisfied Clients', value: 95 },
      { title: 'Current Projects', value: 15 },
    ],
  }

  const clients = [
    {
      avatar: 'src/assets/images/avatars/1.jpg',
      name: 'Yiorgos Avraamu',
      country: 'USA',
      lastInteraction: '1 day ago',
    },
    {
      avatar: 'src/assets/images/avatars/2.jpg',
      name: 'Avram Tarasios',
      country: 'Brazil',
      lastInteraction: '3 days ago',
    },
  ]

  return (
    <>
      <WidgetsDropdown className="mb-4" />
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 className="card-title mb-0">Company Status</h4>
              <div className="small text-body-secondary">Key Metrics</div>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButton color="primary" className="float-end">
                <CIcon icon={cilCloudDownload} />
              </CButton>
            </CCol>
          </CRow>
          <MainChart />
        </CCardBody>
        <CCardFooter>
          <CRow className="mb-2 text-center">
            <CCol>
              <div className="text-body-secondary">Active Projects</div>
              <div className="fw-semibold">{metrics.activeProjects}</div>
            </CCol>
            <CCol>
              <div className="text-body-secondary">Total Clients</div>
              <div className="fw-semibold">{metrics.totalClients}</div>
            </CCol>
            <CCol>
              <div className="text-body-secondary">Total Revenue</div>
              <div className="fw-semibold">{metrics.totalRevenue}</div>
            </CCol>
          </CRow>
        </CCardFooter>
      </CCard>

      <CCard className="mb-4">
        <CCardHeader>Recent Clients</CCardHeader>
        <CCardBody>
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead className="text-nowrap">
              <CTableRow>
                <CTableHeaderCell className="bg-body-tertiary text-center">
                  <CIcon icon={cilPeople} />
                </CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Client</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary text-center">
                  Country
                </CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Last Interaction</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {clients.map((client, index) => (
                <CTableRow key={index}>
                  <CTableDataCell className="text-center">
                    <CAvatar size="md" src={client.avatar} />
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{client.name}</div>
                    <div className="small text-body-secondary text-nowrap">
                      Last interaction: {client.lastInteraction}
                    </div>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">{client.country}</CTableDataCell>
                  <CTableDataCell>
                    <div className="small text-body-secondary text-nowrap">Details</div>
                    <div className="fw-semibold text-nowrap">View</div>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>

      <CCard className="mb-4">
        <CCardHeader>Current Projects</CCardHeader>
        <CCardBody>
          <CRow>
            <CCol>
              <div className="text-body-secondary">Projects in Progress</div>
              <div className="fw-semibold">5 Projects</div>
            </CCol>
            <CCol>
              <div className="text-body-secondary">Completed Projects</div>
              <div className="fw-semibold">100 Projects</div>
            </CCol>
          </CRow>
          <CButton color="primary" className="mt-3">
            View All Projects
          </CButton>
        </CCardBody>
      </CCard>

      <CCard className="mb-4">
        <CCardHeader>Service Reservations</CCardHeader>
        <CCardBody>
          <CRow>
            <CCol>
              <div className="text-body-secondary">Pending Reservations</div>
              <div className="fw-semibold">10 Reservations</div>
            </CCol>
            <CCol>
              <div className="text-body-secondary">Completed Reservations</div>
              <div className="fw-semibold">50 Reservations</div>
            </CCol>
          </CRow>
          <CButton color="primary" className="mt-3">
            View Reservation Calendar
          </CButton>
        </CCardBody>
      </CCard>

      <CCard className="mb-4">
        <CCardHeader>Billing and Payments</CCardHeader>
        <CCardBody>
          <CRow>
            <CCol>
              <div className="text-body-secondary">Pending Invoices</div>
              <div className="fw-semibold">5 Invoices</div>
            </CCol>
            <CCol>
              <div className="text-body-secondary">Total Billed</div>
              <div className="fw-semibold">$20,000</div>
            </CCol>
          </CRow>
          <CButton color="primary" className="mt-3">
            View Invoices
          </CButton>
        </CCardBody>
      </CCard>

      <CCard className="mb-4">
        <CCardHeader>Received Proposals</CCardHeader>
        <CCardBody>
          <CRow>
            <CCol>
              <div className="text-body-secondary">New Proposals</div>
              <div className="fw-semibold">3 Proposals</div>
            </CCol>
            <CCol>
              <div className="text-body-secondary">Approved Proposals</div>
              <div className="fw-semibold">15 Proposals</div>
            </CCol>
          </CRow>
          <CButton color="primary" className="mt-3">
            View Proposals
          </CButton>
        </CCardBody>
      </CCard>

      <CCard className="mb-4">
        <CCardHeader>Employee Management</CCardHeader>
        <CCardBody>
          <CRow>
            <CCol>
              <div className="text-body-secondary">Total Employees</div>
              <div className="fw-semibold">25 Employees</div>
            </CCol>
            <CCol>
              <div className="text-body-secondary">Active Employees</div>
              <div className="fw-semibold">20 Employees</div>
            </CCol>
          </CRow>
          <CButton color="primary" className="mt-3">
            View Employees
          </CButton>
        </CCardBody>
      </CCard>

      <CCard className="mb-4">
        <CCardHeader>Reports</CCardHeader>
        <CCardBody>
          <CRow>
            <CCol>
              <div className="text-body-secondary">Latest Generated Reports</div>
              <div className="fw-semibold">Sales Report - July 2024</div>
              <div className="fw-semibold">Customer Satisfaction Report - July 2024</div>
            </CCol>
            <CCol>
              <div className="text-body-secondary">Total Reports</div>
              <div className="fw-semibold">10 Reports</div>
            </CCol>
          </CRow>
          <CButton color="primary" className="mt-3">
            View All Reports
          </CButton>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Dashboard

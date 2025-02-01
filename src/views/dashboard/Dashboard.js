import React, { useState, useEffect } from 'react';
import {
  CAvatar,
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilPeople, cilCloudDownload } from '@coreui/icons';
import { helpHttp } from '../../helpers/helpHTTP';
import { baseUrl } from '../../config';
import WidgetsDropdown from '../widgets/WidgetsDropdown';
import MainChart from './MainChart';

const api = helpHttp();

const Dashboard = () => {
  const [metrics, setMetrics] = useState({
    activeProjects: 0,
    totalClients: 0,
    totalRevenue: 0,
    performanceStats: [
      { title: 'Completed Projects', value: 0 },
      { title: 'Satisfied Clients', value: 0 },
      { title: 'Current Projects', value: 0 },
    ],
  });

  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const dashboardRes = await api.get(`${baseUrl}/dashboard`);

      if (!dashboardRes.err) {
        const { metrics, recentClients, currentProjects, receivedProposals, billingAndPayments } = dashboardRes;

        setClients(recentClients);
        setProjects(currentProjects);
        setProposals(receivedProposals);
        setPayments(billingAndPayments);

        setMetrics({
          activeProjects: metrics.activeProjects,
          totalClients: metrics.totalClients,
          totalRevenue: `$${metrics.totalRevenue.toLocaleString()}`,
          performanceStats: [
            { title: 'Completed Projects', value: metrics.completedProjects },
            { title: 'Satisfied Clients', value: metrics.totalClients }, // Assuming all clients are satisfied
            { title: 'Current Projects', value: metrics.activeProjects },
          ],
        });
      } else {
        console.error('Error fetching dashboard data');
      }
    };

    fetchData();
  }, []);

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
                <CTableHeaderCell className="bg-body-tertiary text-center">Email</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Phone</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {clients.slice(0, 5).map((client) => (
                <CTableRow key={client.id}>
                  <CTableDataCell className="text-center">
                    <CAvatar size="md" src={`https://ui-avatars.com/api/?name=${client.firstname}+${client.lastname}`} />
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{`${client.firstname} ${client.lastname}`}</div>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">{client.email}</CTableDataCell>
                  <CTableDataCell>
                    <div className="small text-body-secondary">{client.phone}</div>
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
              <div className="fw-semibold">{projects.filter(project => project.status === 'In Progress').length} Projects</div>
            </CCol>
            <CCol>
              <div className="text-body-secondary">Completed Projects</div>
              <div className="fw-semibold">{projects.filter(project => project.status === 'Completed').length} Projects</div>
            </CCol>
          </CRow>
          <CButton color="primary" className="mt-3">
            View All Projects
          </CButton>
        </CCardBody>
      </CCard>

      <CCard className="mb-4">
        <CCardHeader>Received Proposals</CCardHeader>
        <CCardBody>
          <CRow>
            <CCol>
              <div className="text-body-secondary">New Proposals</div>
              <div className="fw-semibold">{proposals.filter(proposal => proposal.status === 'Pending').length} Proposals</div>
            </CCol>
            <CCol>
              <div className="text-body-secondary">Approved Proposals</div>
              <div className="fw-semibold">{proposals.filter(proposal => proposal.status === 'Accepted').length} Proposals</div>
            </CCol>
          </CRow>
          <CButton color="primary" className="mt-3">
            View Proposals
          </CButton>
        </CCardBody>
      </CCard>

      <CCard className="mb-4">
        <CCardHeader>Billing and Payments</CCardHeader>
        <CCardBody>
          <CRow>
            <CCol>
              <div className="text-body-secondary">Total Payments</div>
              <div className="fw-semibold">{payments.length} Payments</div>
            </CCol>
            <CCol>
              <div className="text-body-secondary">Total Billed</div>
              <div className="fw-semibold">${payments.reduce((sum, payment) => sum + payment.amount, 0).toLocaleString()}</div>
            </CCol>
          </CRow>
          <CButton color="primary" className="mt-3">
            View Invoices
          </CButton>
        </CCardBody>
      </CCard>
    </>
  );
};

export default Dashboard;
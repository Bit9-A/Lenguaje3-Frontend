import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CCollapse,
  CBadge,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilChevronBottom, cilChevronRight } from '@coreui/icons'

const Payments = () => {
  const [projects] = useState([
    {
      id: 1,
      name: 'Modern Kitchen Renovation',
      client: 'John Smith',
      totalCost: 15000,
      status: 'In Progress',
      services: [
        { id: 1, name: 'Design Consultation', cost: 1000 },
        { id: 2, name: 'Demolition', cost: 2000 },
        { id: 3, name: 'Cabinetry Installation', cost: 5000 },
        { id: 4, name: 'Countertop Installation', cost: 3000 },
        { id: 5, name: 'Appliance Installation', cost: 4000 },
      ],
    },
    {
      id: 2,
      name: 'Master Bathroom Remodel',
      client: 'Mary Johnson',
      totalCost: 12000,
      status: 'Completed',
      services: [
        { id: 1, name: 'Design Consultation', cost: 800 },
        { id: 2, name: 'Demolition', cost: 1500 },
        { id: 3, name: 'Tiling', cost: 3500 },
        { id: 4, name: 'Plumbing Fixtures', cost: 4000 },
        { id: 5, name: 'Vanity Installation', cost: 2200 },
      ],
    },
    {
      id: 3,
      name: 'Living Room Extension',
      client: 'Robert Davis',
      totalCost: 20000,
      status: 'Pending',
      services: [
        { id: 1, name: 'Architectural Design', cost: 2000 },
        { id: 2, name: 'Foundation Work', cost: 5000 },
        { id: 3, name: 'Framing and Drywall', cost: 6000 },
        { id: 4, name: 'Electrical Work', cost: 3000 },
        { id: 5, name: 'Flooring', cost: 4000 },
      ],
    },
  ])

  const [visibleProject, setVisibleProject] = useState(null)

  const toggleProjectDetails = (projectId) => {
    setVisibleProject(visibleProject === projectId ? null : projectId)
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return <CBadge color="success">{status}</CBadge>
      case 'In Progress':
        return <CBadge color="primary">{status}</CBadge>
      case 'Pending':
        return <CBadge color="warning">{status}</CBadge>
      default:
        return <CBadge color="secondary">{status}</CBadge>
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Payments and Invoices</strong>
          </CCardHeader>
          <CCardBody>
            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell>Project Name</CTableHeaderCell>
                  <CTableHeaderCell>Client</CTableHeaderCell>
                  <CTableHeaderCell>Total Cost</CTableHeaderCell>
                  <CTableHeaderCell>Status</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {projects.map((project) => (
                  <React.Fragment key={project.id}>
                    <CTableRow>
                      <CTableDataCell>{project.name}</CTableDataCell>
                      <CTableDataCell>{project.client}</CTableDataCell>
                      <CTableDataCell>${project.totalCost.toLocaleString()}</CTableDataCell>
                      <CTableDataCell>{getStatusBadge(project.status)}</CTableDataCell>
                      <CTableDataCell>
                        <CButton 
                                               color="primary" 
                                               variant="ghost" 
                                               size="sm"
                                               onClick={() => toggleProjectDetails(project.id)}
                                               className="me-2"
                                             >
                                               <CIcon icon={visibleProject === project.id ? cilChevronBottom : cilChevronRight} />
                                               {visibleProject === project.id ? 'Hide' : 'Show'} Details
                                             </CButton>
                                           </CTableDataCell>
                                         </CTableRow>
                                         <CTableRow>
                                           <CTableDataCell colSpan={5} className="p-0">
                                             <CCollapse visible={visibleProject === project.id}>
                                               <CCard className="m-3">
                                                 <CCardHeader>
                                                   <strong>Services for {project.name}</strong>
                                                 </CCardHeader>
                                                 <CCardBody>
                                                   <CTable bordered small>
                                                     <CTableHead>
                                                       <CTableRow>
                                                         <CTableHeaderCell>Service Name</CTableHeaderCell>
                                                         <CTableHeaderCell>Cost</CTableHeaderCell>
                                                       </CTableRow>
                                                     </CTableHead>
                                                     <CTableBody>
                                                       {project.services.map((service) => (
                                                         <CTableRow key={service.id}>
                                                           <CTableDataCell>{service.name}</CTableDataCell>
                                                           <CTableDataCell>${service.cost.toLocaleString()}</CTableDataCell>
                                                         </CTableRow>
                                                       ))}
                                                     </CTableBody>
                                                   </CTable>
                                                 </CCardBody>
                                               </CCard>
                                             </CCollapse>
                                           </CTableDataCell>
                                         </CTableRow>
                                       </React.Fragment>
                                     ))}
                                   </CTableBody>
                                 </CTable>
                               </CCardBody>
                             </CCard>
                           </CCol>
                         </CRow>
                       )
                     }
                     
                     export default Payments
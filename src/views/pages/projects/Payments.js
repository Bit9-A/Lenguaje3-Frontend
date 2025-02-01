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
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CAlert,
  CFormSwitch,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilChevronBottom, cilChevronRight, cilFile, cilCheckCircle, cilXCircle, cilEnvelopeClosed } from '@coreui/icons'
import { baseUrl } from '../../../config' // Importar baseUrl

const Payments = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'Modern Kitchen Renovation',
      client: 'John Smith',
      totalCost: 15000,
      status: 'In Progress',
      services: [
        { id: 1, name: 'Design Consultation', cost: 1000, paid: true },
        { id: 2, name: 'Demolition', cost: 2000, paid: true },
        { id: 3, name: 'Cabinetry Installation', cost: 5000, paid: false },
        { id: 4, name: 'Countertop Installation', cost: 3000, paid: false },
        { id: 5, name: 'Appliance Installation', cost: 4000, paid: false },
      ],
      invoice: {
        number: 'INV-2023-001',
        date: '2023-05-15',
        dueDate: '2023-06-15',
        paymentStatus: 'Partial',
        amountPaid: 3000,
      }
    },
    {
      id: 2,
      name: 'Master Bathroom Remodel',
      client: 'Mary Johnson',
      totalCost: 12000,
      status: 'Completed',
      services: [
        { id: 1, name: 'Design Consultation', cost: 800, paid: true },
        { id: 2, name: 'Demolition', cost: 1500, paid: true },
        { id: 3, name: 'Tiling', cost: 3500, paid: true },
        { id: 4, name: 'Plumbing Fixtures', cost: 4000, paid: true },
        { id: 5, name: 'Vanity Installation', cost: 2200, paid: true },
      ],
      invoice: {
        number: 'INV-2023-002',
        date: '2023-04-01',
        dueDate: '2023-05-01',
        paymentStatus: 'Paid',
        amountPaid: 12000,
      }
    },
    {
      id: 3,
      name: 'Living Room Extension',
      client: 'Robert Davis',
      totalCost: 20000,
      status: 'Pending',
      services: [
        { id: 1, name: 'Architectural Design', cost: 2000, paid: false },
        { id: 2, name: 'Foundation Work', cost: 5000, paid: false },
        { id: 3, name: 'Framing and Drywall', cost: 6000, paid: false },
        { id: 4, name: 'Electrical Work', cost: 3000, paid: false },
        { id: 5, name: 'Flooring', cost: 4000, paid: false },
      ],
      invoice: {
        number: 'INV-2023-003',
        date: '2023-06-01',
        dueDate: '2023-07-01',
        paymentStatus: 'Unpaid',
        amountPaid: 0,
      }
    },
  ])

  const [visibleProject, setVisibleProject] = useState(null)
  const [selectedInvoice, setSelectedInvoice] = useState(null)
  const [alertMessage, setAlertMessage] = useState(null)

  const toggleProjectDetails = (projectId) => {
    setVisibleProject(visibleProject === projectId ? null : projectId)
  }

  const openInvoice = (invoice, project) => {
    setSelectedInvoice({ ...invoice, project })
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

  const getPaymentStatusBadge = (status) => {
    switch (status) {
      case 'Paid':
        return <CBadge color="success">{status}</CBadge>
      case 'Partial':
        return <CBadge color="warning">{status}</CBadge>
      case 'Unpaid':
        return <CBadge color="danger">{status}</CBadge>
      default:
        return <CBadge color="secondary">{status}</CBadge>
    }
  }

  const getPaymentIcon = (paid) => {
    return paid ? 
      <CIcon icon={cilCheckCircle} className="text-success me-2" /> : 
      <CIcon icon={cilXCircle} className="text-danger me-2" />
  }

  const canSendInvoice = (project) => {
    return project.status === 'Completed' || project.services.some(service => service.paid)
  }

  const sendInvoice = (project) => {
    console.log(`Sending invoice for project: ${project.name}`)
    setAlertMessage(`Invoice for ${project.name} has been sent to ${project.client}.`)
    setTimeout(() => setAlertMessage(null), 5000)
  }

  const toggleServicePayment = (projectId, serviceId) => {
    setProjects(projects.map(project => {
      if (project.id === projectId) {
        const updatedServices = project.services.map(service => 
          service.id === serviceId ? { ...service, paid: !service.paid } : service
        )
        const amountPaid = updatedServices.reduce((sum, service) => service.paid ? sum + service.cost : sum, 0)
        const paymentStatus = amountPaid === project.totalCost ? 'Paid' : amountPaid > 0 ? 'Partial' : 'Unpaid'
        return {
          ...project,
          services: updatedServices,
          invoice: {
            ...project.invoice,
            paymentStatus,
            amountPaid,
          }
        }
      }
      return project
    }))
  }

  return (
    <CRow>
      <CCol xs={12}>
        {alertMessage && (
          <CAlert color="success" dismissible onClose={() => setAlertMessage(null)}>
            {alertMessage}
          </CAlert>
        )}
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
                  <CTableHeaderCell className="text-center">Payment Status</CTableHeaderCell>
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
                      <CTableDataCell className="text-center">
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
                        <CButton
                          color="info"
                          variant="ghost"
                          size="sm"
                          onClick={() => openInvoice(project.invoice, project)}
                          className="me-2"
                        >
                          <CIcon icon={cilFile} /> View Invoice
                        </CButton>
                        {canSendInvoice(project) && (
                          <CButton
                            color="success"
                            variant="ghost"
                            size="sm"
                            onClick={() => sendInvoice(project)}
                          >
                            <CIcon icon={cilEnvelopeClosed} /> Send Invoice
                          </CButton>
                        )}
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
                                    <CTableHeaderCell>Payment Status</CTableHeaderCell>
                                    <CTableHeaderCell>Actions</CTableHeaderCell>
                                  </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                  {project.services.map((service) => (
                                    <CTableRow key={service.id}>
                                      <CTableDataCell>{service.name}</CTableDataCell>
                                      <CTableDataCell>${service.cost.toLocaleString()}</CTableDataCell>
                                      <CTableDataCell>
                                        {getPaymentIcon(service.paid)}
                                        {service.paid ? 'Paid' : 'Unpaid'}
                                      </CTableDataCell>
                                      <CTableDataCell className="text-center">
                                        <CFormSwitch 
                                          id={`service-paid-${project.id}-${service.id}`}
                                          label={service.paid ? "Paid" : "Unpaid"}
                                          checked={service.paid}
                                          onChange={() => toggleServicePayment(project.id, service.id)}
                                        />
                                      </CTableDataCell>
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

      <CModal visible={!!selectedInvoice} onClose={() => setSelectedInvoice(null)} size="lg">
        <CModalHeader closeButton>
          <CModalTitle>Invoice {selectedInvoice?.number}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {selectedInvoice && (
            <>
              <CRow className="mb-3">
                <CCol><strong>Project:</strong> {selectedInvoice.project.name}</CCol>
                <CCol><strong>Client:</strong> {selectedInvoice.project.client}</CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol><strong>Invoice Date:</strong> {selectedInvoice.date}</CCol>
                <CCol><strong>Due Date:</strong> {selectedInvoice.dueDate}</CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol><strong>Total Amount:</strong> ${selectedInvoice.project.totalCost.toLocaleString()}</CCol>
                <CCol><strong>Amount Paid:</strong> ${selectedInvoice.amountPaid.toLocaleString()}</CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol><strong>Payment Status:</strong> {getPaymentStatusBadge(selectedInvoice.paymentStatus)}</CCol>
              </CRow>
              <CTable bordered>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Service</CTableHeaderCell>
                    <CTableHeaderCell>Cost</CTableHeaderCell>
                    <CTableHeaderCell>Payment Status</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {selectedInvoice.project.services.map((service) => (
                    <CTableRow key={service.id}>
                      <CTableDataCell>{service.name}</CTableDataCell>
                      <CTableDataCell>${service.cost.toLocaleString()}</CTableDataCell>
                      <CTableDataCell>
                        {getPaymentIcon(service.paid)}
                        {service.paid ? 'Paid' : 'Unpaid'}
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setSelectedInvoice(null)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  )
}

export default Payments
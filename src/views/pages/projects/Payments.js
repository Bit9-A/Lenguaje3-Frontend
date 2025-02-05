import React, { useState, useEffect } from 'react'
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
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CBadge,
  CSpinner,
  CAlert,
  CProgress,
  CTooltip,
  CInputGroup,
  CInputGroupText,
  CFormInput,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { 
  cilDollar, 
  cilMoney, 
  cilCheckCircle, 
  cilWarning,
  cilInfo,
  cilCloudDownload,
} from '@coreui/icons'
import { helpHttp } from '../../../helpers/helpHTTP'
import { baseUrl } from '../../../config'

const api = helpHttp()

const Payments = () => {
  const [projects, setProjects] = useState([])
  const [selectedProject, setSelectedProject] = useState(null)
  const [unpaidServices, setUnpaidServices] = useState([])
  const [paidServices, setPaidServices] = useState([])
  const [unpaidMaterials, setUnpaidMaterials] = useState([])
  const [paidMaterials, setPaidMaterials] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [totalCost, setTotalCost] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    setLoading(true)
    try {
      const response = await api.get(`${baseUrl}/projects`)
      if (!response.err) {
        setProjects(response)
      } else {
        throw new Error(response.err)
      }
    } catch (err) {
      console.error('Error fetching projects:', err)
      setError('Failed to fetch projects. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const fetchProjectDetails = async (projectId) => {
    setLoading(true)
    try {
      const [unpaidServicesResponse, paidServicesResponse, unpaidMaterialsResponse, paidMaterialsResponse] = await Promise.all([
        api.get(`${baseUrl}/payments/unpaid-services/${projectId}`),
        api.get(`${baseUrl}/payments/paid-services/${projectId}`),
        api.get(`${baseUrl}/payments/unpaid-materials/${projectId}`),
        api.get(`${baseUrl}/payments/paid-materials/${projectId}`)
      ])

      if (!unpaidServicesResponse.err) setUnpaidServices(unpaidServicesResponse)
      if (!paidServicesResponse.err) setPaidServices(paidServicesResponse)
      if (!unpaidMaterialsResponse.err) setUnpaidMaterials(unpaidMaterialsResponse)
      if (!paidMaterialsResponse.err) setPaidMaterials(paidMaterialsResponse)
    } catch (err) {
      console.error('Error fetching project details:', err)
      setError('Failed to fetch project details. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const fetchTotalCost = async (projectId) => {
    try {
      const totalCostResponse = await api.get(`${baseUrl}/payments/total-cost/${projectId}`)
      if (!totalCostResponse.err) {
        const totalCost = totalCostResponse.total_cost || 0
        setTotalCost(totalCost)
      }
    } catch (err) {
      console.error('Error fetching total cost:', err)
      setError('Failed to fetch total cost. Please try again.')
    }
  }

  const handleProjectClick = (project) => {
    setSelectedProject(project)
    fetchProjectDetails(project.id)
    fetchTotalCost(project.id)
    setShowModal(true)
  }

  const handleUpdatePaymentStatus = async (itemId, itemType, isPaid) => {
    try {
      const endpoint = itemType === 'service' ? 'update-service-payment' : 'update-material-payment'
      const response = await api.put(`${baseUrl}/payments/${endpoint}/use`, {
        body: { project_id: selectedProject.id, [`${itemType}_id`]: itemId, is_paid: isPaid },
        headers: { 'Content-Type': 'application/json' }
      })
      if (!response.err) {
       
        const paymentData = {
          amount: itemType === 'service' ? unpaidServices.find(service => service.service_id === itemId).service_price : unpaidMaterials.find(material => material.material_id === itemId).material_price,
          payment_date: new Date().toISOString().split('T')[0],
          project_id: selectedProject.id,
          payment_type_id: 1, 
          description: `Payment for ${itemType} ID ${itemId}`,
          [`${itemType}_id`]: itemId
        }
        await api.post(`${baseUrl}/payments`, { body: paymentData, headers: { 'Content-Type': 'application/json' } })

        fetchProjectDetails(selectedProject.id)
        fetchTotalCost(selectedProject.id)
      } else {
        throw new Error(response.err)
      }
    } catch (err) {
      console.error(`Error updating ${itemType} payment status:`, err)
      setError(`Failed to update ${itemType} payment status. Please try again.`)
    }
  }
  const handleGenerateExcel = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${baseUrl}/payments/generate-excel/use`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'estadisticas_ingresos.xlsx';
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      console.error('Error generating Excel file:', err);
      setError('Failed to generate Excel file. Please try again.');
    }
  }


  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.client_name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'success'
      case 'In Progress':
        return 'primary'
      default:
        return 'warning'
    }
  }

  const calculatePaymentProgress = (paid, unpaid) => {
    const total = paid.length + unpaid.length
    return total > 0 ? (paid.length / total) * 100 : 0
  }

  if (loading && projects.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <CSpinner color="primary" />
      </div>
    )
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Project Payments</strong>
            <CButton color="success" className="float-end" onClick={handleGenerateExcel}>
              <CIcon icon={cilCloudDownload} className="me-2" />
              Generate Excel
            </CButton>
          </CCardHeader>
          <CCardBody>
            {error && (
              <CAlert color="danger" dismissible onClose={() => setError(null)}>
                {error}
              </CAlert>
            )}
            <CInputGroup className="mb-3">
              <CInputGroupText>
                <CIcon icon={cilInfo} />
              </CInputGroupText>
              <CFormInput
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </CInputGroup>
            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell>Project Name</CTableHeaderCell>
                  <CTableHeaderCell>Client</CTableHeaderCell>
                  <CTableHeaderCell>Status</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {filteredProjects.map((project) => (
                  <CTableRow key={project.id}>
                    <CTableDataCell>{project.name}</CTableDataCell>
                    <CTableDataCell>{project.client_name}</CTableDataCell>
                    <CTableDataCell>
                      <CBadge color={getStatusColor(project.status)}>
                        {project.status}
                      </CBadge>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CButton color="info" variant="outline" onClick={() => handleProjectClick(project)}>
                        <CIcon icon={cilDollar} className="me-2" />
                        View Payments
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>

      <CModal visible={showModal} onClose={() => setShowModal(false)} size="xl">
        <CModalHeader onClose={() => setShowModal(false)}>
          <CModalTitle>
            <CIcon icon={cilMoney} className="me-2" />
            Payment Details: {selectedProject?.name}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          {loading ? (
            <div className="text-center">
              <CSpinner color="primary" />
            </div>
          ) : (
            selectedProject && (
              <>
                <CRow>
                  <CCol md={6}>
                    <h5>Services</h5>
                    <CTable bordered small>
                      <CTableHead>
                        <CTableRow>
                          <CTableHeaderCell>Service</CTableHeaderCell>
                          <CTableHeaderCell>Cost</CTableHeaderCell>
                          <CTableHeaderCell>Status</CTableHeaderCell>
                          <CTableHeaderCell>Actions</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {[...unpaidServices, ...paidServices].map((service) => (
                          <CTableRow key={service.service_id}>
                            <CTableDataCell>{service.service_name}</CTableDataCell>
                            <CTableDataCell>${service.service_price.toLocaleString()}</CTableDataCell>
                            <CTableDataCell>
                              <CBadge color={service.is_paid ? 'success' : 'danger'}>
                                {service.is_paid ? 'Paid' : 'Unpaid'}
                              </CBadge>
                            </CTableDataCell>
                            <CTableDataCell>
                              {!service.is_paid && (
                                <CButton 
                                  color="success" 
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleUpdatePaymentStatus(service.service_id, 'service', true)}
                                >
                                  <CIcon icon={cilCheckCircle} /> Mark as Paid
                                </CButton>
                              )}
                            </CTableDataCell>
                          </CTableRow>
                        ))}
                      </CTableBody>
                    </CTable>
                  </CCol>
                  <CCol md={6}>
                    <h5>Materials</h5>
                    <CTable bordered small>
                      <CTableHead>
                        <CTableRow>
                          <CTableHeaderCell>Material</CTableHeaderCell>
                          <CTableHeaderCell>Cost</CTableHeaderCell>
                          <CTableHeaderCell>Status</CTableHeaderCell>
                          <CTableHeaderCell>Actions</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {[...unpaidMaterials, ...paidMaterials].map((material) => (
                          <CTableRow key={material.material_id}>
                            <CTableDataCell>{material.material_name}</CTableDataCell>
                            <CTableDataCell>${material.material_price.toLocaleString()}</CTableDataCell>
                            <CTableDataCell>
                              <CBadge color={material.is_paid ? 'success' : 'danger'}>
                                {material.is_paid ? 'Paid' : 'Unpaid'}
                              </CBadge>
                            </CTableDataCell>
                            <CTableDataCell>
                              {!material.is_paid && (
                                <CButton 
                                  color="success" 
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleUpdatePaymentStatus(material.material_id, 'material', true)}
                                >
                                  <CIcon icon={cilCheckCircle} /> Mark as Paid
                                </CButton>
                              )}
                            </CTableDataCell>
                          </CTableRow>
                        ))}
                      </CTableBody>
                    </CTable>
                  </CCol>
                </CRow>
                <CRow className="mt-4">
                  <CCol>
                    <CCard>
                      <CCardBody>
                        <h5>Payment Summary</h5>
                        <div className="d-flex justify-content-between align-items-center">
                          <span>Total Cost:</span>
                          <strong>${totalCost.toLocaleString()}</strong>
                        </div>
                        <CProgress 
                          className="mt-3" 
                          value={calculatePaymentProgress(paidServices, unpaidServices)} 
                          color="success"
                        />
                        <small className="text-muted">
                          {calculatePaymentProgress(paidServices, unpaidServices).toFixed(2)}% of services paid
                        </small>
                        <CProgress 
                          className="mt-3" 
                          value={calculatePaymentProgress(paidMaterials, unpaidMaterials)} 
                          color="info"
                        />
                        <small className="text-muted">
                          {calculatePaymentProgress(paidMaterials, unpaidMaterials).toFixed(2)}% of materials paid
                        </small>
                      </CCardBody>
                    </CCard>
                  </CCol>
                </CRow>
              </>
            )
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowModal(false)}>Close</CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  )
}

export default Payments
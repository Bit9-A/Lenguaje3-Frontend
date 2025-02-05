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
  CBadge,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CAvatar,
  CProgress,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CForm,
  CFormLabel,
  CFormInput,
  CFormTextarea,
  CFormSelect,
  CSpinner,
  CAlert,
  CListGroup,
  CListGroupItem,
  CTooltip,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { 
  cilOptions, 
  cilList, 
  cilPencil, 
  cilCalendar, 
  cilPlus, 
  cilChartLine,
  cilWarning,
  cilCheckCircle,
} from '@coreui/icons'
import { helpHttp } from '../../../helpers/helpHTTP'
import { baseUrl } from '../../../config'

const api = helpHttp()

const ProgressTracking = () => {
  const [projects, setProjects] = useState([])
  const [selectedProject, setSelectedProject] = useState(null)
  const [selectedService, setSelectedService] = useState(null)
  const [services, setServices] = useState([])
  const [serviceProgress, setServiceProgress] = useState([])
  const [showProjectModal, setShowProjectModal] = useState(false)
  const [showServiceModal, setShowServiceModal] = useState(false)
  const [showProgressModal, setShowProgressModal] = useState(false)
  const [progressDescription, setProgressDescription] = useState('')
  const [progressDate, setProgressDate] = useState('')
  const [progressStatus, setProgressStatus] = useState('In Progress')
  const [editingProgress, setEditingProgress] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

  const fetchServices = async (projectId) => {
    setLoading(true)
    try {
      const response = await api.get(`${baseUrl}/projects/services/${projectId}`)
      if (!response.err) {
        setServices(response)
      } else {
        throw new Error(response.err)
      }
    } catch (err) {
      console.error('Error fetching services:', err)
      setError('Failed to fetch services. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const fetchServiceProgress = async (projectServiceId) => {
    setLoading(true)
    try {
      const response = await api.get(`${baseUrl}/projects/service-progress/${projectServiceId}`)
      if (!response.err) {
        setServiceProgress(response)
      } else {
        throw new Error(response.err)
      }
    } catch (err) {
      console.error('Error fetching service progress:', err)
      setError('Failed to fetch service progress. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleProjectClick = (project) => {
    setSelectedProject(project)
    fetchServices(project.id)
    setShowProjectModal(true)
  }

  const handleServiceClick = (service) => {
    setSelectedService(service)
    fetchServiceProgress(service.id)
    setShowServiceModal(true)
  }

  const handleAddProgress = () => {
    setEditingProgress(null)
    setProgressDescription('')
    setProgressDate('')
    setProgressStatus('In Progress')
    setShowProgressModal(true)
  }

  const handleEditProgress = (progress) => {
    setEditingProgress(progress)
    setProgressDescription(progress.progress_description)
    setProgressDate(new Date(progress.progress_date).toISOString().split('T')[0])
    setProgressStatus(progress.status)
    setShowProgressModal(true)
  }

  const handleSaveProgress = async () => {
    const progressData = {
      project_service_id: selectedService.id,
      progress_description: progressDescription,
      progress_date: progressDate,
      status: progressStatus,
      visible: true,
      service_id: selectedService.id
    }

    try {
      let response
      if (editingProgress) {
        response = await api.put(`${baseUrl}/projects/service-progress/${editingProgress.id}`, {
          body: progressData,
          headers: { 'Content-Type': 'application/json' }
        })
      } else {
        response = await api.post(`${baseUrl}/projects/service-progress`, {
          body: progressData,
          headers: { 'Content-Type': 'application/json' }
        })
      }

      if (!response.err) {
        fetchServiceProgress(selectedService.id)
        setShowProgressModal(false)
      } else {
        throw new Error(response.err)
      }
    } catch (err) {
      console.error('Error saving progress:', err)
      setError('Failed to save progress. Please try again.')
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'success'
      case 'In Progress':
        return 'primary'
      case 'Delayed':
        return 'warning'
      default:
        return 'secondary'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed':
        return cilCheckCircle
      case 'In Progress':
        return ''
      case 'Delayed':
        return cilWarning
      default:
        return cilOptions
    }
  }

  if (loading) {
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
            <CIcon icon={cilChartLine} className="me-2" />
            Progress Tracking
          </CCardHeader>
          <CCardBody>
            {error && (
              <CAlert color="danger" dismissible onClose={() => setError(null)}>
                {error}
              </CAlert>
            )}
            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell className="text-center" style={{width: '50px'}}>#</CTableHeaderCell>
                  <CTableHeaderCell>Project Details</CTableHeaderCell>
                  <CTableHeaderCell>Client</CTableHeaderCell>
                  <CTableHeaderCell>Progress</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Status</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {projects.map((project, index) => (
                  <CTableRow key={project.id}>
                    <CTableDataCell className="text-center">
                      {index + 1}
                    </CTableDataCell>
                    <CTableDataCell>
                      <div className="d-flex flex-column">
                        <strong>{project.name}</strong>
                        <small className="text-medium-emphasis">
                          <CIcon icon={cilCalendar} size="sm" className="me-1" />
                          {new Date(project.start_date).toLocaleDateString()}
                          {project.end_date && ` - ${new Date(project.end_date).toLocaleDateString()}`}
                        </small>
                      </div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div className="d-flex align-items-center">
                        <CAvatar size="md" src={project.client_photo || '/placeholder.svg'} className="me-2" />
                        <div>
                          <div>{project.client_name}</div>
                          <small className="text-medium-emphasis">{project.client_email}</small>
                        </div>
                      </div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div className="d-flex align-items-center">
                        <div style={{flex: 1}}>
                          <CProgress thin color={getStatusColor(project.status)} value={project.progress || 0} className="mb-1" />
                          <small className="text-medium-emphasis">{project.progress || 0}% Complete</small>
                        </div>
                      </div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CTooltip content={project.status}>
                        <CBadge color={getStatusColor(project.status)}>
                          <CIcon icon={getStatusIcon(project.status)} size="lg" />
                        </CBadge>
                      </CTooltip>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CDropdown alignment="end">
                        <CDropdownToggle color="transparent" caret={false} className="p-0">
                          <CIcon icon={cilOptions} />
                        </CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem onClick={() => handleProjectClick(project)}>
                            <CIcon icon={cilList} className="me-2" /> Details
                          </CDropdownItem>
                        </CDropdownMenu>
                      </CDropdown>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>

      <CModal visible={showProjectModal} onClose={() => setShowProjectModal(false)} size="lg">
        <CModalHeader onClose={() => setShowProjectModal(false)}>
          <CModalTitle>Project Services: {selectedProject?.name}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {services.length > 0 ? (
            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell className="text-center">Service</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Status</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Progress</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {services.map((service) => (
                  <CTableRow key={service.id}>
                    <CTableDataCell>
                      <div className="d-flex align-items-center">
                        <CIcon icon={''} className="me-2 text-primary" />
                        {service.name}
                      </div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CBadge color={getStatusColor(service.status)}>
                        {service.status}
                      </CBadge>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CProgress thin color={getStatusColor(service.status)} value={service.progress || 0} className="mb-1" />
                      <small className="text-medium-emphasis">{service.progress || 0}% Complete</small>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CButton color="info" variant="ghost" onClick={() => handleServiceClick(service)}>
                        View Progress
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          ) : (
            <p className="text-center text-muted">No services found for this project.</p>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowProjectModal(false)}>Close</CButton>
        </CModalFooter>
      </CModal>

      <CModal visible={showServiceModal} onClose={() => setShowServiceModal(false)} size="lg">
        <CModalHeader onClose={() => setShowServiceModal(false)}>
          <CModalTitle>Service Progress: {selectedService?.name}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CButton color="primary" className="mb-3" onClick={handleAddProgress}>
            <CIcon icon={cilPlus} className="me-2" /> Add Progress
          </CButton>
          {serviceProgress.length > 0 ? (
            <CListGroup>
              {serviceProgress.map((progress) => (
                <CListGroupItem key={progress.id} className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6>{progress.progress_description}</h6>
                    <small className="text-medium-emphasis">
                      {new Date(progress.progress_date).toLocaleDateString()}
                    </small>
                  </div>
                  <div className="d-flex align-items-center">
                    <CBadge color={getStatusColor(progress.status)} className="me-2">
                      {progress.status}
                    </CBadge>
                    <CButton color="light" variant="ghost" size="sm" onClick={() => handleEditProgress(progress)}>
                      <CIcon icon={cilPencil} />
                    </CButton>
                  </div>
                </CListGroupItem>
              ))}
            </CListGroup>
          ) : (
            <p className="text-center text-muted">No progress entries found for this service.</p>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowServiceModal(false)}>Close</CButton>
        </CModalFooter>
      </CModal>

      <CModal visible={showProgressModal} onClose={() => setShowProgressModal(false)}>
        <CModalHeader onClose={() => setShowProgressModal(false)}>
          <CModalTitle>{editingProgress ? 'Edit Progress' : 'Add Progress'}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={(e) => { e.preventDefault(); handleSaveProgress(); }}>
            <div className="mb-3">
              <CFormLabel htmlFor="progressDescription">Description</CFormLabel>
              <CFormTextarea
                id="progressDescription"
                value={progressDescription}
                onChange={(e) => setProgressDescription(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="progressDate">Date</CFormLabel>
              <CFormInput
                type="date"
                id="progressDate"
                value={progressDate}
                onChange={(e) => setProgressDate(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="progressStatus">Status</CFormLabel>
              <CFormSelect
                id="progressStatus"
                value={progressStatus}
                onChange={(e) => setProgressStatus(e.target.value)}
              >
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Delayed">Delayed</option>
              </CFormSelect>
            </div>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowProgressModal(false)}>Cancel</CButton>
          <CButton color="primary" onClick={handleSaveProgress}>Save Progress</CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  )
}

export default ProgressTracking

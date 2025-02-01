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
  CBadge,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
  CFormSelect,
  CFormTextarea,
  CFormLabel,
  CAvatar,
  CProgress,
  CTooltip,
  CAlert,
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { 
  cilOptions, 
  cilPlus, 
  cilPencil, 
  cilTrash, 
  cilList, 
  cilUser, 
  cilCalendar, 
  cilDollar,
  cilCloudUpload,
  cilPeople,
  cilBuilding,
  cilCart,
  cilWrench,
} from '@coreui/icons'
import { helpHttp } from '../../../helpers/helpHTTP'
import { baseUrl } from '../../../config'

const ProjectManagement = () => {
  const [projects, setProjects] = useState([])
  const [employees, setEmployees] = useState([])
  const [materials, setMaterials] = useState([])
  const [services, setServices] = useState([])
  const [availableEmployees, setAvailableEmployees] = useState([])
  const [availableMaterials, setAvailableMaterials] = useState([])
  const [availableServices, setAvailableServices] = useState([])
  const [selectedProject, setSelectedProject] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [clients, setClients] = useState([])
  const [editingMaterial, setEditingMaterial] = useState(null)
  const [materialQuantity, setMaterialQuantity] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    start_date: '',
    end_date: '',
    client_id: '',
    status: 'Planning'
  })

  const api = helpHttp()

  useEffect(() => {
    fetchProjects()
    fetchAvailableResources()
    fetchClients()
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
      handleApiError(err, 'Error fetching projects:')
    } finally {
      setLoading(false)
    }
  }

  const fetchAvailableResources = async () => {
    try {
      const employeesResponse = await api.get(`${baseUrl}/employees`)
      const materialsResponse = await api.get(`${baseUrl}/materials`)
      const servicesResponse = await api.get(`${baseUrl}/services`)

      if (!employeesResponse.err) setAvailableEmployees(employeesResponse)
      if (!materialsResponse.err) setAvailableMaterials(materialsResponse)
      if (!servicesResponse.err) setAvailableServices(servicesResponse)
    } catch (err) {
      handleApiError(err, 'Error fetching resources:')
    }
  }

  const fetchClients = async () => {
    try {
      const response = await api.get(`${baseUrl}/clients`)
      if (!response.err) {
        setClients(response)
      } else {
        throw new Error(response.err)
      }
    } catch (err) {
      handleApiError(err, 'Error fetching clients:')
    }
  }

  const fetchProjectDetails = async (projectId) => {
    setLoading(true)
    try {
      const employeesResponse = await api.get(`${baseUrl}/projects/${projectId}/employees`)
      const materialsResponse = await api.get(`${baseUrl}/projects/${projectId}/materials`)
      const servicesResponse = await api.get(`${baseUrl}/projects/${projectId}/services`)

      if (!employeesResponse.err) setEmployees(employeesResponse)
      if (!materialsResponse.err) setMaterials(materialsResponse)
      if (!servicesResponse.err) setServices(servicesResponse)
    } catch (err) {
      handleApiError(err, 'Error fetching project details:')
    } finally {
      setLoading(false)
    }
  }

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0])
  }

  const handleUpload = async () => {
    try {
      if (!selectedFile || !selectedProject) return

      const formData = new FormData()
      formData.append('photo', selectedFile)
      formData.append('project_id', selectedProject.id)
      
      const response = await api.post(`${baseUrl}/projects/photos`, { 
        body: formData,
        headers: {
          'Content-Type': undefined 
        }
      })

      if (!response.err) {
        fetchProjectDetails(selectedProject.id)
        setSelectedFile(null)
      } else {
        throw new Error(response.err)
      }
    } catch (err) {
      handleApiError(err, 'Error uploading file:')
    }
  }

  const handleAddEmployee = async (employeeId) => {
    try {
      const response = await api.post(`${baseUrl}/projects/employees`, {
        body: {
          project_id: selectedProject.id,
          employee_id: employeeId
        }
      })

      if (!response.err) {
        fetchProjectDetails(selectedProject.id)
      } else {
        throw new Error(response.err)
      }
    } catch (err) {
      handleApiError(err, 'Error adding employee:')
    }
  }

  const handleRemoveEmployee = async (employeeId) => {
    try {
      const response = await api.del(`${baseUrl}/projects/employees/${selectedProject.id}/${employeeId}`)
      if (!response.err) {
        fetchProjectDetails(selectedProject.id)
      } else {
        throw new Error(response.err)
      }
    } catch (err) {
      handleApiError(err, 'Error removing employee:')
    }
  }

  const handleAddMaterial = async (materialId, quantity) => {
    try {
      const response = await api.post(`${baseUrl}/projects/materials`, {
        body: {
          project_id: selectedProject.id,
          material_id: materialId,
          quantity
        }
      })

      if (!response.err) {
        fetchProjectDetails(selectedProject.id)
      } else {
        throw new Error(response.err)
      }
    } catch (err) {
      handleApiError(err, 'Error adding material:')
    }
  }

  const handleRemoveMaterial = async (materialId) => {
    try {
      const response = await api.del(`${baseUrl}/projects/materials/${selectedProject.id}/${materialId}`)
      if (!response.err) {
        fetchProjectDetails(selectedProject.id)
      } else {
        throw new Error(response.err)
      }
    } catch (err) {
      handleApiError(err, 'Error removing material:')
    }
  }

  const handleAddService = async (serviceId) => {
    try {
      const response = await api.post(`${baseUrl}/projects/services`, {
        body: {
          project_id: selectedProject.id,
          service_id: serviceId,
          status: 'Pending'
        }
      })

      if (!response.err) {
        fetchProjectDetails(selectedProject.id)
      } else {
        throw new Error(response.err)
      }
    } catch (err) {
      handleApiError(err, 'Error adding service:')
    }
  }

  const handleRemoveService = async (serviceId) => {
    try {
      const response = await api.del(`${baseUrl}/projects/services/${selectedProject.id}/${serviceId}`)
      if (!response.err) {
        fetchProjectDetails(selectedProject.id)
      } else {
        throw new Error(response.err)
      }
    } catch (err) {
      handleApiError(err, 'Error removing service:')
    }
  }

  const handleProjectClick = async (project) => {
    setSelectedProject(project)
    await fetchProjectDetails(project.id)
    setShowModal(true)
    setModalType('details')
  }

  const getClientName = (clientId) => {
    const client = clients.find(c => c.id === clientId)
    return client ? `${client.firstname} ${client.lastname}` : 'Unknown Client'
  }

  const handleUpdateMaterialQuantity = async (materialId, quantity) => {
    try {
      const response = await api.put(`${baseUrl}/projects/materials/${selectedProject.id}/${materialId}`, {
        body: { quantity: parseInt(quantity) }
      })
      if (!response.err) {
        fetchProjectDetails(selectedProject.id)
        setEditingMaterial(null)
      } else {
        throw new Error(response.err)
      }
    } catch (err) {
      handleApiError(err, 'Error updating material quantity:')
    }
  }

  const handleRemovePhoto = async (photoId) => {
    try {
      const response = await api.del(`${baseUrl}/projects/photos/${photoId}`)
      if (!response.err) {
        fetchProjectDetails(selectedProject.id)
      } else {
        throw new Error(response.err)
      }
    } catch (err) {
      handleApiError(err, 'Error removing photo:')
    }
  }

  const handleApiError = (error, message) => {
    console.error(message, error)
    setError(`${message} Please try again later.`)
  }

  const handleCreateProject = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await api.post(`${baseUrl}/projects`, { body: newProject })
      if (!response.err) {
        fetchProjects()
        setShowModal(false)
        setNewProject({
          name: '',
          description: '',
          start_date: '',
          end_date: '',
          client_id: '',
          status: 'Planning'
        })
      } else {
        throw new Error(response.err)
      }
    } catch (err) {
      handleApiError(err, 'Error creating project:')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateProject = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await api.put(`${baseUrl}/projects/${selectedProject.id}`, { body: selectedProject })
      if (!response.err) {
        fetchProjects()
        setShowModal(false)
      } else {
        throw new Error(response.err)
      }
    } catch (err) {
      handleApiError(err, 'Error updating project:')
    } finally {
      setLoading(false)
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        {error && (
          <CAlert color="danger" dismissible onClose={() => setError(null)}>
            {error}
          </CAlert>
        )}
        <CCard className="mb-4 border-0 shadow-sm">
          <CCardHeader className="bg-transparent border-bottom-0 d-flex justify-content-between align-items-center py-4">
            <div className="d-flex align-items-center">
              <CIcon icon={cilBuilding} size="xl" className="text-primary me-3" />
              <div>
                <h4 className="mb-0">Project Management</h4>
                <small className="text-muted">Manage your construction projects</small>
              </div>
            </div>
            <CButton color="primary" className="d-flex align-items-center" onClick={() => {setShowModal(true); setModalType('add')}}>
              <CIcon icon={cilPlus} className="me-2" /> New Project
            </CButton>
          </CCardHeader>
          <CCardBody className="p-4">
            {loading ? (
              <div className="text-center">
                <CSpinner color="primary" />
              </div>
            ) : (
              <div className="table-responsive">
                <CTable align="middle" className="mb-0 border" hover responsive>
                  <CTableHead color="light">
                    <CTableRow className="bg-light">
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
                      <CTableRow key={project.id} className="align-middle">
                        <CTableDataCell className="text-center">
                          {index + 1}
                        </CTableDataCell>
                        <CTableDataCell>
                          <div className="d-flex flex-column">
                            <strong>{project.name}</strong>
                            <small className="text-muted">
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
                              <div>{getClientName(project.client_id)}</div>
                              <small className="text-muted">{project.client_email}</small>
                            </div>
                          </div>
                        </CTableDataCell>
                        <CTableDataCell>
                          <div className="d-flex align-items-center">
                            <div style={{flex: 1}}>
                              <CProgress thin color="success" value={75} className="mb-1" />
                              <small className="text-muted">75% Complete</small>
                            </div>
                          </div>
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          <CBadge color={
                            project.status === 'Completed' ? 'success' :
                            project.status === 'In Progress' ? 'primary' :
                            'warning'
                          } className="px-3 py-2">
                            {project.status}
                          </CBadge>
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          <CDropdown alignment="end">
                            <CDropdownToggle color="transparent" caret={false} className="p-0">
                              <CIcon icon={cilOptions} />
                            </CDropdownToggle>
                            <CDropdownMenu>
                              <CDropdownItem onClick={() => handleProjectClick(project)}>
                                <CIcon icon={cilList} className="me-2" /> View Details
                              </CDropdownItem>
                              <CDropdownItem onClick={() => {setSelectedProject(project); setShowModal(true); setModalType('edit')}}>
                                <CIcon icon={cilPencil} className="me-2" /> Edit
                              </CDropdownItem>
                            </CDropdownMenu>
                          </CDropdown>
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              </div>
            )}
          </CCardBody>
        </CCard>
      </CCol>

      <CModal visible={showModal} onClose={() => setShowModal(false)} size="xl">
        <CModalHeader closeButton className="bg-light">
          <CModalTitle className="d-flex align-items-center">
            {modalType === 'details' && (
              <>
                <CIcon icon={cilBuilding} size="xl" className="text-primary me-2" />
                <div>
                  <h5 className="mb-0">{selectedProject?.name}</h5>
                  <small className="text-muted">Project Details</small>
                </div>
              </>
            )}
            {modalType === 'edit' && 'Edit Project'}
            {modalType === 'add' && 'Add New Project'}
          </CModalTitle>
        </CModalHeader>
        <CModalBody className="p-4">
          {modalType === 'details' && selectedProject && (
            <div className="project-details">
              <div className="row g-4">
                <div className="col-md-6">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-body">
                      <h6 className="card-title d-flex align-items-center mb-4">
                        <CIcon icon={cilUser} className="text-primary me-2" />
                        Client Information
                      </h6>
                      <div className="d-flex align-items-center mb-3">
                        <CAvatar size="xl" src={selectedProject.client_photo || '/placeholder.svg'} className="me-3" />
                        <div>
                          <h5 className="mb-1">{getClientName(selectedProject.client_id)}</h5>
                          <p className="text-muted mb-0">{selectedProject.client_email}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-body">
                      <h6 className="card-title d-flex align-items-center mb-4">
                        <CIcon icon={cilPeople} className="text-primary me-2" />
                        Project Team
                      </h6>
                      <div className="d-flex flex-wrap gap-2 mb-3">
                        {employees.map((employee) => (
                          <CTooltip content={`${employee.firstname} ${employee.lastname}`} key={employee.id}>
                            <CAvatar size="md" src={employee.photo_url || '/placeholder.svg'} />
                          </CTooltip>
                        ))}
                        <CButton 
                          color="light" 
                          className="rounded-circle" 
                          onClick={() => setModalType('addEmployee')}
                        >
                          <CIcon icon={cilPlus} />
                        </CButton>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="card border-0 shadow-sm">
                    <div className="card-body">
                      <h6 className="card-title d-flex align-items-center mb-4">
                        <CIcon icon={cilCart} className="text-primary me-2" />
                        Materials
                      </h6>
                      <div className="table-responsive">
                        <CTable align="middle" className="mb-0" hover>
                          <CTableHead>
                            <CTableRow>
                              <CTableHeaderCell>Material</CTableHeaderCell>
                              <CTableHeaderCell>Quantity</CTableHeaderCell>
                              <CTableHeaderCell>Unit</CTableHeaderCell>
                              <CTableHeaderCell>Actions</CTableHeaderCell>
                            </CTableRow>
                          </CTableHead>
                          <CTableBody>
                            {materials.map((material) => (
                              <CTableRow key={material.id}>
                                <CTableDataCell>
                                  <div className="d-flex align-items-center">
                                    <div className="bg-light p-2 rounded me-2">
                                      <CIcon icon={cilCart} className="text-primary" />
                                    </div>
                                    {material.name}
                                  </div>
                                </CTableDataCell>
                                <CTableDataCell>
                                  {editingMaterial === material.id ? (
                                    <CFormInput
                                      type="number"
                                      value={materialQuantity}
                                      onChange={(e) => setMaterialQuantity(e.target.value)}
                                      onBlur={() => handleUpdateMaterialQuantity(material.id, materialQuantity)}
                                      autoFocus
                                    />
                                  ) : (
                                    <span onClick={() => {
                                      setEditingMaterial(material.id)
                                      setMaterialQuantity(material.quantity.toString())
                                    }}>
                                      {material.quantity}
                                    </span>
                                  )}
                                </CTableDataCell>
                                <CTableDataCell>{material.unit}</CTableDataCell>
                                <CTableDataCell>
                                  <CButton 
                                    color="danger" 
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleRemoveMaterial(material.id)}
                                  >
                                    <CIcon icon={cilTrash} />
                                  </CButton>
                                </CTableDataCell>
                              </CTableRow>
                            ))}
                          </CTableBody>
                        </CTable>
                      </div>
                      <CButton 
                        color="primary" 
                        variant="ghost" 
                        className="mt-3"
                        onClick={() => setModalType('addMaterial')}
                      >
                        <CIcon icon={cilPlus} className="me-2" />
                        Add Material
                      </CButton>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="card border-0 shadow-sm">
                    <div className="card-body">
                      <h6 className="card-title d-flex align-items-center mb-4">
                        <CIcon icon={cilWrench} className="text-primary me-2" />
                        Services
                      </h6>
                      <div className="row g-3">
                        {services.map((service) => (
                          <div key={service.id} className="col-md-6 col-lg-4">
                            <div className="card h-100">
                              <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                  <h6 className="mb-0">{service.name}</h6>
                                  <CBadge color={service.status === 'Completed' ? 'success' : 'primary'}>
                                    {service.status}
                                  </CBadge>
                                </div>
                                <p className="text-muted small mb-0">{service.description}</p>
                                <div className="mt-3">
                                  <CButton 
                                    color="danger" 
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleRemoveService(service.id)}
                                  >
                                    Remove
                                  </CButton>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        <div className="col-md-6 col-lg-4">
                          <div className="card h-100 border-dashed">
                            <div className="card-body d-flex align-items-center justify-content-center">
                              <CButton 
                                color="primary" 
                                variant="ghost"
                                onClick={() => setModalType('addService')}
                              >
                                <CIcon icon={cilPlus} className="me-2" />
                                Add Service
                              </CButton>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="card border-0 shadow-sm">
                    <div className="card-body">
                      <h6 className="card-title d-flex align-items-center mb-4">
                        <CIcon icon={cilCloudUpload} className="text-primary me-2" />
                        Project Photos
                      </h6>
                      <div className="row g-3">
                        {selectedProject.photos?.map((photo, index) => (
                          <div key={index} className="col-6 col-md-4 col-lg-3">
                            <div className="position-relative">
                              <img 
                                src={photo.url} 
                                alt={`Project photo ${index + 1}`}
                                className="img-fluid rounded shadow-sm"
                                style={{ aspectRatio: '1', objectFit: 'cover' }}
                              />
                              <CButton
                                color="danger"
                                size="sm"
                                className="position-absolute top-0 end-0 m-2"
                                onClick={() => handleRemovePhoto(photo.id)}
                              >
                                <CIcon icon={cilTrash} />
                              </CButton>
                            </div>
                          </div>
                        ))}
                        <div className="col-6 col-md-4 col-lg-3">
                          <div 
                            className="border-dashed rounded d-flex align-items-center justify-content-center"
                            style={{ aspectRatio: '1' }}
                          >
                            <div className="text-center">
                              <CFormInput
                                type="file"
                                id="photoUpload"
                                className="d-none"
                                accept="image/*"
                                onChange={handleFileChange}
                              />
                              <CButton 
                                color="primary" 
                                variant="ghost"
                                onClick={() => document.getElementById('photoUpload').click()}
                              >
                                <CIcon icon={cilCloudUpload} className="me-2" />
                                Upload Photo
                              </CButton>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {(modalType === 'add' || modalType === 'edit') && (
            <CForm onSubmit={modalType === 'add' ? handleCreateProject : handleUpdateProject}>
              <CRow>
                <CCol md={6}>
                  <CFormInput
                    id="projectName"
                    label="Project Name"
                    value={modalType === 'add' ? newProject.name : selectedProject?.name}
                    onChange={(e) => modalType === 'add' ? 
                      setNewProject({...newProject, name: e.target.value}) : 
                      setSelectedProject({...selectedProject, name: e.target.value})
                    }
                    required
                  />
                </CCol>
                <CCol md={6}>
                  <CFormSelect
                    id="clientId"
                    label="Client"
                    value={modalType === 'add' ? newProject.client_id : selectedProject?.client_id}
                    onChange={(e) => modalType === 'add' ? 
                      setNewProject({...newProject, client_id: e.target.value}) : 
                      setSelectedProject({...selectedProject, client_id: e.target.value})
                    }
                    required
                  >
                    <option value="">Select a client</option>
                    {clients.map(client => (
                      <option key={client.id} value={client.id}>
                        {`${client.firstname} ${client.lastname}`}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
              </CRow>
              <CRow className="mt-3">
                <CCol md={6}>
                  <CFormInput
                    type="date"
                    id="startDate"
                    label="Start Date"
                    value={modalType === 'add' ? newProject.start_date : selectedProject?.start_date}
                    onChange={(e) => modalType === 'add' ? 
                      setNewProject({...newProject, start_date: e.target.value}) : 
                      setSelectedProject({...selectedProject, start_date: e.target.value})
                    }
                    required
                  />
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    type="date"
                    id="endDate"
                    label="End Date"
                    value={modalType === 'add' ? newProject.end_date : selectedProject?.end_date}
                    onChange={(e) => modalType === 'add' ? 
                      setNewProject({...newProject, end_date: e.target.value}) : 
                      setSelectedProject({...selectedProject, end_date: e.target.value})
                    }
                  />
                </CCol>
              </CRow>
              <CRow className="mt-3">
                <CCol md={12}>
                  <CFormTextarea
                    id="description"
                    label="Description"
                    rows={3}
                    value={modalType === 'add' ? newProject.description : selectedProject?.description}
                    onChange={(e) => modalType === 'add' ? 
                      setNewProject({...newProject, description: e.target.value}) : 
                      setSelectedProject({...selectedProject, description: e.target.value})
                    }
                    required
                  />
                </CCol>
              </CRow>
              <CRow className="mt-3">
                <CCol md={6}>
                  <CFormSelect
                    id="status"
                    label="Status"
                    value={modalType === 'add' ? newProject.status : selectedProject?.status}
                    onChange={(e) => modalType === 'add' ? 
                      setNewProject({...newProject, status: e.target.value}) : 
                      setSelectedProject({...selectedProject, status: e.target.value})
                    }
                    required
                  >
                    <option value="Planning">Planning</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </CFormSelect>
                </CCol>
              </CRow>
              <CRow className="mt-4">
                <CCol>
                  <CButton type="submit" color="primary">
                    {modalType === 'add' ? 'Create Project' : 'Update Project'}
                  </CButton>
                </CCol>
              </CRow>
            </CForm>
          )}
        </CModalBody>
        <CModalFooter className="bg-light">
          <CButton color="secondary" onClick={() => setShowModal(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  )
}

export default ProjectManagement
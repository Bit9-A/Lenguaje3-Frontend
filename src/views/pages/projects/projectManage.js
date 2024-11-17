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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilOptions, cilPlus, cilPencil, cilTrash, cilList } from '@coreui/icons'
import { helpHttp } from '../../../helpers/helpHTTP'

const ProjectManagement = () => {
  const [projects, setProjects] = useState([])
  const [proposals, setProposals] = useState([])
  const [services, setServices] = useState([])
  const [projectServices, setProjectServices] = useState([])
  const [showServicesModal, setShowServicesModal] = useState(false)
  const [showNewProjectModal, setShowNewProjectModal] = useState(false)
  const [showEditProjectModal, setShowEditProjectModal] = useState(false)
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [newService, setNewService] = useState({ service_id: '', status: 'In Progress', is_paid: false })
  const [editingProject, setEditingProject] = useState(null)

  const api = helpHttp()
  const baseUrl = 'http://localhost:5000'

  useEffect(() => {
    fetchProjects()
    fetchProposals()
    fetchServices()
    fetchProjectServices()
  }, [])

  const fetchProjects = async () => {
    const response = await api.get(`${baseUrl}/projects`)
    if (!response.err) {
      setProjects(response)
    } else {
      console.error('Error fetching projects:', response.err)
    }
  }

  const fetchProposals = async () => {
    const response = await api.get(`${baseUrl}/client_proposals`)
    if (!response.err) {
      setProposals(response.filter(proposal => proposal.status === 'Pending'))
    } else {
      console.error('Error fetching proposals:', response.err)
    }
  }

  const fetchServices = async () => {
    const response = await api.get(`${baseUrl}/services`)
    if (!response.err) {
      setServices(response)
    } else {
      console.error('Error fetching services:', response.err)
    }
  }

  const fetchProjectServices = async () => {
    const response = await api.get(`${baseUrl}/project_services`)
    if (!response.err) {
      setProjectServices(response)
    } else {
      console.error('Error fetching project services:', response.err)
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'In Progress':
        return <CBadge color="primary">{status}</CBadge>
      case 'Completed':
        return <CBadge color="success">{status}</CBadge>
      case 'Planning':
        return <CBadge color="warning">{status}</CBadge>
      default:
        return <CBadge color="secondary">{status}</CBadge>
    }
  }

  const openServicesModal = (project) => {
    setSelectedProject(project)
    setShowServicesModal(true)
  }

  const closeServicesModal = () => {
    setSelectedProject(null)
    setShowServicesModal(false)
    setNewService({ service_id: '', status: 'In Progress', is_paid: false })
  }

  const addService = async () => {
    if (newService.service_id && selectedProject) {
      const newProjectService = {
        project_id: selectedProject.id,
        service_id: parseInt(newService.service_id),
        is_paid: newService.is_paid,
        status: newService.status,
        end_date: null
      }
      const response = await api.post(`${baseUrl}/project_services`, { body: newProjectService })
      if (!response.err) {
        fetchProjectServices()
        setNewService({ service_id: '', status: 'In Progress', is_paid: false })
      } else {
        console.error('Error adding service:', response.err)
      }
    }
  }

  const updateServiceStatus = async (projectServiceId, newStatus) => {
    const projectService = projectServices.find(ps => ps.id === projectServiceId)
    if (projectService) {
      const updatedProjectService = { ...projectService, status: newStatus }
      const response = await api.put(`${baseUrl}/project_services/${projectServiceId}`, { body: updatedProjectService })
      if (!response.err) {
        fetchProjectServices()
      } else {
        console.error('Error updating service status:', response.err)
      }
    }
  }

  const openNewProjectModal = () => {
    setShowNewProjectModal(true)
  }

  const closeNewProjectModal = () => {
    setShowNewProjectModal(false)
  }

  const createNewProject = async (proposal) => {
    const newProject = {
      name: proposal.proposal_description,
      description: proposal.proposal_description,
      start_date: new Date().toISOString().split('T')[0],
      end_date: null,
      status: 'Planning',
      proposal_id: proposal.id,
      is_paid: false
    }
    const response = await api.post(`${baseUrl}/projects`, { body: newProject })
    if (!response.err) {
      
      const updatedProposal = { ...proposal, status: 'Accepted' }
      await api.put(`${baseUrl}/client_proposals/${proposal.id}`, { body: updatedProposal })
      
      fetchProjects()
      fetchProposals()
      closeNewProjectModal()
    } else {
      console.error('Error creating new project:', response.err)
    }
  }

  const openEditProjectModal = (project) => {
    setEditingProject({ ...project })
    setShowEditProjectModal(true)
  }

  const closeEditProjectModal = () => {
    setEditingProject(null)
    setShowEditProjectModal(false)
  }

  const saveEditedProject = async () => {
    if (editingProject) {
      const response = await api.put(`${baseUrl}/projects/${editingProject.id}`, { body: editingProject })
      if (!response.err) {
        fetchProjects()
        closeEditProjectModal()
      } else {
        console.error('Error updating project:', response.err)
      }
    }
  }

  const openDeleteConfirmModal = (project) => {
    setSelectedProject(project)
    setShowDeleteConfirmModal(true)
  }

  const closeDeleteConfirmModal = () => {
    setSelectedProject(null)
    setShowDeleteConfirmModal(false)
  }

  const deleteProject = async () => {
    if (selectedProject) {
      const response = await api.del(`${baseUrl}/projects/${selectedProject.id}`)
      if (!response.err) {
        fetchProjects()
        closeDeleteConfirmModal()
      } else {
        console.error('Error deleting project:', response.err)
      }
    }
  }

  const getServiceName = (serviceId) => {
    const service = services.find(s => s.id === serviceId.toString())
    return service ? service.name : 'Unknown Service'
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Project Management for Remodeling</strong>
            <CButton color="primary" className="float-end" onClick={openNewProjectModal}>
              <CIcon icon={cilPlus} /> New Project
            </CButton>
          </CCardHeader>
          <CCardBody>
            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell>Project Name</CTableHeaderCell>
                  <CTableHeaderCell>Start Date</CTableHeaderCell>
                  <CTableHeaderCell>End Date</CTableHeaderCell>
                  <CTableHeaderCell>Status</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {projects.map((project) => (
                  <CTableRow key={project.id}>
                    <CTableDataCell>
                      <div>{project.name}</div>
                    </CTableDataCell>
                    <CTableDataCell>{project.start_date}</CTableDataCell>
                    <CTableDataCell>{project.end_date || 'Not set'}</CTableDataCell>
                    <CTableDataCell>{getStatusBadge(project.status)}</CTableDataCell>
                    <CTableDataCell>
                      <CDropdown alignment="end">
                        <CDropdownToggle color="transparent" caret={false} className="p-0">
                          <CIcon icon={cilOptions} />
                        </CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem onClick={() => openServicesModal(project)}>
                            <CIcon icon={cilList} /> Manage Services
                          </CDropdownItem>
                          <CDropdownItem onClick={() => openEditProjectModal(project)}>
                            <CIcon icon={cilPencil} /> Edit
                          </CDropdownItem>
                          <CDropdownItem onClick={() => openDeleteConfirmModal(project)}>
                            <CIcon icon={cilTrash} /> Delete
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

      {/* Services Modal */}
      <CModal visible={showServicesModal} onClose={closeServicesModal}>
        <CModalHeader closeButton>
          <CModalTitle>Manage Services for {selectedProject?.name}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell>Service Name</CTableHeaderCell>
                <CTableHeaderCell>Status</CTableHeaderCell>
                <CTableHeaderCell>Is Paid</CTableHeaderCell>
                <CTableHeaderCell>Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {projectServices
                .filter(ps => ps.project_id === selectedProject?.id)
                .map((projectService) => (
                  <CTableRow key={projectService.id}>
                    <CTableDataCell>{getServiceName(projectService.service_id)}</CTableDataCell>
                    <CTableDataCell>{getStatusBadge(projectService.status)}</CTableDataCell>
                    <CTableDataCell>{projectService.is_paid ? 'Yes' : 'No'}</CTableDataCell>
                    <CTableDataCell>
                      <CDropdown>
                        <CDropdownToggle color="secondary">Update Status</CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem onClick={() => updateServiceStatus(projectService.id, 'In Progress')}>
                            In Progress
                          </CDropdownItem>
                          <CDropdownItem onClick={() => updateServiceStatus(projectService.id, 'Completed')}>
                            Completed
                          </CDropdownItem>
                        </CDropdownMenu>
                      </CDropdown>
                    </CTableDataCell>
                  </CTableRow>
                ))}
            </CTableBody>
          </CTable>
          <CForm className="mt-3">
            <CFormSelect
              id="newServiceId"
              label="New Service"
              value={newService.service_id}
              onChange={(e) => setNewService({ ...newService, service_id: e.target.value })}
            >
              <option value="">Select a service</option>
              {services.map(service => (
                <option key={service.id} value={service.id}>{service.name}</option>
              ))}
            </CFormSelect>
            <CFormSelect
              id="newServiceStatus"
              label="Status"
              className="mt-2"
              value={newService.status}
              onChange={(e) => setNewService({ ...newService, status: e.target.value })}
            >
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </CFormSelect>
            <CFormSelect
              id="newServiceIsPaid"
              label="Is Paid"
              className="mt-2"
              value={newService.is_paid.toString()}
              onChange={(e) => setNewService({ ...newService, is_paid: e.target.value === 'true' })}
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </CFormSelect>
            <CButton color="primary" onClick={addService} className="mt-3">
              Add Service
            </CButton>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={closeServicesModal}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>

      {/* New Project Modal */}
      <CModal visible={showNewProjectModal} onClose={closeNewProjectModal} size="lg">
        <CModalHeader closeButton>
          <CModalTitle>Create New Project</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <h5>Select a pending proposal to create a new project:</h5>
          {proposals.map((proposal) => (
            <CCard key={proposal.id} className="mb-3">
              <CCardBody>
                <h6>{proposal.proposal_description}</h6>
                <p><strong>Client ID:</strong> {proposal.client_id}</p>
                <p><strong>Date:</strong> {proposal.proposal_date}</p>
                <p><strong>Budget Type:</strong> {proposal.budget_type_id}</p>
                <CButton color="primary" onClick={() => createNewProject(proposal)}>
                  Accept and Create Project
                </CButton>
              </CCardBody>
            </CCard>
          ))}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={closeNewProjectModal}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Edit Project Modal */}
      <CModal visible={showEditProjectModal} onClose={closeEditProjectModal}>
        <CModalHeader closeButton>
          <CModalTitle>Edit Project</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {editingProject && (
            <CForm>
              <CFormInput
                type="text"
                id="editProjectName"
                label="Project Name"
                value={editingProject.name}
                onChange={(e) => setEditingProject({ ...editingProject, name: e.target.value })}
                className="mb-3"
              />
              <CFormInput
                type="date"
                id="editProjectStartDate"
                label="Start Date"
                value={editingProject.start_date}
                onChange={(e) => setEditingProject({ ...editingProject, start_date: e.target.value })}
                className="mb-3"
              />
              <CFormInput
                type="date"
                id="editProjectEndDate"
                label="End Date"
                value={editingProject.end_date || ''}
                onChange={(e) => setEditingProject({ ...editingProject, end_date: e.target.value })}
                className="mb-3"
              />
              <CFormSelect
                id="editProjectStatus"
                label="Status"
                value={editingProject.status}
                onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value })}
                className="mb-3"
              >
                <option value="Planning">Planning</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </CFormSelect>
              <CFormTextarea
                id="editProjectDescription"
                label="Description"
                rows="3"
                value={editingProject.description}
                onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                className="mb-3"
              />
            </CForm>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={saveEditedProject}>
            Save Changes
          </CButton>
          <CButton color="secondary" onClick={closeEditProjectModal}>
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Delete Confirm Modal */}
      <CModal visible={showDeleteConfirmModal} onClose={closeDeleteConfirmModal}>
        <CModalHeader closeButton>
          <CModalTitle>Confirm Delete</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Are you sure you want to delete the project "{selectedProject?.name}"?
        </CModalBody>
        <CModalFooter>
          <CButton color="danger" onClick={deleteProject}>
            Delete
          </CButton>
          <CButton color="secondary" onClick={closeDeleteConfirmModal}>
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  )
}

export default ProjectManagement
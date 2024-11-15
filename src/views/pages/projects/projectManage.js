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
  CProgress,
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

const ProjectManagement = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'Kitchen Remodeling',
      client: 'Juan Pérez',
      progress: 75,
      status: 'In Progress',
      description: 'Complete kitchen renovation including new cabinets, countertops, and appliances.',
      services: [
        { id: 1, name: 'Cabinets Installation', status: 'Completed' },
        { id: 2, name: 'Countertop Installation', status: 'In Progress' },
        { id: 3, name: 'Appliances Installation', status: 'Pending' },
      ],
    },
    {
      id: 2,
      name: 'Main Bathroom',
      client: 'María García',
      progress: 30,
      status: 'In Progress',
      description: 'Full bathroom remodel with new fixtures, tiling, and lighting.',
      services: [
        { id: 1, name: 'Tiling', status: 'In Progress' },
        { id: 2, name: 'Plumbing', status: 'Pending' },
      ],
    },
    {
      id: 3,
      name: 'Living Room Expansion',
      client: 'Carlos Rodríguez',
      progress: 100,
      status: 'Completed',
      description: 'Expanding the living room by removing a non-load bearing wall and refinishing.',
      services: [
        { id: 1, name: 'Wall Removal', status: 'Completed' },
        { id: 2, name: 'Flooring', status: 'Completed' },
        { id: 3, name: 'Painting', status: 'Completed' },
      ],
    },
    {
      id: 4,
      name: 'Terrace',
      client: 'Ana Martínez',
      progress: 0,
      status: 'Pending',
      description: 'Building a new terrace with composite decking and a pergola.',
      services: [],
    },
  ])

  const [pendingProposals, setPendingProposals] = useState([
    { 
      id: 1, 
      name: 'Basement Finishing', 
      client: 'Luis Hernández', 
      description: 'Finishing the basement into a living area with a bathroom.',
      clientInfo: {
        email: 'luis.hernandez@email.com',
        phone: '555-0101',
        address: '123 Main St, Anytown, USA',
      },
      isNewClient: true
    },
    { 
      id: 2, 
      name: 'Garage Conversion', 
      client: 'Elena Torres', 
      description: 'Converting the garage into a home office space.',
      clientInfo: {
        email: 'elena.torres@email.com',
        phone: '555-0202',
        address: '456 Oak Ave, Somewhere, USA',
      },
      isNewClient: false
    },
  ])

  const [showServicesModal, setShowServicesModal] = useState(false)
  const [showNewProjectModal, setShowNewProjectModal] = useState(false)
  const [showEditProjectModal, setShowEditProjectModal] = useState(false)
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [newService, setNewService] = useState({ name: '', status: 'Pending' })
  const [editingProject, setEditingProject] = useState(null)

  const getStatusBadge = (status) => {
    switch (status) {
      case 'In Progress':
        return <CBadge color="primary">{status}</CBadge>
      case 'Completed':
        return <CBadge color="success">{status}</CBadge>
      case 'Pending':
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
    setNewService({ name: '', status: 'Pending' })
  }

  const addService = () => {
    if (newService.name) {
      const updatedProjects = projects.map((project) => {
        if (project.id === selectedProject.id) {
          return {
            ...project,
            services: [
              ...project.services,
              { id: project.services.length + 1, ...newService },
            ],
          }
        }
        return project
      })
      setProjects(updatedProjects)
      setNewService({ name: '', status: 'Pending' })
    }
  }

  const updateServiceStatus = (projectId, serviceId, newStatus) => {
    const updatedProjects = projects.map((project) => {
      if (project.id === projectId) {
        const updatedServices = project.services.map((service) => {
          if (service.id === serviceId) {
            return { ...service, status: newStatus }
          }
          return service
        })
        return { ...project, services: updatedServices }
      }
      return project
    })
    setProjects(updatedProjects)
  }

  const openNewProjectModal = () => {
    setShowNewProjectModal(true)
  }

  const closeNewProjectModal = () => {
    setShowNewProjectModal(false)
  }

  const createNewProject = (proposal) => {
    const newProject = {
      id: projects.length + 1,
      name: proposal.name,
      client: proposal.client,
      progress: 0,
      status: 'Pending',
      description: proposal.description,
      services: [],
      clientInfo: proposal.clientInfo,
      isNewClient: proposal.isNewClient
    }
    setProjects([...projects, newProject])
    setPendingProposals(pendingProposals.filter(p => p.id !== proposal.id))
    closeNewProjectModal()
  }

  const openEditProjectModal = (project) => {
    setEditingProject({ ...project })
    setShowEditProjectModal(true)
  }

  const closeEditProjectModal = () => {
    setEditingProject(null)
    setShowEditProjectModal(false)
  }

  const saveEditedProject = () => {
    const updatedProjects = projects.map(project => 
      project.id === editingProject.id ? editingProject : project
    )
    setProjects(updatedProjects)
    closeEditProjectModal()
  }

  const openDeleteConfirmModal = (project) => {
    setSelectedProject(project)
    setShowDeleteConfirmModal(true)
  }

  const closeDeleteConfirmModal = () => {
    setSelectedProject(null)
    setShowDeleteConfirmModal(false)
  }

  const deleteProject = () => {
    setProjects(projects.filter(project => project.id !== selectedProject.id))
    closeDeleteConfirmModal()
  }

  useEffect(() => {
    const updatedProjects = projects.map(project => {
      const completedServices = project.services.filter(service => service.status === 'Completed').length;
      const progress = project.services.length > 0 ? Math.round((completedServices / project.services.length) * 100) : 0;
      return { ...project, progress };
    });
    setProjects(updatedProjects);
  }, []); 

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
                  <CTableHeaderCell>Client</CTableHeaderCell>
                  <CTableHeaderCell>Progress</CTableHeaderCell>
                  <CTableHeaderCell>Status</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {projects.map((project, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>
                      <div>{project.name}</div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>
                        {project.client} {project.isNewClient && <CBadge color="info" size="sm">New</CBadge>}
                      </div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div className="clearfix">
                        <div className="float-start">
                          <strong>{project.progress}%</strong>
                        </div>
                      </div>
                      <CProgress thin color="info" value={project.progress} />
                    </CTableDataCell>
                    <CTableDataCell>{getStatusBadge(project.status)}</CTableDataCell>
                    <CTableDataCell>
                      <CDropdown alignment="end">
                        <CDropdownToggle color="transparent" caret={false} className="p-0"> Op
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
                <CTableHeaderCell>Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {selectedProject?.services.map((service, index) => (
                <CTableRow key={index}>
                  <CTableDataCell>{service.name}</CTableDataCell>
                  <CTableDataCell>{getStatusBadge(service.status)}</CTableDataCell>
                  <CTableDataCell>
                    <CDropdown>
                      <CDropdownToggle color="secondary">Update Status</CDropdownToggle>
                      <CDropdownMenu>
                        <CDropdownItem onClick={() => updateServiceStatus(selectedProject.id, service.id, 'Pending')}>
                          Pending
                        </CDropdownItem>
                        <CDropdownItem onClick={() => updateServiceStatus(selectedProject.id, service.id, 'In Progress')}>
                          In Progress
                        </CDropdownItem>
                        <CDropdownItem onClick={() => updateServiceStatus(selectedProject.id, service.id, 'Completed')}>
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
            <CFormInput
              type="text"
              id="newServiceName"
              label="New Service Name"
              value={newService.name}
              onChange={(e) => setNewService({ ...newService, name: e.target.value })}
            />
            <CFormSelect
              id="newServiceStatus"
              label="Status"
              className="mt-2"
              value={newService.status}
              onChange={(e) => setNewService({ ...newService, status: e.target.value })}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
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
          {pendingProposals.map((proposal) => (
            <CCard key={proposal.id} className="mb-3">
              <CCardBody>
                <h6>{proposal.name} {proposal.isNewClient && <CBadge color="info">New Client</CBadge>}</h6>
                <p><strong>Client:</strong> {proposal.client}</p>
                <p><strong>Description:</strong> {proposal.description}</p>
                <p><strong>Email:</strong> {proposal.clientInfo.email}</p>
                <p><strong>Phone:</strong> {proposal.clientInfo.phone}</p>
                <p><strong>Address:</strong> {proposal.clientInfo.address}</p>
                <CButton color="primary" onClick={() => createNewProject(proposal)}>
                  Create Project
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
                type="text"
                id="editProjectClient"
                label="Client"
                value={editingProject.client}
                onChange={(e) => setEditingProject({ ...editingProject, client: e.target.value })}
                className="mb-3"
              />
              <CFormSelect
                id="editProjectStatus"
                label="Status"
                value={editingProject.status}
                onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value })}
                className="mb-3"
              >
                <option value="Pending">Pending</option>
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
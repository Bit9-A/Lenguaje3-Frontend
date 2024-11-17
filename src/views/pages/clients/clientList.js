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
  CInputGroup,
  CInputGroupText,
  CFormInput,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CBadge,
  CAvatar,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormLabel,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilOptions,
  cilSearch,
  cilEnvelopeClosed,
  cilPhone,
  cilBriefcase,
} from '@coreui/icons'
import { helpHttp } from '../../../helpers/helpHTTP'

const ClientList = () => {
  const [clients, setClients] = useState([])
  const [projects, setProjects] = useState([])
  const [proposals, setProposals] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('Todos')
  const [showModal, setShowModal] = useState(false)
  const [currentClient, setCurrentClient] = useState(null)
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    address: '',
  })

  const api = helpHttp()
  const baseUrl = 'http://localhost:5000'

  useEffect(() => {
    const fetchData = async () => {
      const clientsRes = await api.get(`${baseUrl}/clients`)
      const projectsRes = await api.get(`${baseUrl}/projects`)
      const proposalsRes = await api.get(`${baseUrl}/client_proposals`)

      if (!clientsRes.err && !projectsRes.err && !proposalsRes.err) {
        setClients(clientsRes)
        setProjects(projectsRes)
        setProposals(proposalsRes)
      } else {
        console.error('Error fetching data')
      }
    }

    fetchData()
  }, [])

  const getClientStatus = (clientId) => {
    const clientProposals = proposals.filter(proposal => proposal.client_id === clientId)
    const acceptedProposals = clientProposals.filter(proposal => proposal.status === 'Accepted')
    const activeProjects = projects.filter(project => 
      acceptedProposals.some(proposal => proposal.id === project.proposal_id) && 
      project.status === 'In Progress'
    )

    if (activeProjects.length > 0) {
      return 'Activo'
    } else if (clientProposals.length > 0) {
      return 'Potencial'
    } else {
      return 'Inactivo'
    }
  }

  const getClientProjects = (clientId) => {
    const clientProposals = proposals.filter(proposal => proposal.client_id === clientId)
    const clientProjects = projects.filter(project => 
      clientProposals.some(proposal => proposal.id === project.proposal_id)
    )
    const completed = clientProjects.filter(project => project.status === 'Completed').length
    const inProgress = clientProjects.filter(project => project.status === 'In Progress').length
    return { completed, inProgress }
  }

  const getClientProposals = (clientId) => {
    const clientProposals = proposals.filter(proposal => proposal.client_id === clientId)
    const accepted = clientProposals.filter(proposal => proposal.status === 'Accepted').length
    const rejected = clientProposals.filter(proposal => proposal.status === 'Rejected').length
    const pending = clientProposals.filter(proposal => proposal.status === 'Pending').length
    return { accepted, rejected, pending }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (currentClient) {
      await updateClient(currentClient.id, formData)
    }
    setShowModal(false)
    setCurrentClient(null)
    setFormData({
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      address: '',
    })
    const updatedClients = await api.get(`${baseUrl}/clients`)
    if (!updatedClients.err) {
      setClients(updatedClients)
    }
  }

  const updateClient = async (id, client) => {
    try {
      await api.put(`${baseUrl}/clients/${id}`, { body: client })
    } catch (error) {
      console.error('Error updating client:', error)
    }
  }

  const deleteClient = async (id) => {
    if (window.confirm('¿Está seguro que desea eliminar este cliente?')) {
      try {
        await api.del(`${baseUrl}/clients/${id}`)
        const updatedClients = await api.get(`${baseUrl}/clients`)
        if (!updatedClients.err) {
          setClients(updatedClients)
        }
      } catch (error) {
        console.error('Error deleting client:', error)
      }
    }
  }

  const openModal = (client = null) => {
    if (client) {
      setCurrentClient(client)
      setFormData(client)
    }
    setShowModal(true)
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Activo':
        return <CBadge color="success" shape="rounded-pill">{status}</CBadge>
      case 'Inactivo':
        return <CBadge color="danger" shape="rounded-pill">{status}</CBadge>
      case 'Potencial':
        return <CBadge color="warning" shape="rounded-pill">{status}</CBadge>
      default:
        return <CBadge color="secondary" shape="rounded-pill">{status}</CBadge>
    }
  }

  const filteredClients = clients.filter(
    (client) =>
      (client.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === 'Todos' || getClientStatus(client.id) === statusFilter)
  )

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4 shadow-sm">
          <CCardHeader className="bg-transparent border-bottom-0">
            <h2 className="mb-0">Lista de Clientes</h2>
          </CCardHeader>
          <CCardBody>
            <CRow className="mb-4 align-items-center">
              <CCol md={6} className="mb-3 mb-md-0">
                <CInputGroup>
                  <CInputGroupText className="bg-light">
                    <CIcon icon={cilSearch} />
                  </CInputGroupText>
                  <CFormInput
                    placeholder="Buscar clientes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border-start-0"
                  />
                </CInputGroup>
              </CCol>
              <CCol md={3} className="mb-3 mb-md-0">
                <CDropdown>
                  <CDropdownToggle color="light" className="w-100">
                    Filtrar por Estado: {statusFilter}
                  </CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem onClick={() => setStatusFilter('Todos')}>Todos</CDropdownItem>
                    <CDropdownItem onClick={() => setStatusFilter('Activo')}>Activo</CDropdownItem>
                    <CDropdownItem onClick={() => setStatusFilter('Inactivo')}>Inactivo</CDropdownItem>
                    <CDropdownItem onClick={() => setStatusFilter('Potencial')}>Potencial</CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
              </CCol>
            </CRow>
            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead>
                <CTableRow className="bg-light">
                  <CTableHeaderCell className="text-center">Cliente</CTableHeaderCell>
                  <CTableHeaderCell>Contacto</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Estado</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Proyectos</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Propuestas</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Acciones</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {filteredClients.map((client) => {
                  const clientProjects = getClientProjects(client.id)
                  const clientProposals = getClientProposals(client.id)
                  return (
                    <CTableRow key={client.id} className="align-middle">
                      <CTableDataCell>
                        <div className="d-flex align-items-center">
                          <CAvatar
                            color={getClientStatus(client.id) === 'Activo' ? 'primary' : 'secondary'}
                            size="md"
                            className="me-3"
                          >
                            {client.firstname.charAt(0)}
                          </CAvatar>
                          <div>
                            <div className="fw-semibold">{`${client.firstname} ${client.lastname}`}</div>
                            <div className="small text-medium-emphasis">
                              <CIcon icon={cilBriefcase} className="me-1" />
                              {clientProjects.completed + clientProjects.inProgress} {clientProjects.completed + clientProjects.inProgress === 1 ? 'proyecto' : 'proyectos'}
                            </div>
                          </div>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>
                          <CIcon icon={cilEnvelopeClosed} className="me-2 text-muted" />
                          {client.email}
                        </div>
                        <div className="mt-1">
                          <CIcon icon={cilPhone} className="me-2 text-muted" />
                          {client.phone}
                        </div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        {getStatusBadge(getClientStatus(client.id))}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>Completados: {clientProjects.completed}</div>
                        <div>En Progreso: {clientProjects.inProgress}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>Aceptadas: {clientProposals.accepted}</div>
                        <div>Rechazadas: {clientProposals.rejected}</div>
                        <div>Pendientes: {clientProposals.pending}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CDropdown alignment="end">
                          <CDropdownToggle color="light" caret={false} className="p-0">
                            <CIcon icon={cilOptions} />
                          </CDropdownToggle>
                          <CDropdownMenu>
                            <CDropdownItem onClick={() => openModal(client)}>Editar</CDropdownItem>
                            <CDropdownItem onClick={() => deleteClient(client.id)} className="text-danger">
                              Eliminar
                            </CDropdownItem>
                          </CDropdownMenu>
                        </CDropdown>
                      </CTableDataCell>
                    </CTableRow>
                  )
                })}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>

      <CModal visible={showModal} onClose={() => setShowModal(false)}>
        <CForm onSubmit={handleSubmit}>
          <CModalHeader closeButton>
            <CModalTitle>Editar Cliente</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CRow>
              <CCol md={6}>
                <div className="mb-3">
                  <CFormLabel htmlFor="firstname">Nombre</CFormLabel>
                  <CFormInput
                    id="firstname"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </CCol>
              <CCol md={6}>
                <div className="mb-3">
                  <CFormLabel htmlFor="lastname">Apellido</CFormLabel>
                  <CFormInput
                    id="lastname"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </CCol>
            </CRow>
            <div className="mb-3">
              <CFormLabel htmlFor="email">Email</CFormLabel>
              <CFormInput
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="phone">Teléfono</CFormLabel>
              <CFormInput
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="address">Dirección</CFormLabel>
              <CFormInput
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setShowModal(false)}>
              Cerrar
            </CButton>
            <CButton color="primary" type="submit">
              Actualizar Cliente
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    </CRow>
  )
}

export default ClientList
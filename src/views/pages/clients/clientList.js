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
  CInputGroup,
  CInputGroupText,
  CFormInput,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CBadge,
  CAvatar,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilOptions,
  cilSearch,
  cilUser,
  cilEnvelopeClosed,
  cilPhone,
  cilBriefcase,
} from '@coreui/icons'

const ClientList = () => {
  const [clients, setClients] = useState([
    {
      id: 1,
      name: 'Juan Pérez',
      email: 'juan@gmail.com',
      phone: '555-0101',
      status: 'Activo',
      projects: 2,
    },
    {
      id: 2,
      name: 'María García',
      email: 'maria@gmail.com',
      phone: '555-0102',
      status: 'Inactivo',
      projects: 1,
    },
    {
      id: 3,
      name: 'Carlos Rodríguez',
      email: 'carlos@gmail.com',
      phone: '555-0103',
      status: 'Activo',
      projects: 3,
    },
    {
      id: 4,
      name: 'Ana Martínez',
      email: 'ana@gmail.com',
      phone: '555-0104',
      status: 'Potencial',
      projects: 0,
    },
    {
      id: 5,
      name: 'Luis Sánchez',
      email: 'luis@gmail.com',
      phone: '555-0105',
      status: 'Activo',
      projects: 1,
    },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('Todos')

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Activo':
        return (
          <CBadge color="success" shape="rounded-pill">
            {status}
          </CBadge>
        )
      case 'Inactivo':
        return (
          <CBadge color="danger" shape="rounded-pill">
            {status}
          </CBadge>
        )
      case 'Potencial':
        return (
          <CBadge color="warning" shape="rounded-pill">
            {status}
          </CBadge>
        )
      default:
        return (
          <CBadge color="secondary" shape="rounded-pill">
            {status}
          </CBadge>
        )
    }
  }

  const filteredClients = clients.filter(
    (client) =>
      (client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === 'Todos' || client.status === statusFilter),
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
                    <CDropdownItem onClick={() => setStatusFilter('Inactivo')}>
                      Inactivo
                    </CDropdownItem>
                    <CDropdownItem onClick={() => setStatusFilter('Potencial')}>
                      Potencial
                    </CDropdownItem>
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
                  <CTableHeaderCell className="text-center">Acciones</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {filteredClients.map((client, index) => (
                  <CTableRow key={index} className="align-middle">
                    <CTableDataCell>
                      <div className="d-flex align-items-center">
                        <CAvatar
                          color={client.status === 'Activo' ? 'primary' : 'secondary'}
                          size="md"
                          className="me-3"
                        >
                          {client.name.charAt(0)}
                        </CAvatar>
                        <div>
                          <div className="fw-semibold">{client.name}</div>
                          <div className="small text-medium-emphasis">
                            <CIcon icon={cilBriefcase} className="me-1" />
                            {client.projects} {client.projects === 1 ? 'proyecto' : 'proyectos'}
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
                      {getStatusBadge(client.status)}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CBadge color="info" shape="rounded-pill" className="px-3">
                        {client.projects}
                      </CBadge>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CDropdown alignment="end">
                        <CDropdownToggle color="light" caret={false} className="p-0">
                          <CIcon icon={cilOptions} />
                        </CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem href="#">Ver Detalles</CDropdownItem>
                          <CDropdownItem href="#">Editar</CDropdownItem>
                          <CDropdownItem href="#" className="text-danger">
                            Eliminar
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
    </CRow>
  )
}

export default ClientList

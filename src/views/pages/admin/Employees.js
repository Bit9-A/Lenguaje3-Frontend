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
  cilEnvelopeClosed,
  cilPhone,
  cilBriefcase,
} from '@coreui/icons'

const Employees = () => {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      firstname: 'Juan',
      lastname: 'Pérez',
      email: 'juan@gmail.com',
      phone: '555-0101',
      position: 'Project Manager',
      status: 'Active',
      projects: 2,
      hireDate: '2021-01-15', 
    },
    {
      id: 2,
      firstname: 'María',
      lastname: 'García',
      email: 'maria@gmail.com',
      phone: '555-0102',
      position: 'Designer',
      status: 'Inactive',
      projects: 1,
      hireDate: '2020-03-22', 
    },
    {
      id: 3,
      firstname: 'Carlos',
      lastname: 'Rodríguez',
      email: 'carlos@gmail.com',
      phone: '555-0103',
      position: 'Engineer',
      status: 'Active',
      projects: 3,
      hireDate: '2019-07-30', 
    },
    {
      id: 4,
      firstname: 'Ana',
      lastname: 'Martínez',
      email: 'ana@gmail.com',
      phone: '555-0104',
      position: 'Intern',
      status: 'Potential',
      projects: 0,
      hireDate: '2022-05-10', 
    },
    {
      id: 5,
      firstname: 'Luis',
      lastname: 'Sánchez',
      email: 'luis@gmail.com',
      phone: '555-0105',
      position: 'Architect',
      status: 'Active',
      projects: 1,
      hireDate: '2021-11-01', 
    },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return (
          <CBadge color="success" shape="rounded-pill">
            {status}
          </CBadge>
        )
      case 'Inactive':
        return (
          <CBadge color="danger" shape="rounded-pill">
            {status}
          </CBadge>
        )
      case 'Potential':
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

  const filteredEmployees = employees.filter(
    (employee) =>
      (employee.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === 'All' || employee.status === statusFilter),
  )

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4 shadow-sm">
          <CCardHeader className="bg-transparent border-bottom-0">
            <h2 className="mb-0">Employee List</h2>
          </CCardHeader>
          <CCardBody>
            <CRow className="mb-4 align-items-center">
            <CCol md={6} className="mb-3 mb-md-0">
                <CInputGroup>
                  <CInputGroupText className="bg-light">
                    <CIcon icon={cilSearch} />
                  </CInputGroupText>
                  <CFormInput
                    placeholder="Search employees..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border-start-0"
                  />
                </CInputGroup>
              </CCol>
              <CCol md={3} className="mb-3 mb-md-0">
                <CDropdown>
                  <CDropdownToggle color="light" className="w-100">
                    Filter by Status: {statusFilter}
                  </CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem onClick={() => setStatusFilter('All')}>All</CDropdownItem>
                    <CDropdownItem onClick={() => setStatusFilter('Active')}>Active</CDropdownItem>
                    <CDropdownItem onClick={() => setStatusFilter('Inactive')}>
                      Inactive
                    </CDropdownItem>
                    <CDropdownItem onClick={() => setStatusFilter('Potential')}>
                      Potential
                    </CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
              </CCol>
            </CRow>
            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead>
                <CTableRow className="bg-light">
                  <CTableHeaderCell className="text-center">Employee</CTableHeaderCell>
                  <CTableHeaderCell>Contact</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Position</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Hire Date</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Status</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Projects</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {filteredEmployees.map((employee, index) => (
                  <CTableRow key={index} className="align-middle">
                    <CTableDataCell>
                      <div className="d-flex align-items-center">
                        <CAvatar
                          color={employee.status === 'Active' ? 'primary' : 'secondary'}
                          size="md"
                          className="me-3"
                        >
                          {employee.firstname.charAt(0)}
                        </CAvatar>
                        <div>
                          <div className="fw-semibold">{`${employee.firstname} ${employee.lastname}`}</div>
                          <div className="small text-medium-emphasis">
                            <CIcon icon={cilBriefcase} className="me-1" />
                            {employee.projects} {employee.projects === 1 ? 'project' : 'projects'}
                          </div>
                        </div>
                      </div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>
                        <CIcon icon={cilEnvelopeClosed} className="me-2 text-muted" />
                        {employee.email}
                      </div>
                      <div className="mt-1">
                        <CIcon icon={cilPhone} className="me-2 text-muted" />
                        {employee.phone}
                      </div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      {employee.position}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      {new Date(employee.hireDate).toLocaleDateString()} {/* Format the hire date */}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      {getStatusBadge(employee.status)}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CBadge color="info" shape="rounded-pill" className="px-3">
                        {employee.projects}
                      </CBadge>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CDropdown alignment="end">
                        <CDropdownToggle color="light" caret={false} className="p-0">
                          <CIcon icon={cilOptions} />
                        </CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem href="#">View Details</CDropdownItem>
                          <CDropdownItem href="#">Edit</CDropdownItem>
                          <CDropdownItem href="#" className="text-danger">
                            Delete
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

export default Employees
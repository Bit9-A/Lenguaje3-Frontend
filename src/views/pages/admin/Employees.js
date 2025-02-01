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
  CFormSelect,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilOptions,
  cilSearch,
  cilEnvelopeClosed,
  cilPhone,
  cilBriefcase,
  cilPlus,
} from '@coreui/icons'
import { helpHttp } from '../../../helpers/helpHTTP'
import { baseUrl } from '../../../config' // Importar baseUrl

const Employees = () => {
  const [employees, setEmployees] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [showModal, setShowModal] = useState(false)
  const [currentEmployee, setCurrentEmployee] = useState(null)
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    position: '',
    status: 'Active',
    projects: 0,
    hireDate: '',
  })
  const api = helpHttp()

  useEffect(() => {
    const fetchData = async () => {
      const employeesRes = await api.get(`${baseUrl}/employees`)
      if (!employeesRes.err) {
        setEmployees(employeesRes)
      } else {
        setEmployees(null)
      }
    }

    fetchData()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (currentEmployee) {
      await updateEmployee(currentEmployee.id, formData)
    } else {
      await addEmployee(formData)
    }
    setShowModal(false)
    setCurrentEmployee(null)
    setFormData({
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      position: '',
      status: 'Active',
      projects: 0,
      hireDate: '',
    })
    const employeesRes = await api.get(`${baseUrl}/employees`)
    if (!employeesRes.err) {
      setEmployees(employeesRes)
    } else {
      setEmployees(null)
    }
  }

  const addEmployee = async (employee) => {
    try {
      await api.post(`${baseUrl}/employees`, { body: employee })
    } catch (error) {
      console.error('Error adding employee:', error)
    }
  }

  const updateEmployee = async (id, employee) => {
    try {
      await api.put(`${baseUrl}/employees/${id}`, { body: employee })
    } catch (error) {
      console.error('Error updating employee:', error)
    }
  }

  const deleteEmployee = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await api.del(`${baseUrl}/employees/${id}`)
        const employeesRes = await api.get(`${baseUrl}/employees`)
        if (!employeesRes.err) {
          setEmployees(employeesRes)
        } else {
          setEmployees(null)
        }
      } catch (error) {
        console.error('Error deleting employee:', error)
      }
    }
  }

  const openModal = (employee = null) => {
    if (employee) {
      setCurrentEmployee(employee)
      setFormData(employee)
    } else {
      setCurrentEmployee(null)
      setFormData({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        position: '',
        status: 'Active',
        projects: 0,
        hireDate: '',
      })
    }
    setShowModal(true)
  }

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

  const filteredEmployees = employees
    ? employees.filter(
        (employee) =>
          (employee.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
          (statusFilter === 'All' || employee.status === statusFilter),
      )
    : []

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4 shadow-sm">
          <CCardHeader className="bg-transparent border-bottom-0 d-flex justify-content-between align-items-center">
            <h2 className="mb-0">Employee List</h2>
            <CButton color="primary" onClick={() => openModal()}>
              <CIcon icon={cilPlus} className="me-2" />
              Add Employee
            </CButton>
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
                    <CTableDataCell className="text-center">{employee.position}</CTableDataCell>
                    <CTableDataCell className="text-center">
                      {new Date(employee.hireDate).toLocaleDateString()}
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
                          <CDropdownItem onClick={() => openModal(employee)}>Edit</CDropdownItem>
                          <CDropdownItem
                            onClick={() => deleteEmployee(employee.id)}
                            className="text-danger"
                          >
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

      <CModal visible={showModal} onClose={() => setShowModal(false)}>
        <CForm onSubmit={handleSubmit}>
          <CModalHeader closeButton>
            <CModalTitle>{currentEmployee ? 'Edit Employee' : 'Add Employee'}</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CRow>
              <CCol md={6}>
                <div className="mb-3">
                  <CFormLabel htmlFor="firstname">First Name</CFormLabel>
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
                  <CFormLabel htmlFor="lastname">Last Name</CFormLabel>
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
              <CFormLabel htmlFor="phone">Phone</CFormLabel>
              <CFormInput
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="position">Position</CFormLabel>
              <CFormInput
                id="position"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="status">Status</CFormLabel>
              <CFormSelect
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Potential">Potential</option>
              </CFormSelect>
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="projects">Projects</CFormLabel>
              <CFormInput
                type="number"
                id="projects"
                name="projects"
                value={formData.projects}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="hireDate">Hire Date</CFormLabel>
              <CFormInput
                type="date"
                id="hireDate"
                name="hireDate"
                value={formData.hireDate}
                onChange={handleInputChange}
                required
              />
            </div>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setShowModal(false)}>
              Close
            </CButton>
            <CButton color="primary" type="submit">
              {currentEmployee ? 'Update' : 'Add'} Employee
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    </CRow>
  )
}

export default Employees
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
  cilUser,
  cilPlus,
} from '@coreui/icons'
import { helpHttp } from '../../../helpers/helpHTTP'
import { baseUrl } from '../../../config' // Importar baseUrl
import { Link } from 'react-router-dom'

const Users = () => {
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [showModal, setShowModal] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    preferences: '',
    username: '',
    role_id: '',
    status: 'Active',
    employee_id: null,
  })
  const api = helpHttp()

  useEffect(() => {
    const fetchData = async () => {
      const usersRes = await api.get(`${baseUrl}/users`)
      if (!usersRes.err) {
        setUsers(Array.isArray(usersRes) ? usersRes : [])
      } else {
        setUsers([])
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
    if (currentUser) {
      await updateUser(currentUser.id, formData)
    } else {
      await addUser(formData)
    }
    setShowModal(false)
    setCurrentUser(null)
    setFormData({
      email: '',
      phone: '',
      preferences: '',
      username: '',
      role_id: '',
      status: 'Active',
      employee_id: null,
    })
    const usersRes = await api.get(`${baseUrl}/users`)
    if (!usersRes.err) {
      setUsers(Array.isArray(usersRes) ? usersRes : [])
    } else {
      setUsers([])
    }
  }

  const addUser = async (user) => {
    try {
      await api.post(`${baseUrl}/users`, { body: user })
    } catch (error) {
      console.error('Error adding user:', error)
    }
  }

  const updateUser = async (id, user) => {
    try {
      await api.put(`${baseUrl}/users/${id}`, { body: user })
    } catch (error) {
      console.error('Error updating user:', error)
    }
  }

  const deleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await api.del(`${baseUrl}/users/${id}`)
        const usersRes = await api.get(`${baseUrl}/users`)
        if (!usersRes.err) {
          setUsers(Array.isArray(usersRes) ? usersRes : [])
        } else {
          setUsers([])
        }
      } catch (error) {
        console.error('Error deleting user:', error)
      }
    }
  }

  const openModal = (user = null) => {
    if (user) {
      setCurrentUser(user)
      setFormData(user)
    } else {
      setCurrentUser(null)
      setFormData({
        email: '',
        phone: '',
        preferences: '',
        username: '',
        role_id: '',
        status: 'Active',
        employee_id: null,
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
      default:
        return (
          <CBadge color="secondary" shape="rounded-pill">
            {status}
          </CBadge>
        )
    }
  }

  const filteredUsers = users
    ? users.filter(
        (user) =>
          ((user.username && user.username.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase()))) &&
          (statusFilter === 'All' || user.status === statusFilter),
      )
    : []

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4 shadow-sm">
          <CCardHeader className="bg-transparent border-bottom-0 d-flex justify-content-between align-items-center">
            <h2 className="mb-0">User List</h2>
            <CButton color="primary" onClick={() => openModal()}>
              <CIcon icon={cilPlus} className="me-2" />
              Add User
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
                    placeholder="Search users..."
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
                  </CDropdownMenu>
                </CDropdown>
              </CCol>
            </CRow>
            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead>
                <CTableRow className="bg-light">
                  <CTableHeaderCell className="text-center">User</CTableHeaderCell>
                  <CTableHeaderCell>Contact</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Employee ID</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Status</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {filteredUsers.map((user, index) => (
                  <CTableRow key={index} className="align-middle">
                    <CTableDataCell>
                      <div className="d-flex align-items-center">
                        <CAvatar
                          color={user.status === 'Active' ? 'primary' : 'secondary'}
                          size="md"
                          className="me-3"
                        >
                          {user.username ? user.username.charAt(0) : ''}
                        </CAvatar>
                        <div>
                          <div className="fw-semibold">{user.username}</div>
                        </div>
                      </div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>
                        <CIcon icon={cilEnvelopeClosed} className="me-2 text-muted" />
                        {user.email}
                      </div>
                      <div className="mt-1">
                        <CIcon icon={cilPhone} className="me-2 text-muted" />
                        {user.phone}
                      </div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      {user.employee_id ? (
                        <Link to={`/employee/${user.employee_id}`}>{user.employee_id}</Link>
                      ) : (
                        'N/A'
                      )}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      {getStatusBadge(user.status)}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CDropdown alignment="end">
                        <CDropdownToggle color="light" caret={false} className="p-0">
                          <CIcon icon={cilOptions} />
                        </CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem onClick={() => openModal(user)}>Edit</CDropdownItem>
                          <CDropdownItem
                            onClick={() => deleteUser(user.id)}
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
            <CModalTitle>{currentUser ? 'Edit User' : 'Add User'}</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CRow>
              <CCol md={6}>
                <div className="mb-3">
                  <CFormLabel htmlFor="username">Username</CFormLabel>
                  <CFormInput
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </CCol>
              <CCol md={6}>
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
              </CCol>
            </CRow>
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
              <CFormLabel htmlFor="preferences">Preferences</CFormLabel>
              <CFormInput
                id="preferences"
                name="preferences"
                value={formData.preferences}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="role_id">Role ID</CFormLabel>
              <CFormInput
                id="role_id"
                name="role_id"
                value={formData.role_id}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="employee_id">Employee ID</CFormLabel>
              <CFormInput
                id="employee_id"
                name="employee_id"
                value={formData.employee_id || ''}
                onChange={handleInputChange}
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
              </CFormSelect>
            </div>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setShowModal(false)}>
              Close
            </CButton>
            <CButton color="primary" type="submit">
              {currentUser ? 'Update' : 'Add'} User
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    </CRow>
  )
}

export default Users
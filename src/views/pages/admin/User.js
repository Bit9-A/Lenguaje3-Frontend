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
  CForm,
  CFormInput,
  CFormSelect,
  CBadge,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash, cilPlus, cilSearch } from '@coreui/icons'
import { helpHttp } from '../../../helpers/helpHTTP'

const UserManagement = () => {
  const [users, setUsers] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    preferences: '',
    username: '',
    role_id: '',
    status: 'Active'
  })

  const api = helpHttp()
  const baseUrl = 'http://localhost:5000/users'

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    const response = await api.get(baseUrl)
    if (!response.err) {
      setUsers(response)
    } else {
      console.error('Error fetching users:', response.err)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (currentUser) {
      await updateUser(currentUser.id, formData)
    } else {
      await createUser(formData)
    }
    setShowModal(false)
    setCurrentUser(null)
    setFormData({
      name: '',
      email: '',
      password: '',
      phone: '',
      address: '',
      preferences: '',
      username: '',
      role_id: '',
      status: 'Active'
    })
    fetchUsers()
  }

  const createUser = async (userData) => {
    const response = await api.post(baseUrl, { body: userData })
    if (response.err) {
      console.error('Error creating user:', response.err)
    }
  }

  const updateUser = async (id, userData) => {
    const response = await api.put(`${baseUrl}/${id}`, { body: userData })
    if (response.err) {
      console.error('Error updating user:', response.err)
    }
  }

  const deleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      const response = await api.del(`${baseUrl}/${id}`)
      if (!response.err) {
        fetchUsers()
      } else {
        console.error('Error deleting user:', response.err)
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
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        preferences: '',
        username: '',
        role_id: '',
        status: 'Active'
      })
    }
    setShowModal(true)
  }

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>User Management</strong>
            <CButton color="primary" className="float-end" onClick={() => openModal()}>
              <CIcon icon={cilPlus} /> Add New User
            </CButton>
          </CCardHeader>
          <CCardBody>
            <CInputGroup className="mb-3">
              <CInputGroupText>
                <CIcon icon={cilSearch} />
              </CInputGroupText>
              <CFormInput
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </CInputGroup>
            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell>Name</CTableHeaderCell>
                  <CTableHeaderCell>Username</CTableHeaderCell>
                  <CTableHeaderCell>Email</CTableHeaderCell>
                  <CTableHeaderCell>Role</CTableHeaderCell>
                  <CTableHeaderCell>Status</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {filteredUsers.map((user) => (
                  <CTableRow key={user.id}>
                    <CTableDataCell>{user.name}</CTableDataCell>
                    <CTableDataCell>{user.username}</CTableDataCell>
                    <CTableDataCell>{user.email}</CTableDataCell>
                    <CTableDataCell>{user.role_id}</CTableDataCell>
                    <CTableDataCell>
                      <CBadge color={user.status === 'Active' ? 'success' : 'danger'}>
                        {user.status}
                      </CBadge>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton color="primary" size="sm" className="me-2" onClick={() => openModal(user)}>
                        <CIcon icon={cilPencil} />
                      </CButton>
                      <CButton color="danger" size="sm" onClick={() => deleteUser(user.id)}>
                        <CIcon icon={cilTrash} />
                      </CButton>
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
            <CModalTitle>{currentUser ? 'Edit User' : 'Add New User'}</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CFormInput
              className="mb-3"
              type="text"
              id="name"
              name="name"
              label="Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <CFormInput
              className="mb-3"
              type="email"
              id="email"
              name="email"
              label="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <CFormInput
              className="mb-3"
              type="password"
              id="password"
              name="password"
              label="Password"
              value={formData.password}
              onChange={handleInputChange}
              required={!currentUser}
            />
            <CFormInput
              className="mb-3"
              type="tel"
              id="phone"
              name="phone"
              label="Phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
            <CFormInput
              className="mb-3"
              type="text"
              id="address"
              name="address"
              label="Address"
              value={formData.address}
              onChange={handleInputChange}
            />
            <CFormInput
              className="mb-3"
              type="text"
              id="preferences"
              name="preferences"
              label="Preferences"
              value={formData.preferences}
              onChange={handleInputChange}
            />
            <CFormInput
              className="mb-3"
              type="text"
              id="username"
              name="username"
              label="Username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
            <CFormSelect
              className="mb-3"
              id="role_id"
              name="role_id"
              label="Role"
              value={formData.role_id}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a role</option>
              <option value="1">Admin</option>
              <option value="2">User</option>
            </CFormSelect>
            <CFormSelect
              className="mb-3"
              id="status"
              name="status"
              label="Status"
              value={formData.status}
              onChange={handleInputChange}
              required
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </CFormSelect>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setShowModal(false)}>
              Close
            </CButton>
            <CButton color="primary" type="submit">
              {currentUser ? 'Update' : 'Create'} User
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    </CRow>
  )
}

export default UserManagement
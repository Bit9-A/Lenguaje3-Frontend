import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CFormLabel,
  CFormInput,
  CButton,
} from '@coreui/react'
import { helpHttp } from '../../../helpers/helpHTTP'
import { baseUrl } from '../../../config' // Importar baseUrl

const Profile = () => {
  const [user, setUser] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
  })
  const [isEditing, setIsEditing] = useState(false)
  const api = helpHttp()

  useEffect(() => {
    const fetchUser = async () => {
      const userRes = await api.get(`${baseUrl}/profile`)
      if (!userRes.err) {
        setUser(userRes)
      } else {
        setUser(null)
      }
    }

    fetchUser()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.put(`${baseUrl}/profile`, { body: user })
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating profile:', error)
    }
  }

  return (
    <CRow>
      <CCol xs={12} md={8} className="mx-auto">
        <CCard className="mb-4 shadow-sm">
          <CCardHeader className="bg-transparent border-bottom-0">
            <h2 className="mb-0">User Profile</h2>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              <div className="mb-3">
                <CFormLabel htmlFor="firstname">First Name</CFormLabel>
                <CFormInput
                  id="firstname"
                  name="firstname"
                  value={user.firstname}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="lastname">Last Name</CFormLabel>
                <CFormInput
                  id="lastname"
                  name="lastname"
                  value={user.lastname}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="email">Email</CFormLabel>
                <CFormInput
                  type="email"
                  id="email"
                  name="email"
                  value={user.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="phone">Phone</CFormLabel>
                <CFormInput
                  id="phone"
                  name="phone"
                  value={user.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  required
                />
              </div>
              <div className="d-flex justify-content-between">
                {isEditing ? (
                  <>
                    <CButton color="secondary" onClick={() => setIsEditing(false)}>
                      Cancel
                    </CButton>
                    <CButton color="primary" type="submit">
                      Save Changes
                    </CButton>
                  </>
                ) : (
                  <CButton color="primary" onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </CButton>
                )}
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Profile
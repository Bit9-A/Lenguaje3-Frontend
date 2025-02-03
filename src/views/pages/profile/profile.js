// filepath: /src/components/Profile.jsx
import React, { useEffect, useState } from 'react';
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CListGroup,
  CListGroupItem,
  CBadge,
  CSpinner,
  CAlert,
  CContainer,
  CAvatar,
  CButton,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CProgress,
  CForm,
  CFormInput,
  CFormLabel,
  CInputGroup,
  CInputGroupText,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilUser, cilEnvelopeClosed, cilPhone, cilHome, cilBriefcase, cilLockLocked, cilSettings, cilPencil } from '@coreui/icons';
import { helpHttp } from '../../../helpers/helpHTTP';
import { baseUrl } from '../../../config';

const api = helpHttp();

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [employee, setEmployee] = useState(null);
  const [projects, setProjects] = useState({ active: [], completed: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(1);
  const [editMode, setEditMode] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get(`${baseUrl}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!res.err) {
          setProfile(res.user);
          setEditedProfile(res.user);
          if (res.employee) {
            setEmployee(res.employee);
            setProjects({
              active: res.employee.activeProjects,
              completed: res.employee.completedProjects
            });
          }
        } else {
          setError(res.message || 'Failed to fetch profile data.');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Failed to fetch profile data.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await api.put(`${baseUrl}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: editedProfile
      });

      if (!res.err) {
        setProfile(editedProfile);
        setEditMode(false);
      } else {
        setError(res.message || 'Failed to update profile.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile.');
    }
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const res = await api.put(`${baseUrl}/change-password`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: { newPassword }
      });

      if (!res.err) {
        setShowPasswordModal(false);
        setNewPassword('');
        setConfirmPassword('');
        // Show success message
      } else {
        setError(res.message || 'Failed to change password.');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      setError('Failed to change password.');
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <CSpinner color="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <CAlert color="danger" dismissible onClose={() => setError(null)}>
        {error}
      </CAlert>
    );
  }

  return (
    <CContainer>
      <CRow className="justify-content-center">
        <CCol xs="12" lg="10">
          <CCard className="border-0 shadow-sm">
            <CCardBody className="p-5">
              <CRow className="align-items-center mb-4">
                <CCol xs="12" md="4" className="text-center text-md-start mb-3 mb-md-0">
                  <CAvatar src={profile.avatar} size="xl" className="mb-3" />
                  <h2 className="mb-1">{profile.username}</h2>
                  <p className="text-muted mb-0">{employee?.position || 'User'}</p>
                </CCol>
                <CCol xs="12" md="8">
                  <CRow>
                    <CCol xs="6" className="border-end border-light">
                      <div className="text-center">
                        <h4 className="mb-0">{projects.active.length}</h4>
                        <small className="text-muted">Active Projects</small>
                      </div>
                    </CCol>
                    <CCol xs="6">
                      <div className="text-center">
                        <h4 className="mb-0">{projects.completed.length}</h4>
                        <small className="text-muted">Completed Projects</small>
                      </div>
                    </CCol>
                  </CRow>
                </CCol>
              </CRow>

              <CNav variant="tabs" role="tablist">
                <CNavItem>
                  <CNavLink
                    active={activeTab === 1}
                    onClick={() => setActiveTab(1)}
                  >
                    <CIcon icon={cilUser} className="me-2" />
                    Personal Data
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink
                    active={activeTab === 2}
                    onClick={() => setActiveTab(2)}
                  >
                    <CIcon icon={cilLockLocked} className="me-2" />
                    Security
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink
                    active={activeTab === 3}
                    onClick={() => setActiveTab(3)}
                  >
                    <CIcon icon={cilBriefcase} className="me-2" />
                    Projects
                  </CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent>
                <CTabPane role="tabpanel" aria-labelledby="personal-tab" visible={activeTab === 1}>
                  <CForm className="mt-4">
                    <CRow>
                      <CCol md={6} className="mb-3">
                        <CFormLabel htmlFor="firstname">First Name</CFormLabel>
                        <CInputGroup>
                          <CInputGroupText>
                            <CIcon icon={cilUser} />
                          </CInputGroupText>
                          <CFormInput
                            id="firstname"
                            name="firstname"
                            value={editedProfile.firstname || ''}
                            onChange={handleInputChange}
                            disabled={!editMode}
                          />
                        </CInputGroup>
                      </CCol>
                      <CCol md={6} className="mb-3">
                        <CFormLabel htmlFor="lastname">Last Name</CFormLabel>
                        <CInputGroup>
                          <CInputGroupText>
                            <CIcon icon={cilUser} />
                          </CInputGroupText>
                          <CFormInput
                            id="lastname"
                            name="lastname"
                            value={editedProfile.lastname || ''}
                            onChange={handleInputChange}
                            disabled={!editMode}
                          />
                        </CInputGroup>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol md={6} className="mb-3">
                        <CFormLabel htmlFor="phone">Phone</CFormLabel>
                        <CInputGroup>
                          <CInputGroupText>
                            <CIcon icon={cilPhone} />
                          </CInputGroupText>
                          <CFormInput
                            id="phone"
                            name="phone"
                            value={editedProfile.phone || ''}
                            onChange={handleInputChange}
                            disabled={!editMode}
                          />
                        </CInputGroup>
                      </CCol>
                      <CCol md={6} className="mb-3">
                        <CFormLabel htmlFor="address">Address</CFormLabel>
                        <CInputGroup>
                          <CInputGroupText>
                            <CIcon icon={cilHome} />
                          </CInputGroupText>
                          <CFormInput
                            id="address"
                            name="address"
                            value={editedProfile.address || ''}
                            onChange={handleInputChange}
                            disabled={!editMode}
                          />
                        </CInputGroup>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol className="text-end">
                        {!editMode ? (
                          <CButton color="primary" onClick={() => setEditMode(true)}>
                            <CIcon icon={cilPencil} className="me-2" />
                            Edit
                          </CButton>
                        ) : (
                          <>
                            <CButton color="secondary" onClick={() => setEditMode(false)} className="me-2">
                              Cancel
                            </CButton>
                            <CButton color="primary" onClick={handleSaveChanges}>
                              Save Changes
                            </CButton>
                          </>
                        )}
                      </CCol>
                    </CRow>
                  </CForm>
                </CTabPane>
                <CTabPane role="tabpanel" aria-labelledby="security-tab" visible={activeTab === 2}>
                  <CListGroup className="mt-4">
                    <CListGroupItem className="d-flex justify-content-between align-items-center">
                      <div>
                        <CIcon icon={cilEnvelopeClosed} className="me-2 text-primary" />
                        Email
                      </div>
                      <span>{profile.email}</span>
                    </CListGroupItem>
                    <CListGroupItem className="d-flex justify-content-between align-items-center">
                      <div>
                        <CIcon icon={cilLockLocked} className="me-2 text-primary" />
                        Password
                      </div>
                      <CButton color="primary" variant="outline" size="sm" onClick={() => setShowPasswordModal(true)}>
                        Change Password
                      </CButton>
                    </CListGroupItem>
                  </CListGroup>
                </CTabPane>
                <CTabPane role="tabpanel" aria-labelledby="projects-tab" visible={activeTab === 3}>
                  <CRow className="mt-4">
                    <CCol xs="12" md="6">
                      <h5 className="mb-3">Active Projects</h5>
                      {projects.active.map(project => (
                        <CCard key={project.id} className="mb-3 border-0 shadow-sm">
                          <CCardBody>
                            <div className="d-flex justify-content-between align-items-center">
                              <h6 className="mb-0">{project.name}</h6>
                              <CBadge color="success">Active</CBadge>
                            </div>
                            <CProgress className="mt-3" value={75} />
                          </CCardBody>
                        </CCard>
                      ))}
                    </CCol>
                    <CCol xs="12" md="6">
                      <h5 className="mb-3">Completed Projects</h5>
                      {projects.completed.map(project => (
                        <CCard key={project.id} className="mb-3 border-0 shadow-sm">
                          <CCardBody>
                            <div className="d-flex justify-content-between align-items-center">
                              <h6 className="mb-0">{project.name}</h6>
                              <CBadge color="secondary">Completed</CBadge>
                            </div>
                            <CProgress className="mt-3" value={100} />
                          </CCardBody>
                        </CCard>
                      ))}
                    </CCol>
                  </CRow>
                </CTabPane>
              </CTabContent>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CModal visible={showPasswordModal} onClose={() => setShowPasswordModal(false)}>
        <CModalHeader closeButton>
          <CModalTitle>Change Password</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CFormLabel htmlFor="newPassword">New Password</CFormLabel>
            <CInputGroup className="mb-3">
              <CInputGroupText>
                <CIcon icon={cilLockLocked} />
              </CInputGroupText>
              <CFormInput
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </CInputGroup>
            <CFormLabel htmlFor="confirmPassword">Confirm New Password</CFormLabel>
            <CInputGroup>
              <CInputGroupText>
                <CIcon icon={cilLockLocked} />
              </CInputGroupText>
              <CFormInput
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </CInputGroup>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowPasswordModal(false)}>
            Cancel
          </CButton>
          <CButton color="primary" onClick={handlePasswordChange}>
            Change Password
          </CButton>
        </CModalFooter>
      </CModal>
    </CContainer>
  );
};

export default Profile;
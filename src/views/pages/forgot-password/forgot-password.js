import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';
import { helpHttp } from '../../../helpers/helpHTTP';
import { baseUrl } from '../../../config';

const api = helpHttp();

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setMessage('');
    setErrorMessage('');

    try {
      const res = await api.post(`${baseUrl}/request-password-reset`, {
        body: { email },
      });

      if (!res.err) {
        setMessage('Password reset link has been sent to your email.');
      } else {
        setErrorMessage(res.message || 'Failed to send password reset link.');
      }
    } catch (error) {
      setErrorMessage('An unexpected error occurred.');
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-row align-items-center bg-image">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleForgotPassword}>
                    <h1>Forgot Password</h1>
                    <p className="text-medium-emphasis">Enter your email to reset your password</p>
                    {message && <p className="text-success">{message}</p>}
                    {errorMessage && <p className="text-danger">{errorMessage}</p>}
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        type="email"
                        placeholder="Email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" type="submit">
                          Send Reset Link
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <Link to="/login">
                          <CButton color="link" className="px-0">
                            Back to Login
                          </CButton>
                        </Link>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default ForgotPassword;
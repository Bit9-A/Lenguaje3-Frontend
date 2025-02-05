import React from 'react';
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
} from '@coreui/react';

const SessionPopup = ({ show, onExtendSession, onLogout }) => {
  return (
    <CModal visible={show} onClose={onLogout}>
      <CModalHeader onClose={onLogout}>
        <CModalTitle>Session Expiration</CModalTitle>
      </CModalHeader>
      <CModalBody>Your session is about to expire. Would you like to extend your session?</CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onLogout}>
          Logout
        </CButton>
        <CButton color="primary" onClick={onExtendSession}>
          Extend Session
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default SessionPopup;
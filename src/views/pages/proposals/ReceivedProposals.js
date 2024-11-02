import React from 'react'
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
  CBadge,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSearch, cilCheckCircle, cilXCircle } from '@coreui/icons'

const ReceivedProposals = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4 shadow-sm">
          <CCardHeader className="bg-transparent border-bottom-0">
            <h2 className="mb-0">Received Proposals</h2>
          </CCardHeader>
          <CCardBody>
            <CRow className="mb-4">
              <CCol md={6}>
                <CInputGroup>
                  <CInputGroupText className="bg-light">
                    <CIcon icon={cilSearch} />
                  </CInputGroupText>
                  <CFormInput
                    placeholder="Search proposals..."
                    className="border-start-0"
                  />
                </CInputGroup>
              </CCol>
            </CRow>
            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead>
                <CTableRow className="bg-light">
                  <CTableHeaderCell>Client</CTableHeaderCell>
                  <CTableHeaderCell>Project</CTableHeaderCell>
                  <CTableHeaderCell>Date</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Status</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
               
                <CTableRow>
                  <CTableDataCell>John Doe</CTableDataCell>
                  <CTableDataCell>Kitchen Remodeling</CTableDataCell>
                  <CTableDataCell>2023-05-15</CTableDataCell>
                  <CTableDataCell className="text-center">
                    <CBadge color="warning" shape="rounded-pill">Pending</CBadge>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <CButton color="info" variant="ghost" size="sm">
                      <CIcon icon={""} /> View
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableDataCell></CTableDataCell>
                  <CTableDataCell></CTableDataCell>
                  <CTableDataCell></CTableDataCell>
                  <CTableDataCell className="text-center">
                    <CBadge color="success" shape="rounded-pill">Approve</CBadge>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <CButton color="info" variant="ghost" size="sm">
                      <CIcon icon={""} /> View
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableDataCell></CTableDataCell>
                  <CTableDataCell></CTableDataCell>
                  <CTableDataCell></CTableDataCell>
                  <CTableDataCell className="text-center">
                    <CBadge color="danger" shape="rounded-pill">Reject</CBadge>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <CButton color="info" variant="ghost" size="sm">
                      <CIcon icon={""} /> View
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
        
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>

      <CModal visible={true} onClose={() => {}}>
        <CModalHeader closeButton>
          <CModalTitle>Proposal Details</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p><strong>Client:</strong> John Doe</p>
          <p><strong>Project:</strong> Kitchen Remodeling</p>
          <p><strong>Date:</strong> 2023-05-15</p>
          <p><strong>Status:</strong> <CBadge color="warning" shape="rounded-pill">Pending</CBadge></p>

 
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => {}}>
            Close
          </CButton>
          <CButton color="success">
            <CIcon icon={cilCheckCircle} /> Approve
          </CButton>
          <CButton color="danger">
            <CIcon icon={cilXCircle} /> Reject
          </CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  )
}

export default ReceivedProposals
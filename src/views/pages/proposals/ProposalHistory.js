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
  CForm,
  CFormTextarea,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSearch, cilCommentSquare, cilClock } from '@coreui/icons'

const ProposalHistory = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4 shadow-sm">
          <CCardHeader className="bg-transparent border-bottom-0">
            <h2 className="mb-0">Proposal History</h2>
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
                    <CBadge color="success" shape="rounded-pill">Approved</CBadge>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <CButton color="info" variant="ghost" size="sm">
                      <CIcon icon={cilCommentSquare} /> View History
                    </CButton>
                  </CTableDataCell>
                </CTableRow>

              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>

      <CModal visible={true} onClose={() => {}} size="lg">
        <CModalHeader closeButton>
          <CModalTitle>Proposal History</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <h4>Kitchen Remodeling</h4>
          <p><strong>Client:</strong> John Doe</p>
          <p><strong>Date:</strong> 2023-05-15</p>
          <p><strong>Status:</strong> <CBadge color="success" shape="rounded-pill">Approved</CBadge></p>
          <h5 className="mt-4">Comments:</h5>
          <div className="mb-2 p-2 bg-light rounded">
            <CIcon icon={cilClock} className="me-2" />
            Great project!
          </div>
          <div className="mb-2 p-2 bg-light rounded">
            <CIcon icon={cilClock} className="me-2" />
            Completed on time.
          </div>
          <CForm className="mt-4">
            <CFormTextarea
              id="newComment"
              label="Add a comment"
              rows={3}
            ></CFormTextarea>
            <CButton type="submit" color="primary" className="mt-3">
              Add Comment
            </CButton>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => {}}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  )
}

export default ProposalHistory
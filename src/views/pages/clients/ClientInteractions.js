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
  CFormSelect,
  CBadge,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormTextarea,
  CFormCheck,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSearch, cilPlus, cilPhone, cilEnvelopeClosed, cilPeople, cilNotes } from '@coreui/icons'

const ClientInteracctions = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4 shadow-sm">
          <CCardHeader className="bg-transparent border-bottom-0">
            <h2 className="mb-0">Client Interactions</h2>
          </CCardHeader>
          <CCardBody>
            <CRow className="mb-4 align-items-end">
              <CCol md={3}>
                <CInputGroup>
                  <CInputGroupText className="bg-light">
                    <CIcon icon={cilSearch} />
                  </CInputGroupText>
                  <CFormInput
                    placeholder="Search interactions..."
                    className="border-start-0"
                  />
                </CInputGroup>
              </CCol>
              <CCol md={2}>
                <CFormSelect>
                  <option value="All">All Types</option>
                  <option value="Call">Call</option>
                  <option value="Email">Email</option>
                  <option value="Meeting">Meeting</option>
                </CFormSelect>
              </CCol>
              <CCol md={4}>
                <CFormInput
                  type="date"
                  placeholder="Select date range"
                  className="form-control"
                />
              </CCol>
              <CCol md={3} className="text-end">
                <CButton color="primary">
                  <CIcon icon={cilPlus} className="me-2" />
                  New Interaction
                </CButton>
              </CCol>
            </CRow>
            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead>
                <CTableRow className="bg-light">
                  <CTableHeaderCell>Client</CTableHeaderCell>
                  <CTableHeaderCell>Type</CTableHeaderCell>
                  <CTableHeaderCell>Date</CTableHeaderCell>
                  <CTableHeaderCell>Notes</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Follow-up</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>

                <CTableRow>
                  <CTableDataCell>John Doe</CTableDataCell>
                  <CTableDataCell>
                    <CIcon icon={cilPhone} className="me-2" />
                    Call
                  </CTableDataCell>
                  <CTableDataCell>2023-05-15</CTableDataCell>
                  <CTableDataCell>Discussed kitchen remodeling options...</CTableDataCell>
                  <CTableDataCell className="text-center">
                    <CBadge color="warning" shape="rounded-pill">Follow-up</CBadge>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <CButton color="info" variant="ghost" size="sm">
                      <CIcon icon={cilNotes} /> View Details
                    </CButton>
                  </CTableDataCell>
                </CTableRow>

              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>

      <CModal visible={false}>
        <CModalHeader closeButton>
          <CModalTitle>New Interaction</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <div className="mb-3">
              <CFormInput
                label="Client"
              />
            </div>
            <div className="mb-3">
              < CFormSelect
                label="Type"
              >
                <option value="Call">Call</option>
                <option value="Email">Email</option>
                <option value="Meeting">Meeting</option>
              </CFormSelect>
            </div>
            <div className="mb-3">
              <CFormInput
                type="date"
                label="Date"
              />
            </div>
            <div className="mb-3">
              <CFormTextarea
                label="Notes"
                rows={3}
              ></CFormTextarea>
            </div>
            <div className="mb-3">
              <CFormCheck
                label="Requires Follow-up"
              />
            </div>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary">
            Cancel
          </CButton>
          <CButton color="primary">
            Save
          </CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  )
}

export default ClientInteractions;
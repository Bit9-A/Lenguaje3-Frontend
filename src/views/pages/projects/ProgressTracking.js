import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CProgress,
  CProgressBar,
  CInputGroup,
  CInputGroupText,
  CFormInput,
  CFormSelect,
  CBadge,
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
  CListGroup,
  CListGroupItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { 
  cilSearch, 
  cilCheckCircle, 
  cilXCircle, 
  cilClock,
  cilHamburgerMenu
} from '@coreui/icons'
import { baseUrl } from '../../../config' // Importar baseUrl

const ProgressTracking = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4 shadow-sm">
          <CCardHeader className="bg-transparent border-bottom-0">
            <h2 className="mb-0">Project Progress Tracking</h2>
          </CCardHeader>
          <CCardBody>
            <CRow className="mb-4 align-items-end">
              <CCol md={6}>
                <CInputGroup>
                  <CInputGroupText className="bg-light">
                    <CIcon icon={cilSearch} />
                  </CInputGroupText>
                  <CFormInput
                    placeholder="Search projects..."
                    className="border-start-0"
                  />
                </CInputGroup>
              </CCol>
              <CCol md={3}>
                <CFormSelect>
                  <option value="All">All Statuses</option>
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </CFormSelect>
              </CCol>
            </CRow>
            
            <CCard className="mb-4">
              <CCardHeader>
                <CRow className="align-items-center">
                  <CCol>
                    <h3 className="mb-0">Kitchen Remodeling</h3>
                    <small className="text-muted">Client: John Doe</small>
                  </CCol>
                  <CCol xs="auto">
                    <CBadge color="warning" shape="rounded-pill">In Progress</CBadge>
                  </CCol>
                </CRow>
              </CCardHeader>
              <CCardBody>
                <CRow className="mb-3">
                  <CCol>
                    <div className="d-flex justify-content-between mb-1">
                      <span>Progress</span>
                      <span>75%</span>
                    </div>
                    <CProgress className="mb-3">
                      <CProgressBar value={75} />
                    </CProgress>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol xs={6}>
                    <strong>Start Date:</strong> 2023-05-01
                  </CCol>
                  <CCol xs={6}>
                    <strong>End Date:</strong> 2023-06-15
                  </CCol>
                </CRow>
                <CAccordion flush>
                  <CAccordionItem itemKey={1}>
                    <CAccordionHeader>
                      <CIcon icon={cilHamburgerMenu} className="me-2" />
                      Milestones
                    </CAccordionHeader>
                    <CAccordionBody>
                      <CListGroup>
                        <CListGroupItem className="d-flex justify-content-between align-items-center">
                          Design Approval
                          <CIcon icon={cilCheckCircle} className="text-success" />
                        </CListGroupItem>
                        <CListGroupItem className="d-flex justify-content-between align-items-center">
                          Demolition
                          <CIcon icon={cilCheckCircle} className="text-success" />
                        </CListGroupItem>
                        <CListGroupItem className="d-flex justify-content-between align-items-center">
                          Plumbing and Electrical
                          <CIcon icon={cilClock} className="text-warning" />
                        </CListGroupItem>
                      </CListGroup>
                    </CAccordionBody>
                  </CAccordionItem>
                  <CAccordionItem itemKey={2}>
                    <CAccordionHeader>
                      <CIcon icon={cilHamburgerMenu} className="me-2" />
                      Tasks
                    </CAccordionHeader>
                    <CAccordionBody>
                      <CListGroup>
                        <CListGroupItem className="d-flex justify-content-between align-items-center">
                          Install Backsplash
                          <CIcon icon={cilXCircle} className="text-danger" />
                        </CListGroupItem>
                        <CListGroupItem className="d-flex justify-content-between align-items-center">
                          Paint Walls
                          <CIcon icon={cilClock} className="text-warning" />
                        </CListGroupItem>
                        <CListGroupItem className="d-flex justify-content-between align-items-center">
                          Install Appliances
                          <CIcon icon={cilXCircle} className="text-danger" />
                        </CListGroupItem>
                      </CListGroup>
                    </CAccordionBody>
                  </CAccordionItem>
                </CAccordion>
              </CCardBody>
            </CCard>

          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ProgressTracking
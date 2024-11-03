import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CInputGroup,
  CInputGroupText,
  CFormInput,
  CFormSelect,
  CBadge,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSearch, cilFilter } from '@coreui/icons'

const ServiceManagement = () => {
  const [services] = useState([
    { id: 1, name: 'Interior Design', duration: '2 hours', price: 150, category: 'Design' },
    { id: 2, 'name': 'Floor Installation', duration: '1 day', price: 500, category: 'Installation' },
    { id: 3, name: 'Interior Painting', duration: '1 day', price: 300, category: 'Painting' },
    { id: 4, name: 'Kitchen Remodeling', duration: '1 week', price: 5000, category: 'Remodeling' },
    { id: 5, name: 'Electrical Installation', duration: '4 hours', price: 250, category: 'Installation' },
  ])

  const [projects] = useState([
    { id: 1, name: 'Full Home Renovation', services: [1, 2, 3, 4, 5] },
    { id: 2, name: 'Kitchen Update', services: [1, 4, 5] },
    { id: 3, name: 'Living Room Refresh', services: [1, 3] },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (categoryFilter === 'All' || service.category === categoryFilter)
  )

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4 shadow-sm">
          <CCardHeader className="bg-transparent border-bottom-0">
            <h2 className="mb-0">Service Management</h2>
          </CCardHeader>
          <CCardBody>
            <CRow className="mb-4 align-items-end">
              <CCol md={4}>
                <CInputGroup>
                  <CInputGroupText className="bg-light">
                    <CIcon icon={cilSearch} />
                  </CInputGroupText>
                  <CFormInput
                    placeholder="Search services..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border-start-0"
                  />
                </CInputGroup>
              </CCol>
              <CCol md={3}>
                <CFormSelect
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="All">All Categories</option>
                  <option value="Design">Design</option>
                  <option value="Installation">Installation</option>
                  <option value="Painting">Painting</option>
                  <option value="Remodeling">Remodeling</option>
                </CFormSelect>
              </CCol>
              <CCol md={5} className="text-end">
                <CButton color="primary">
                  <CIcon icon={cilFilter} className="me-2" />
                  Filter
                </CButton>
              </CCol>
            </CRow>
            
            <h3 className="mb-3">Services List</h3>
            <CTable align="middle" className="mb-4 border" hover responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Name</CTableHeaderCell>
                  <CTableHeaderCell>Category</CTableHeaderCell>
                  <CTableHeaderCell>Duration</CTableHeaderCell>
                  <CTableHeaderCell>Price</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {filteredServices.map((service) => (
                  <CTableRow key={service.id}>
                    <CTableDataCell>{service.name}</CTableDataCell>
                    <CTableDataCell>
                      <CBadge color="info">{service.category}</CBadge>
                    </CTableDataCell>
                    <CTableDataCell>{service.duration}</CTableDataCell>
                    <CTableDataCell>${service.price}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>

            <h3 className="mb-3">Services by Project</h3>
            <CAccordion alwaysOpen>
              {projects.map((project) => (
                <CAccordionItem key={project.id}>
                  <CAccordionHeader>{project.name}</CAccordionHeader>
                  <CAccordionBody>
                    <CTable align="middle" className="mb-0 border" hover responsive>
                      <CTableHead>
                        <CTableRow>
                          <CTableHeaderCell>Service Name</CTableHeaderCell>
                          <CTableHeaderCell>Category</CTableHeaderCell>
                          <CTableHeaderCell>Duration</CTableHeaderCell>
                          <CTableHeaderCell>Price</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {project.services.map((serviceId) => {
                          const service = services.find(s => s.id === serviceId)
                          return service ? (
                            <CTableRow key={service.id}>
                              <CTableDataCell>{service.name}</CTableDataCell>
                              <CTableDataCell>
                                <CBadge color="info">{service.category}</CBadge>
                              </CTableDataCell>
                              <CTableDataCell>{service.duration}</CTableDataCell>
                              <CTableDataCell>${service.price}</CTableDataCell>
                            </CTableRow>
                          ) : null
                        })}
                      </CTableBody>
                    </CTable>
                  </CAccordionBody>
                </CAccordionItem>
              ))}
            </CAccordion>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ServiceManagement
import React, { useState, useEffect } from 'react'
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
  CBadge,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormLabel,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSearch, cilPlus, cilPencil, cilTrash } from '@coreui/icons'
import { helpHttp } from '../../../helpers/helpHTTP'
import { baseUrl } from '../../../config' // Importar baseUrl


const ServiceManagement = () => {
  const [services, setServices] = useState([])
  const [materials, setMaterials] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [showServiceModal, setShowServiceModal] = useState(false)
  const [showMaterialModal, setShowMaterialModal] = useState(false)
  const [currentService, setCurrentService] = useState(null)
  const [currentMaterial, setCurrentMaterial] = useState(null)
  const [formData, setFormData] = useState({})

  const api = helpHttp()

  useEffect(() => {
    fetchServices()
    fetchMaterials()
  }, [])

  const fetchServices = async () => {
    const response = await api.get(`${baseUrl}/services`)
    if (!response.err) {
      setServices(response)
    } else {
      console.error('Error fetching services:', response.err)
    }
  }

  const fetchMaterials = async () => {
    const response = await api.get(`${baseUrl}/materials`)
    if (!response.err) {
      setMaterials(response)
    } else {
      console.error('Error fetching materials:', response.err)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleServiceSubmit = async (e) => {
    e.preventDefault()
    if (currentService) {
      await updateService(currentService.id, formData)
    } else {
      await createService(formData)
    }
    setShowServiceModal(false)
    setCurrentService(null)
    setFormData({})
    fetchServices()
  }

  const handleMaterialSubmit = async (e) => {
    e.preventDefault()
    if (currentMaterial) {
      await updateMaterial(currentMaterial.id, formData)
    } else {
      await createMaterial(formData)
    }
    setShowMaterialModal(false)
    setCurrentMaterial(null)
    setFormData({})
    fetchMaterials()
  }

  const createService = async (service) => {
    const response = await api.post(`${baseUrl}/services`, { body: service })
    if (response.err) {
      console.error('Error creating service:', response.err)
    }
  }

  const updateService = async (id, service) => {
    const response = await api.put(`${baseUrl}/services/${id}`, { body: service })
    if (response.err) {
      console.error('Error updating service:', response.err)
    }
  }

  const deleteService = async (id) => {
    const response = await api.del(`${baseUrl}/services/${id}`)
    if (!response.err) {
      fetchServices()
    } else {
      console.error('Error deleting service:', response.err)
    }
  }

  const createMaterial = async (material) => {
    const response = await api.post(`${baseUrl}/material_types`, { body: material })
    if (response.err) {
      console.error('Error creating material:', response.err)
    }
  }

  const updateMaterial = async (id, material) => {
    const response = await api.put(`${baseUrl}/material_types/${id}`, { body: material })
    if (response.err) {
      console.error('Error updating material:', response.err)
    }
  }

  const deleteMaterial = async (id) => {
    const response = await api.del(`${baseUrl}/material_types/${id}`)
    if (!response.err) {
      fetchMaterials()
    } else {
      console.error('Error deleting material:', response.err)
    }
  }

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredMaterials = materials.filter(material =>
    material.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4 shadow-sm">
          <CCardHeader className="bg-transparent border-bottom-0">
            <h2 className="mb-0">Service and Material Management</h2>
          </CCardHeader>
          <CCardBody>
            <CRow className="mb-4 align-items-end">
              <CCol md={6}>
                <CInputGroup>
                  <CInputGroupText className="bg-light">
                    <CIcon icon={cilSearch} />
                  </CInputGroupText>
                  <CFormInput
                    placeholder="Search services or materials..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border-start-0"
                  />
                </CInputGroup>
              </CCol>
              <CCol md={3}>
                <CButton color="primary" onClick={() => { setShowServiceModal(true); setFormData({}) }}>
                  <CIcon icon={cilPlus} className="me-2" />
                  Add Service
                </CButton>
              </CCol>
              <CCol md={3}>
                <CButton color="success" onClick={() => { setShowMaterialModal(true); setFormData({}) }}>
                  <CIcon icon={cilPlus} className="me-2" />
                  Add Material
                </CButton>
              </CCol>
            </CRow>
            
            <h3 className="mb-3">Services List</h3>
            <CTable align="middle" className="mb-4 border" hover responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Name</CTableHeaderCell>
                  <CTableHeaderCell>Description</CTableHeaderCell>
                  <CTableHeaderCell>Price</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {filteredServices.map((service) => (
                  <CTableRow key={service.id}>
                    <CTableDataCell>{service.name}</CTableDataCell>
                    <CTableDataCell>{service.description}</CTableDataCell>
                    <CTableDataCell>${service.price}</CTableDataCell>
                    <CTableDataCell>
                      <CButton 
                        color="info" 
                        size="sm" 
                        className="me-2"
                        onClick={() => { setCurrentService(service); setFormData(service); setShowServiceModal(true) }}
                      >
                        <CIcon icon={cilPencil} />
                      </CButton>
                      <CButton 
                        color="danger" 
                        size="sm"
                        onClick={() => deleteService(service.id)}
                      >
                        <CIcon icon={cilTrash} />
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>

            <h3 className="mb-3">Materials List</h3>
            <CTable align="middle" className="mb-4 border" hover responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Name</CTableHeaderCell>
                  <CTableHeaderCell>Price</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {filteredMaterials.map((material) => (
                  <CTableRow key={material.id}>
                    <CTableDataCell>{material.name}</CTableDataCell>
                    <CTableDataCell>${material.price}</CTableDataCell>
                    <CTableDataCell>
                      <CButton 
                        color="info" 
                        size="sm" 
                        className="me-2"
                        onClick={() => { setCurrentMaterial(material); setFormData(material); setShowMaterialModal(true) }}
                      >
                        <CIcon icon={cilPencil} />
                      </CButton>
                      <CButton 
                        color="danger" 
                        size="sm"
                        onClick={() => deleteMaterial(material.id)}
                      >
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

      {/* Service Modal */}
      <CModal visible={showServiceModal} onClose={() => setShowServiceModal(false)}>
        <CForm onSubmit={handleServiceSubmit}>
          <CModalHeader closeButton>
            <CModalTitle>{currentService ? 'Edit Service' : 'Add New Service'}</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <div className="mb-3">
              <CFormLabel htmlFor="serviceName">Name</CFormLabel>
              <CFormInput
                type="text"
                id="serviceName"
                name="name"
                value={formData.name || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="serviceDescription">Description</CFormLabel>
              <CFormInput
                type="text"
                id="serviceDescription"
                name="description"
                value={formData.description || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="servicePrice">Price</CFormLabel>
              <CFormInput
                type="number"
                id="servicePrice"
                name="price"
                value={formData.price || ''}
                onChange={handleInputChange}
                required
              />
            </div>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setShowServiceModal(false)}>
              Close
            </CButton>
            <CButton color="primary" type="submit">
              {currentService ? 'Update' : 'Add'} Service
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>

      {/* Material Modal */}
      <CModal visible={showMaterialModal} onClose={() => setShowMaterialModal(false)}>
        <CForm onSubmit={handleMaterialSubmit}>
          <CModalHeader closeButton>
            <CModalTitle>{currentMaterial ? 'Edit Material' : 'Add New Material'}</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <div className="mb-3">
              <CFormLabel htmlFor="materialName">Name</CFormLabel>
              <CFormInput
                type="text"
                id="materialName"
                name="name"
                value={formData.name || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="materialPrice">Price</CFormLabel>
              <CFormInput
                type="number"
                id="materialPrice"
                name="price"
                value={formData.price || ''}
                onChange={handleInputChange}
                required
              />
            </div>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setShowMaterialModal(false)}>
              Close
            </CButton>
            <CButton color="primary" type="submit">
              {currentMaterial ? 'Update' : 'Add'} Material
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    </CRow>
  )
}

export default ServiceManagement
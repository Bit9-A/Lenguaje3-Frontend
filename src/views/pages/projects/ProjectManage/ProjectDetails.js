import React from 'react'
import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CButton,
  CBadge,
  CTooltip,
  CAvatar,
  CFormInput,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import {
  cilUser,
  cilPeople,
  cilCart,
  cilPlus,
  cilTrash,
  cilCloudUpload,
} from '@coreui/icons'

const ProjectDetails = ({
  selectedProject,
  employees,
  materials,
  services,
  getClientName,
  editingMaterial,
  materialQuantity,
  handleUpdateMaterialQuantity,
  handleRemoveMaterial,
  handleRemoveService,
  handleRemovePhoto,
  handleFileChange,
  setModalType,
  setEditingMaterial,
  setMaterialQuantity,
}) => {
  return (
    <div className="project-details">
      <div className="row g-4">
        <div className="col-md-6">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body">
              <h6 className="card-title d-flex align-items-center mb-4">
                <CIcon icon={cilUser} className="text-primary me-2" />
                Client Information
              </h6>
              <div className="d-flex align-items-center mb-3">
                <CAvatar size="xl" src={selectedProject.client_photo || '/placeholder.svg'} className="me-3" />
                <div>
                  <h5 className="mb-1">{getClientName(selectedProject.client_id)}</h5>
                  <p className="text-muted mb-0">{selectedProject.client_email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body">
              <h6 className="card-title d-flex align-items-center mb-4">
                <CIcon icon={cilPeople} className="text-primary me-2" />
                Project Team
              </h6>
              <div className="d-flex flex-wrap gap-2 mb-3">
                {employees.map((employee) => (
                  <CTooltip content={`${employee.firstname} ${employee.lastname}`} key={employee.id}>
                    <CAvatar size="md" src={employee.photo_url || '/placeholder.svg'} />
                  </CTooltip>
                ))}
                <CButton 
                  color="light" 
                  className="rounded-circle" 
                  onClick={() => setModalType('addEmployee')}
                >
                  <CIcon icon={cilPlus} />
                </CButton>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="card-title d-flex align-items-center mb-4">
                <CIcon icon={cilCart} className="text-primary me-2" />
                Materials
              </h6>
              <div className="table-responsive">
                <CTable align="middle" className="mb-0" hover>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>Material</CTableHeaderCell>
                      <CTableHeaderCell>Quantity</CTableHeaderCell>
                      <CTableHeaderCell>Unit</CTableHeaderCell>
                      <CTableHeaderCell>Actions</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {materials.map((material) => (
                      <CTableRow key={material.id}>
                        <CTableDataCell>
                          <div className="d-flex align-items-center">
                            <div className="bg-light p-2 rounded me-2">
                              <CIcon icon={cilCart} className="text-primary" />
                            </div>
                            {material.name}
                          </div>
                        </CTableDataCell>
                        <CTableDataCell>
                          {editingMaterial === material.id ? (
                            <CFormInput
                              type="number"
                              value={materialQuantity}
                              onChange={(e) => setMaterialQuantity(e.target.value)}
                              onBlur={() => handleUpdateMaterialQuantity(material.id, materialQuantity)}
                              autoFocus
                            />
                          ) : (
                            <span onClick={() => {
                              setEditingMaterial(material.id)
                              setMaterialQuantity(material.quantity.toString())
                            }}>
                              {material.quantity}
                            </span>
                          )}
                        </CTableDataCell>
                        <CTableDataCell>{material.unit}</CTableDataCell>
                        <CTableDataCell>
                          <CButton 
                            color="danger" 
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveMaterial(material.id)}
                          >
                            <CIcon icon={cilTrash} />
                          </CButton>
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              </div>
              <CButton 
                color="primary" 
                variant="ghost" 
                className="mt-3"
                onClick={() => setModalType('addMaterial')}
              >
                <CIcon icon={cilPlus} className="me-2" />
                Add Material
              </CButton>
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="card-title d-flex align-items-center mb-4">
                <CIcon icon={cilPeople} className="text-primary me-2" />
                Services
              </h6>
              <div className="row g-3">
                {services.map((service) => (
                  <div key={service.id} className="col-md-6 col-lg-4">
                    <div className="card h-100">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h6 className="mb-0">{service.name}</h6>
                          <CBadge color={service.status === 'Completed' ? 'success' : 'primary'}>
                            {service.status}
                          </CBadge>
                        </div>
                        <p className="text-muted small mb-0">{service.description}</p>
                        <div className="mt-3">
                          <CButton 
                            color="danger" 
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveService(service.id)}
                          >
                            Remove
                          </CButton>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="col-md-6 col-lg-4">
                  <div className="card h-100 border-dashed">
                    <div className="card-body d-flex align-items-center justify-content-center">
                      <CButton 
                        color="primary" 
                        variant="ghost"
                        onClick={() => setModalType('addService')}
                      >
                        <CIcon icon={cilPlus} className="me-2" />
                        Add Service
                      </CButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="card-title d-flex align-items-center mb-4">
                <CIcon icon={cilCloudUpload} className="text-primary me-2" />
                Project Photos
              </h6>
              <div className="row g-3">
                {selectedProject.photos?.map((photo, index) => (
                  <div key={index} className="col-6 col-md-4 col-lg-3">
                    <div className="position-relative">
                      <img 
                        src={photo.url || "/placeholder.svg"} 
                        alt={`Project photo ${index + 1}`}
                        className="img-fluid rounded shadow-sm"
                        style={{ aspectRatio: '1', objectFit: 'cover' }}
                      />
                      <CButton
                        color="danger"
                        size="sm"
                        className="position-absolute top-0 end-0 m-2"
                        onClick={() => handleRemovePhoto(photo.id)}
                      >
                        <CIcon icon={cilTrash} />
                      </CButton>
                    </div>
                  </div>
                ))}
                <div className="col-6 col-md-4 col-lg-3">
                  <div 
                    className="border-dashed rounded d-flex align-items-center justify-content-center"
                    style={{ aspectRatio: '1' }}
                  >
                    <div className="text-center">
                      <CFormInput
                        type="file"
                        id="photoUpload"
                        className="d-none"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                      <CButton 
                        color="primary" 
                        variant="ghost"
                        onClick={() => document.getElementById('photoUpload').click()}
                      >
                        <CIcon icon={cilCloudUpload} className="me-2" />
                        Upload Photo
                      </CButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetails
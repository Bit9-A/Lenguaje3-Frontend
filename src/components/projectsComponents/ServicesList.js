import React from 'react';
import {
  CCard,
  CCardBody,
  CButton,
  CBadge,

} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilPlus, cilTrash, cilPeople} from '@coreui/icons';

const Services = ({ services, handleAddService, handleRemoveService }) => {
  return (
    <CCard border-0 shadow-sm>
      <CCardBody>
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
                      <CIcon icon={cilTrash} />
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
                  onClick={handleAddService}
                >
                  <CIcon icon={cilPlus} className="me-2" />
                  Add Service
                </CButton>
              </div>
            </div>
          </div>
        </div>
      </CCardBody>
    </CCard>
  );
};

export default Services;
import React, { useState, useEffect } from 'react';
import {
  CCard,
  CCardBody,
  CButton,
  CBadge,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CListGroup,
  CListGroupItem,
  CFormInput,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilPlus, cilTrash, cilPeople } from '@coreui/icons';
import { helpHttp } from '../../helpers/helpHTTP';
import { baseUrl } from '../../config';

const api = helpHttp();

const ServicesList = ({ projectId }) => {
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [availableServices, setAvailableServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProjectServices();
    fetchAvailableServices();
  }, []);

  const fetchProjectServices = async () => {
    try {
      const response = await api.get(`${baseUrl}/projects/services/${projectId}`);
      if (!response.err) {
        setServices(response);
      } else {
        throw new Error(response.err);
      }
    } catch (err) {
      console.error('Error fetching project services:', err);
    }
  };

  const fetchAvailableServices = async () => {
    try {
      const response = await api.get(`${baseUrl}/services`);
      if (!response.err) {
        setAvailableServices(response);
      } else {
        throw new Error(response.err);
      }
    } catch (err) {
      console.error('Error fetching available services:', err);
    }
  };

  const handleSelectService = (service) => {
    setSelectedService(service);
  };

  const handleAddService = async () => {
    let end_date = new Date();
    
    if (selectedService) {
      let serviceExists = services.some((service) => service.id === selectedService.id);
      if (serviceExists) {
        console.error('Service already added to project');
        return;
      }
      try {
        const response = await api.post(`${baseUrl}/projects/add-service`, {
          body: { project_id: projectId, service_id: selectedService.id, is_paid: 'false', status: 'Pending', end_date: end_date.toISOString },
          headers: { 'Content-Type': 'application/json' },
        });
        if (!response.err) {
          setServices([...services, response]);
          setSelectedService(null);
          setShowModal(false);
        } else {
          throw new Error(response.err);
        }
      } catch (err) {
        console.error('Error adding service to project:', err);
      }
    }
  };

  const handleRemoveService = async (serviceId) => {
    try {
      const response = await api.del(`${baseUrl}/projects/remove-service/${projectId}/${serviceId}`);
      if (!response.err) {
        setServices(services.filter((service) => service.id !== serviceId));
      } else {
        throw new Error(response.err);
      }
    } catch (err) {
      console.error('Error removing service from project:', err);
    }
  };

  const filteredServices = availableServices.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
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
                    <p className="text-muted small mb-0">Price: ${service.price}</p>
                    <p className="text-muted small mb-0">End Date: {service.end_date ? new Date(service.end_date).toLocaleDateString() : 'N/A'}</p>
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
                    onClick={() => setShowModal(true)}
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

      <CModal visible={showModal} onClose={() => setShowModal(false)}>
        <CModalHeader onClose={() => setShowModal(false)}>
          <CModalTitle>Select Service</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormInput
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-3"
          />
          <CListGroup>
            {filteredServices.map((service) => (
              <CListGroupItem
                key={service.id}
                active={selectedService?.id === service.id}
                onClick={() => handleSelectService(service)}
                style={{ cursor: 'pointer' }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div>{service.name}</div>
                    <div className="text-muted small">Price: ${service.price}</div>
                  </div>
                </div>
              </CListGroupItem>
            ))}
          </CListGroup>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={handleAddService} disabled={!selectedService}>
            Add
          </CButton>
          <CButton color="secondary" onClick={() => setShowModal(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default ServicesList;
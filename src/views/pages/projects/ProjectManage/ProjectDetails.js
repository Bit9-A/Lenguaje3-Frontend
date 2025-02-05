import React, { useState, useEffect } from 'react';
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CButton,
  CAvatar,
  CTooltip,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import {
  cilUser,
  cilPeople,
  cilPlus,
} from '@coreui/icons';
import { helpHttp } from '../../../../helpers/helpHTTP';
import { baseUrl } from '../../../../config';
import EmployeeList from '../../../../components/projectsComponents/EmployeeList';
import ServicesList from '../../../../components/projectsComponents/ServicesList';
import Materials from '../../../../components/projectsComponents/MaterialsList';
import Photos from '../../../../components/projectsComponents/PhotoList';

const api = helpHttp();

const ProjectDetails = ({
  project,
  availableEmployees,
  availableMaterials,
  availableServices,
  setEditingMaterial,
  setMaterialQuantity,
  setSelectedFile,
  onClose,
}) => {
  const [employees, setEmployees] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [services, setServices] = useState([]);
  const [clientName, setClientName] = useState('Loading...');
  const [editingMaterial, setEditingMaterialState] = useState(null);
  const [materialQuantity, setMaterialQuantityState] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEmployeeList, setShowEmployeeList] = useState(false);
  const [totalCost, setTotalCost] = useState(0);
  const [availableMaterialsList, setAvailableMaterialsList] = useState([]);

  useEffect(() => {
    fetchProjectDetails(project.id);
    fetchClientName(project.id);
    fetchTotalMaterialCost(project.id);
    fetchAvailableMaterials();
  }, [project.id]);

  const fetchProjectDetails = async (projectId) => {
    setLoading(true);
    try {
      const employeesResponse = await api.get(`${baseUrl}/projects/employees/${projectId}`);
      const materialsResponse = await api.get(`${baseUrl}/projects/materials/${projectId}`);
      const servicesResponse = await api.get(`${baseUrl}/projects/services/${projectId}`);

      if (!employeesResponse.err) setEmployees(employeesResponse);
      if (!materialsResponse.err) setMaterials(materialsResponse);
      if (!servicesResponse.err) setServices(servicesResponse);
    } catch (err) {
      setError('Error fetching project details');
    } finally {
      setLoading(false);
    }
  };

  const fetchClientName = async (projectId) => {
    try {
      const response = await api.get(`${baseUrl}/projects/client-name/${projectId}`);
      if (!response.err) {
        setClientName(response.client_name);
      } else {
        throw new Error(response.err);
      }
    } catch (err) {
      setError('Error fetching client name');
      setClientName('Unknown Client');
    }
  };

  const fetchTotalMaterialCost = async (projectId) => {
    try {
      const response = await api.get(`${baseUrl}/projects/total-material-cost/${projectId}`);
      if (!response.err) {
        setTotalCost(response.totalCost);
      } else {
        throw new Error(response.err);
      }
    } catch (err) {
      setError('Error fetching total material cost');
    }
  };

  const fetchAvailableMaterials = async () => {
    try {
      const response = await api.get(`${baseUrl}/materials`);
      if (!response.err) {
        setAvailableMaterialsList(response);
      } else {
        throw new Error(response.err);
      }
    } catch (err) {
      setError('Error fetching available materials');
    }
  };

  const handleAddEmployee = (employee) => {
    setEmployees([...employees, employee]);
    setShowEmployeeList(false);
  };

  const handleAddMaterial = (material) => {
    setMaterials([...materials, material]);
  };

  const handleRemovePhoto = async (photoId) => {
    try {
      await api.delete(`${baseUrl}/projects/remove-photo/${photoId}`);
      fetchProjectDetails(project.id);
    } catch (err) {
      setError('Error removing photo');
    }
  };

  const handleAddService = (service) => {
    setServices([...services, service]);
  };

  const handleRemoveService = (serviceId) => {
    setServices(services.filter((service) => service.id !== serviceId));
  };

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
                <CAvatar size="xl" src={project.client_photo || '/placeholder.svg'} className="me-3" />
                <div>
                  <h5 className="mb-1">{project.client_name}</h5>
                  <p className="text-muted mb-0">{project.client_email}</p>
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
                  onClick={() => setShowEmployeeList(true)}
                >
                  <CIcon icon={cilPlus} />
                </CButton>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12">
          <Materials
            projectId={project.id}
            materials={materials}
            editingMaterial={editingMaterial}
            materialQuantity={materialQuantity}
            setEditingMaterial={setEditingMaterialState}
            setMaterialQuantity={setMaterialQuantityState}
            handleUpdateMaterialQuantity={(id, quantity) => {
            }}
            handleAddMaterial={handleAddMaterial}
            handleRemoveMaterial={(id) => {
            }}
            totalCost={totalCost}
          />
        </div>

        <div className="col-12">
          <ServicesList
            projectId={project.id}
            services={services}
            handleAddService={handleAddService}
            handleRemoveService={handleRemoveService}
          />
        </div>

        <div className="col-12">
          <Photos
            photos={project.photos}
            handleRemovePhoto={handleRemovePhoto}
            handleFileChange={(e) => {
            }}
          />
        </div>
      </div>

      <EmployeeList
        projectId={project.id}
        availableEmployees={availableEmployees}
        show={showEmployeeList}
        onClose={() => setShowEmployeeList(false)}
        onAddEmployee={handleAddEmployee}
      />
    </div>
  );
};

export default ProjectDetails;
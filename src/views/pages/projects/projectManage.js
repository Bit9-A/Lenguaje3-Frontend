import React, { useState, useEffect } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CAlert,
  CSpinner,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilPlus, cilBuilding } from '@coreui/icons';
import { helpHttp } from '../../../helpers/helpHTTP';
import { baseUrl } from '../../../config';
import ProjectDetails from './ProjectManage/ProjectDetails';
import ProjectForm from './ProjectManage/ProjectForm';
import ProjectList from './ProjectManage/ProjectList';

const ProjectManagement = () => {
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [services, setServices] = useState([]);
  const [availableEmployees, setAvailableEmployees] = useState([]);
  const [availableMaterials, setAvailableMaterials] = useState([]);
  const [availableServices, setAvailableServices] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [clients, setClients] = useState([]);
  const [editingMaterial, setEditingMaterial] = useState(null);
  const [materialQuantity, setMaterialQuantity] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    start_date: '',
    end_date: '',
    client_id: '',
    status: 'Planning'
  });

  const api = helpHttp();

  useEffect(() => {
    fetchProjects();
    fetchAvailableResources();
    fetchClients();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await api.get(`${baseUrl}/projects`);
      if (!response.err) {
        setProjects(response);
      } else {
        throw new Error(response.err);
      }
    } catch (err) {
      handleApiError(err, 'Error fetching projects:');
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableResources = async () => {
    try {
      const employeesResponse = await api.get(`${baseUrl}/employees`);
      const materialsResponse = await api.get(`${baseUrl}/materials`);
      const servicesResponse = await api.get(`${baseUrl}/services`);

      if (!employeesResponse.err) setAvailableEmployees(employeesResponse);
      if (!materialsResponse.err) setAvailableMaterials(materialsResponse);
      if (!servicesResponse.err) setAvailableServices(servicesResponse);
    } catch (err) {
      handleApiError(err, 'Error fetching resources:');
    }
  };

  const fetchClients = async () => {
    try {
      const response = await api.get(`${baseUrl}/clients`);
      if (!response.err) {
        setClients(response);
      } else {
        throw new Error(response.err);
      }
    } catch (err) {
      handleApiError(err, 'Error fetching clients:');
    }
  };

  const fetchProjectDetails = async (projectId) => {
    setLoading(true);
    try {
      const employeesResponse = await api.get(`${baseUrl}/projects/${projectId}/employees`);
      const materialsResponse = await api.get(`${baseUrl}/projects/${projectId}/materials`);
      const servicesResponse = await api.get(`${baseUrl}/projects/${projectId}/services`);

      if (!employeesResponse.err) setEmployees(employeesResponse);
      if (!materialsResponse.err) setMaterials(materialsResponse);
      if (!servicesResponse.err) setServices(servicesResponse);
    } catch (err) {
      handleApiError(err, 'Error fetching project details:');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      if (!selectedFile || !selectedProject) return;

      const formData = new FormData();
      formData.append('photo', selectedFile);
      formData.append('project_id', selectedProject.id);
      
      const response = await api.post(`${baseUrl}/projects/photos`, { 
        body: formData,
        headers: {
          'Content-Type': undefined 
        }
      });

      if (!response.err) {
        fetchProjectDetails(selectedProject.id);
        setSelectedFile(null);
      } else {
        throw new Error(response.err);
      }
    } catch (err) {
      handleApiError(err, 'Error uploading file:');
    }
  };

  const handleAddEmployee = async (employeeId) => {
    try {
      const response = await api.post(`${baseUrl}/projects/employees`, {
        body: {
          project_id: selectedProject.id,
          employee_id: employeeId
        }
      });

      if (!response.err) {
        fetchProjectDetails(selectedProject.id);
      } else {
        throw new Error(response.err);
      }
    } catch (err) {
      handleApiError(err, 'Error adding employee:');
    }
  };

  const handleRemoveEmployee = async (employeeId) => {
    try {
      const response = await api.del(`${baseUrl}/projects/employees/${selectedProject.id}/${employeeId}`);
      if (!response.err) {
        fetchProjectDetails(selectedProject.id);
      } else {
        throw new Error(response.err);
      }
    } catch (err) {
      handleApiError(err, 'Error removing employee:');
    }
  };

  const handleAddMaterial = async (materialId, quantity) => {
    try {
      const response = await api.post(`${baseUrl}/projects/materials`, {
        body: {
          project_id: selectedProject.id,
          material_id: materialId,
          quantity
        }
      });

      if (!response.err) {
        fetchProjectDetails(selectedProject.id);
      } else {
        throw new Error(response.err);
      }
    } catch (err) {
      handleApiError(err, 'Error adding material:');
    }
  };

  const handleRemoveMaterial = async (materialId) => {
    try {
      const response = await api.del(`${baseUrl}/projects/materials/${selectedProject.id}/${materialId}`);
      if (!response.err) {
        fetchProjectDetails(selectedProject.id);
      } else {
        throw new Error(response.err);
      }
    } catch (err) {
      handleApiError(err, 'Error removing material:');
    }
  };

  const handleAddService = async (serviceId) => {
    try {
      const response = await api.post(`${baseUrl}/projects/services`, {
        body: {
          project_id: selectedProject.id,
          service_id: serviceId,
          status: 'Pending'
        }
      });

      if (!response.err) {
        fetchProjectDetails(selectedProject.id);
      } else {
        throw new Error(response.err);
      }
    } catch (err) {
      handleApiError(err, 'Error adding service:');
    }
  };

  const handleRemoveService = async (serviceId) => {
    try {
      const response = await api.del(`${baseUrl}/projects/services/${selectedProject.id}/${serviceId}`);
      if (!response.err) {
        fetchProjectDetails(selectedProject.id);
      } else {
        throw new Error(response.err);
      }
    } catch (err) {
      handleApiError(err, 'Error removing service:');
    }
  };

  const handleProjectClick = async (project) => {
    setSelectedProject(project);
    await fetchProjectDetails(project.id);
    setShowModal(true);
    setModalType('details');
  };

  const getClientName = (clientId) => {
    const client = clients.find(c => c.id === clientId);
    return client ? `${client.firstname} ${client.lastname}` : 'Unknown Client';
  };

  const handleUpdateMaterialQuantity = async (materialId, quantity) => {
    try {
      const response = await api.put(`${baseUrl}/projects/materials/${selectedProject.id}/${materialId}`, {
        body: { quantity: parseInt(quantity) }
      });
      if (!response.err) {
        fetchProjectDetails(selectedProject.id);
        setEditingMaterial(null);
      } else {
        throw new Error(response.err);
      }
    } catch (err) {
      handleApiError(err, 'Error updating material quantity:');
    }
  };

  const handleRemovePhoto = async (photoId) => {
    try {
      const response = await api.del(`${baseUrl}/projects/photos/${photoId}`);
      if (!response.err) {
        fetchProjectDetails(selectedProject.id);
      } else {
        throw new Error(response.err);
      }
    } catch (err) {
      handleApiError(err, 'Error removing photo:');
    }
  };

  const handleApiError = (error, message) => {
    console.error(message, error);
    setError(`${message} Please try again later.`);
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post(`${baseUrl}/projects`, { body: newProject });
      if (!response.err) {
        fetchProjects();
        setShowModal(false);
        setNewProject({
          name: '',
          description: '',
          start_date: '',
          end_date: '',
          client_id: '',
          status: 'Planning'
        });
      } else {
        throw new Error(response.err);
      }
    } catch (err) {
      handleApiError(err, 'Error creating project:');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProject = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.put(`${baseUrl}/projects/${selectedProject.id}`, { body: selectedProject });
      if (!response.err) {
        fetchProjects();
        setShowModal(false);
      } else {
        throw new Error(response.err);
      }
    } catch (err) {
      handleApiError(err, 'Error updating project:');
    } finally {
      setLoading(false);
    }
  };

  return (
    <CRow>
      <CCol xs={12}>
        {error && (
          <CAlert color="danger" dismissible onClose={() => setError(null)}>
            {error}
          </CAlert>
        )}
        <CCard>
          <CCardHeader>
            <CRow className="align-items-center">
              <CCol>
                <h4>Project Management</h4>
              </CCol>
              <CCol className="text-end">
                <CButton color="primary" onClick={() => { setShowModal(true); setModalType('add'); }}>
                  <CIcon icon={cilPlus} className="me-2" /> Add Project
                </CButton>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            {loading ? (
              <div className="text-center">
                <CSpinner color="primary" />
              </div>
            ) : (
              <ProjectList
                projects={projects}
                getClientName={getClientName}
                handleProjectClick={handleProjectClick}
                setSelectedProject={setSelectedProject}
                setShowModal={setShowModal}
                setModalType={setModalType}
              />
            )}
          </CCardBody>
        </CCard>
      </CCol>

      <CModal visible={showModal} onClose={() => setShowModal(false)}>
        <CModalHeader onClose={() => setShowModal(false)}>
          <CModalTitle>{modalType === 'add' ? 'Add Project' : modalType === 'edit' ? 'Edit Project' : 'Project Details'}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {modalType === 'details' ? (
            <ProjectDetails
              project={selectedProject}
              employees={employees}
              materials={materials}
              services={services}
              availableEmployees={availableEmployees}
              availableMaterials={availableMaterials}
              availableServices={availableServices}
              handleAddEmployee={handleAddEmployee}
              handleRemoveEmployee={handleRemoveEmployee}
              handleAddMaterial={handleAddMaterial}
              handleRemoveMaterial={handleRemoveMaterial}
              handleAddService={handleAddService}
              handleRemoveService={handleRemoveService}
              handleFileChange={handleFileChange}
              handleUpload={handleUpload}
              handleUpdateMaterialQuantity={handleUpdateMaterialQuantity}
              handleRemovePhoto={handleRemovePhoto}
              editingMaterial={editingMaterial}
              setEditingMaterial={setEditingMaterial}
              materialQuantity={materialQuantity}
              setMaterialQuantity={setMaterialQuantity}
            />
          ) : (
            <ProjectForm
              modalType={modalType}
              newProject={newProject}
              selectedProject={selectedProject}
              clients={clients}
              handleCreateProject={handleCreateProject}
              handleUpdateProject={handleUpdateProject}
              setNewProject={setNewProject}
              setSelectedProject={setSelectedProject}
            />
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowModal(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  );
};

export default ProjectManagement;
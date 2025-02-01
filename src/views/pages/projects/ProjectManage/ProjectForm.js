import React from 'react';
import {
  CForm,
  CFormInput,
  CFormSelect,
  CFormTextarea,
  CRow,
  CCol,
  CButton
} from '@coreui/react';

const ProjectForm = ({
  modalType,
  newProject,
  selectedProject,
  clients,
  handleCreateProject,
  handleUpdateProject,
  setNewProject,
  setSelectedProject
}) => {
  return (
    <CForm onSubmit={modalType === 'add' ? handleCreateProject : handleUpdateProject}>
      <CRow>
        <CCol md={6}>
          <CFormInput
            id="projectName"
            label="Project Name"
            value={modalType === 'add' ? newProject.name : selectedProject?.name}
            onChange={(e) => modalType === 'add' ? 
              setNewProject({...newProject, name: e.target.value}) : 
              setSelectedProject({...selectedProject, name: e.target.value})
            }
            required
          />
        </CCol>
        <CCol md={6}>
          <CFormSelect
            id="clientId"
            label="Client"
            value={modalType === 'add' ? newProject.client_id : selectedProject?.client_id}
            onChange={(e) => modalType === 'add' ? 
              setNewProject({...newProject, client_id: e.target.value}) : 
              setSelectedProject({...selectedProject, client_id: e.target.value})
            }
            required
          >
            <option value="">Select a client</option>
            {clients.map(client => (
              <option key={client.id} value={client.id}>
                {`${client.firstname} ${client.lastname}`}
              </option>
            ))}
          </CFormSelect>
        </CCol>
      </CRow>
      <CRow className="mt-3">
        <CCol md={6}>
          <CFormInput
            type="date"
            id="startDate"
            label="Start Date"
            value={modalType === 'add' ? newProject.start_date : selectedProject?.start_date}
            onChange={(e) => modalType === 'add' ? 
              setNewProject({...newProject, start_date: e.target.value}) : 
              setSelectedProject({...selectedProject, start_date: e.target.value})
            }
            required
          />
        </CCol>
        <CCol md={6}>
          <CFormInput
            type="date"
            id="endDate"
            label="End Date"
            value={modalType === 'add' ? newProject.end_date : selectedProject?.end_date}
            onChange={(e) => modalType === 'add' ? 
              setNewProject({...newProject, end_date: e.target.value}) : 
              setSelectedProject({...selectedProject, end_date: e.target.value})
            }
          />
        </CCol>
      </CRow>
      <CRow className="mt-3">
        <CCol md={12}>
          <CFormTextarea
            id="description"
            label="Description"
            rows={3}
            value={modalType === 'add' ? newProject.description : selectedProject?.description}
            onChange={(e) => modalType === 'add' ? 
              setNewProject({...newProject, description: e.target.value}) : 
              setSelectedProject({...selectedProject, description: e.target.value})
            }
            required
          />
        </CCol>
      </CRow>
      <CRow className="mt-3">
        <CCol md={6}>
          <CFormSelect
            id="status"
            label="Status"
            value={modalType === 'add' ? newProject.status : selectedProject?.status}
            onChange={(e) => modalType === 'add' ? 
              setNewProject({...newProject, status: e.target.value}) : 
              setSelectedProject({...selectedProject, status: e.target.value})
            }
            required
          >
            <option value="Planning">Planning</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </CFormSelect>
        </CCol>
      </CRow>
      <CRow className="mt-4">
        <CCol>
          <CButton type="submit" color="primary">
            {modalType === 'add' ? 'Create Project' : 'Update Project'}
          </CButton>
        </CCol>
      </CRow>
    </CForm>
  );
};

export default ProjectForm;
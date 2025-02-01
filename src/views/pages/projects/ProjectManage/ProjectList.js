import React from 'react';
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CBadge,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CAvatar,
  CProgress
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilOptions, cilList, cilPencil, cilCalendar } from '@coreui/icons';

const ProjectList = ({ projects, getClientName, handleProjectClick, setSelectedProject, setShowModal, setModalType }) => {
  return (
    <div className="table-responsive">
      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHead color="light">
          <CTableRow className="bg-light">
            <CTableHeaderCell className="text-center" style={{width: '50px'}}>#</CTableHeaderCell>
            <CTableHeaderCell>Project Details</CTableHeaderCell>
            <CTableHeaderCell>Client</CTableHeaderCell>
            <CTableHeaderCell>Progress</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Status</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {projects.map((project, index) => (
            <CTableRow key={project.id} className="align-middle">
              <CTableDataCell className="text-center">
                {index + 1}
              </CTableDataCell>
              <CTableDataCell>
                <div className="d-flex flex-column">
                  <strong>{project.name}</strong>
                  <small className="text-muted">
                    <CIcon icon={cilCalendar} size="sm" className="me-1" />
                    {new Date(project.start_date).toLocaleDateString()}
                    {project.end_date && ` - ${new Date(project.end_date).toLocaleDateString()}`}
                  </small>
                </div>
              </CTableDataCell>
              <CTableDataCell>
                <div className="d-flex align-items-center">
                  <CAvatar size="md" src={project.client_photo || '/placeholder.svg'} className="me-2" />
                  <div>
                    <div>{getClientName(project.client_id)}</div>
                    <small className="text-muted">{project.client_email}</small>
                  </div>
                </div>
              </CTableDataCell>
              <CTableDataCell>
                <div className="d-flex align-items-center">
                  <div style={{flex: 1}}>
                    <CProgress thin color="success" value={75} className="mb-1" />
                    <small className="text-muted">75% Complete</small>
                  </div>
                </div>
                </CTableDataCell>
              <CTableDataCell className="text-center">
                <CBadge color={
                  project.status === 'Completed' ? 'success' :
                  project.status === 'In Progress' ? 'primary' :
                  'warning'
                } className="px-3 py-2">
                  {project.status}
                </CBadge>
              </CTableDataCell>
              <CTableDataCell className="text-center">
                <CDropdown alignment="end">
                  <CDropdownToggle color="transparent" caret={false} className="p-0">
                    <CIcon icon={cilOptions} />
                  </CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem onClick={() => handleProjectClick(project)}>
                      <CIcon icon={cilList} className="me-2" /> View Details
                    </CDropdownItem>
                    <CDropdownItem onClick={() => {setSelectedProject(project); setShowModal(true); setModalType('edit')}}>
                      <CIcon icon={cilPencil} className="me-2" /> Edit
                    </CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </div>
  );
};

export default ProjectList;
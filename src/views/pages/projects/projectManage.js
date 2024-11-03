import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CProgress,
  CBadge,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilOptions, cilPlus, cilPencil, cilTrash } from '@coreui/icons'

const ProjectManagement = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'Kitchen Remodeling',
      client: 'Juan Pérez',
      progress: 75,
      status: 'In Progress',
    },
    { id: 2, name: 'Main Bathroom', client: 'María García', progress: 30, status: 'In Progress' },
    {
      id: 3,
      name: 'Living Room Expansion',
      client: 'Carlos Rodríguez',
      progress: 100,
      status: 'Completed',
    },
    { id: 4, name: 'Terrace', client: 'Ana Martínez', progress: 0, status: 'Pending' },
  ])

  const getStatusBadge = (status) => {
    switch (status) {
      case 'In Progress':
        return <CBadge color="primary">{status}</CBadge>
      case 'Completed':
        return <CBadge color="success">{status}</CBadge>
      case 'Pending':
        return <CBadge color="warning">{status}</CBadge>
      default:
        return <CBadge color="secondary">{status}</CBadge>
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Project Management for Remodeling</strong>
            <CButton color="primary" className="float-end">
              <CIcon icon={cilPlus} /> New Project
            </CButton>
          </CCardHeader>
          <CCardBody>
            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell>Project Name</CTableHeaderCell>
                  <CTableHeaderCell>Client</CTableHeaderCell>
                  <CTableHeaderCell>Progress</CTableHeaderCell>
                  <CTableHeaderCell>Status</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {projects.map((project, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>
                      <div>{project.name}</div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>{project.client}</div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div className="clearfix">
                        <div className="float-start">
                          <strong>{project.progress}%</strong>
                        </div>
                      </div>
                      <CProgress thin color="info" value={project.progress} />
                    </CTableDataCell>
                    <CTableDataCell>{getStatusBadge(project.status)}</CTableDataCell>
                    <CTableDataCell>
                      <CDropdown alignment="end">
                        <CDropdownToggle color="transparent" caret={false} className="p-0">
                          <CIcon icon={cilOptions} />
                        </CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem href="#">
                            <CIcon icon={cilPencil} /> Edit
                          </CDropdownItem>
                          <CDropdownItem href="#">
                            <CIcon icon={cilTrash} /> Delete
                          </CDropdownItem>
                        </CDropdownMenu>
                      </CDropdown>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ProjectManagement
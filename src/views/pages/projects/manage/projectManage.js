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
    { id: 1, name: 'Remodelación Cocina', client: 'Juan Pérez', progress: 75, status: 'En progreso' },
    { id: 2, name: 'Baño Principal', client: 'María García', progress: 30, status: 'En progreso' },
    { id: 3, name: 'Ampliación Sala', client: 'Carlos Rodríguez', progress: 100, status: 'Completado' },
    { id: 4, name: 'Terraza', client: 'Ana Martínez', progress: 0, status: 'Pendiente' },
  ])

  const getStatusBadge = (status) => {
    switch (status) {
      case 'En progreso':
        return <CBadge color="primary">{status}</CBadge>
      case 'Completado':
        return <CBadge color="success">{status}</CBadge>
      case 'Pendiente':
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
            <strong>Gestión de Proyectos de Remodelación</strong>
            <CButton color="primary" className="float-end">
              <CIcon icon={cilPlus} /> Nuevo Proyecto
            </CButton>
          </CCardHeader>
          <CCardBody>
            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell>Nombre del Proyecto</CTableHeaderCell>
                  <CTableHeaderCell>Cliente</CTableHeaderCell>
                  <CTableHeaderCell>Progreso</CTableHeaderCell>
                  <CTableHeaderCell>Estado</CTableHeaderCell>
                  <CTableHeaderCell>Acciones</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {projects.map((project, index) => (
                  <CTableRow v-for="item in tableItems" key={index}>
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
                    <CTableDataCell>
                      {getStatusBadge(project.status)}
                    </CTableDataCell>
                    <CTableDataCell>
                      <CDropdown alignment="end">
                        <CDropdownToggle color="transparent" caret={false} className="p-0">
                          <CIcon icon={cilOptions} />
                        </CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem href="#">
                            <CIcon icon={cilPencil} /> Editar
                          </CDropdownItem>
                          <CDropdownItem href="#">
                            <CIcon icon={cilTrash} /> Eliminar
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
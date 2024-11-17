import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  CHeader,
  CContainer,
  CNavbar,
  CNavbarBrand,
  CNavbarNav,
  CNavItem,
  CNavLink,
  CButton,
  CImage,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilUser } from '@coreui/icons'

const HomeHeader = () => {
  return (
    <CHeader className="bg-light border-bottom">
      <CContainer fluid>
        <CNavbar expand="lg" colorScheme="light" className="px-3">
          <CNavbarBrand href="/" className="d-flex align-items-center">
            <CImage src="/logo.ico" width={40} height={40} className="me-2" alt="Logo" />
            <span className="fw-bold ">Empresa</span>
          </CNavbarBrand>
          <CNavbarNav className="d-none navlink-home d-lg-flex me-auto">
            <CNavItem>
              <CNavLink href="#" className="px-3 navlink-home  transition-colors">
                Inicio
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="#services" className="px-3 navlink-home  transition-colors">
                Servicios
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="#projects" className="px-3 navlink-home transition-colors">
                Proyectos
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="#contact" className="px-3 navlink-home transition-colors">
                Contacto
              </CNavLink>
            </CNavItem>
          </CNavbarNav>
          <NavLink to="/login" className="text-decoration-none">
            <CButton variant="outline" className="d-flex align-items-center btn-primary">
              <CIcon icon={cilUser} size="sm" className="me-2" />
              Iniciar Sesión
            </CButton>
          </NavLink>
        </CNavbar>
      </CContainer>
    </CHeader>
  )
}

export default HomeHeader
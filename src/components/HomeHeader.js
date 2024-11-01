import { NavLink } from 'react-router-dom'
import {
  CHeader,
  CNavbar,
  CContainer,
  CNavbarBrand,
  CNavbarNav,
  CNavItem,
  CNavLink,
  CButton,
  CCard,
  CCardBody,
  CCardTitle,
  CCardText,
  CForm,
  CFormInput,
  CFormTextarea,
  CRow,
  CCol,
  CHeaderNav,
  CImage,
  CLink,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cil4k } from '@coreui/icons'

const HomeHeader = () => {
  return (
    <CHeader className="homeheader">
      <CNavbar expand="lg"  className="container-fluid ">
        <CContainer>
          <CNavbarBrand href="/">Empresa</CNavbarBrand>
          <CLink href="/">
            <CImage src="logo.ico" width={50} height={50}></CImage>
          </CLink>
          <CNavbarNav className="d-none d-lg-flex">
            <CNavItem>
              <CNavLink className="navlink-home" href="#">Inicio</CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink className="navlink-home" href="#services">Servicios</CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink className="navlink-home" href="#projects">Proyectos</CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink className="navlink-home" href="#contact">Contacto</CNavLink>
            </CNavItem>
          </CNavbarNav>
        </CContainer>
      </CNavbar>
    </CHeader>
  )
}

export default HomeHeader

import React from 'react'
import {
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { cil4k, cilApple, cilHappy, cilPaintBucket, cilPencil } from '@coreui/icons'
import ContactForm from '../../forms/contact/contact-form'

const Homepage = () => {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <main className="flex-grow-1">
        <section id="" className="bg-light py-5">
          <CContainer className="text-center">
            <h1 className="display-4 fw-bold mb-3">Transformamos Espacios, Creamos Hogares</h1>
            <p className="lead mb-4">
              Expertos en remodelación para hacer realidad la casa de tus sueños
            </p>
            <CButton color="primary" size="lg">
              Solicita una Consulta Gratis
            </CButton>
          </CContainer>
        </section>
        <section id="services" className="py-5">
          <CContainer>
            <h2 className="text-center mb-5">Nuestros Servicios</h2>
            <CRow>
              <CCol md={4}>
                <CCard className="mb-4 h-100">
                  <CCardBody className="d-flex flex-column align-items-center">
                    <CIcon icon={cilHappy} size="3xl" className="mb-3 text-primary" />
                    <CCardTitle>Remodelación Completa</CCardTitle>
                    <CCardText className="text-center">
                      Transformamos completamente tu espacio con diseños innovadores y acabados de
                      alta calidad.
                    </CCardText>
                  </CCardBody>
                </CCard>
              </CCol>
              <CCol md={4}>
                <CCard className="mb-4 h-100">
                  <CCardBody className="d-flex flex-column align-items-center">
                    <CIcon icon={cilPaintBucket} size="3xl" className="mb-3 text-primary" />
                    <CCardTitle>Pintura y Acabados</CCardTitle>
                    <CCardText className="text-center">
                      Damos vida a tus paredes con colores vibrantes y acabados profesionales.
                    </CCardText>
                  </CCardBody>
                </CCard>
              </CCol>
              <CCol md={4}>
                <CCard className="mb-4 h-100">
                  <CCardBody className="d-flex flex-column align-items-center">
                    <CIcon icon={cilPencil} size="3xl" className="mb-3 text-primary" />
                    <CCardTitle>Diseño de Interiores</CCardTitle>
                    <CCardText className="text-center">
                      Creamos espacios funcionales y estéticamente atractivos que reflejan tu estilo
                      personal.
                    </CCardText>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          </CContainer>
        </section>

        <section id="projects" className="bg-light py-5">
          <CContainer>
            <h2 className="text-center mb-5">Proyectos Destacados</h2>
            <CRow>
              <CCol md={4}>
                <CCard className="mb-4">
                  <img
                    src="https://png.pngtree.com/background/20230611/original/pngtree-basement-design-design-for-basement-design-plans-picture-image_3171220.jpg"
                    className="card-img-top"
                    alt="Proyecto 1"
                  />
                  <CCardBody>
                    <CCardTitle>Proyecto 1</CCardTitle>
                    <CCardText>
                      Descripción breve del proyecto y los resultados obtenidos.
                    </CCardText>
                  </CCardBody>
                </CCard>
              </CCol>
              <CCol md={4}>
                <CCard className="mb-4">
                  <img
                    src="https://png.pngtree.com/thumb_back/fh260/background/20230613/pngtree-well-designed-basement-includes-a-bar-and-dining-room-image_2939585.jpg"
                    className="card-img-top"
                    alt="Proyecto 2"
                  />
                  <CCardBody>
                    <CCardTitle>Proyecto 2</CCardTitle>
                    <CCardText>
                      Descripción breve del proyecto y los resultados obtenidos.
                    </CCardText>
                  </CCardBody>
                </CCard>
              </CCol>
              <CCol md={4}>
                <CCard className="mb-4">
                  <img
                    src="https://png.pngtree.com/background/20230611/original/pngtree-photos-of-custom-basements-of-a-dinning-room-are-on-the-picture-image_3171741.jpg"
                    className="card-img-top"
                    alt="Proyecto 3"
                  />
                  <CCardBody>
                    <CCardTitle>Proyecto 3</CCardTitle>
                    <CCardText>
                      Descripción breve del proyecto y los resultados obtenidos.
                    </CCardText>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          </CContainer>
        </section>

        <section id="contacto" className="py-5">
         <ContactForm></ContactForm>
        </section>
      </main>
    </div>
  )
}
export default Homepage

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
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { cil4k, cilApple, cilHappy, cilPaintBucket, cilPencil } from '@coreui/icons'


const Homepage = () => {
    return (
        <div className="min-vh-100 d-flex flex-column">
        <main className="flex-grow-1">
          <section id="" className="bg-light py-5">
            <CContainer className="text-center">
              <h1 className="display-4 fw-bold mb-3">Transformamos Espacios, Creamos Hogares</h1>
              <p className="lead mb-4">Expertos en remodelación para hacer realidad la casa de tus sueños</p>
              <CButton color="primary" size="lg">Solicita una Consulta Gratis</CButton>
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
                        Transformamos completamente tu espacio con diseños innovadores y acabados de alta calidad.
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
                        Creamos espacios funcionales y estéticamente atractivos que reflejan tu estilo personal.
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
                {[1, 2, 3].map((i) => (
                  <CCol key={i} md={4}>
                    <CCard className="mb-4">
                      <img src={`https://picsum.photos/seed/project${i}/400/300`} className="card-img-top" alt={`Proyecto ${i}`} />
                      <CCardBody>
                        <CCardTitle>Proyecto {i}</CCardTitle>
                        <CCardText>Descripción breve del proyecto y los resultados obtenidos.</CCardText>
                      </CCardBody>
                    </CCard>
                  </CCol>
                ))}
              </CRow>
            </CContainer>
          </section>
  
          <section id="contacto" className="py-5">
            <CContainer>
              <h2 className="text-center mb-5">Contáctanos</h2>
              <CRow>
                <CCol lg={6} className="mx-auto">
                  <CForm>
                    <CFormInput
                      type="text"
                      id="nombre"
                      label="Nombre"
                      placeholder="Tu nombre"
                      text="Ingresa tu nombre completo"
                      className="mb-3"
                    />
                    <CFormInput
                      type="email"
                      id="email"
                      label="Correo Electrónico"
                      placeholder="tucorreo@ejemplo.com"
                      text="Nunca compartiremos tu correo con nadie más."
                      className="mb-3"
                    />
                    <CFormInput
                      type="tel"
                      id="telefono"
                      label="Teléfono"
                      placeholder="Tu número de teléfono"
                      className="mb-3"
                    />
                    <CFormTextarea
                      id="mensaje"
                      label="Mensaje"
                      rows={3}
                      text="Cuéntanos sobre tu proyecto de remodelación"
                      className="mb-3"
                    ></CFormTextarea>
                    <div className="d-grid">
                      <CButton color="primary" type="submit">Enviar Mensaje</CButton>
                    </div>
                  </CForm>
                </CCol>
              </CRow>
            </CContainer>
          </section>
        </main>
  
       
      </div>
    )
  
}
export default Homepage;
import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormSelect,
  CFormTextarea,
  CRow,
} from '@coreui/react'
import { helpHttp } from '../../../helpers/helpHTTP'


const api = helpHttp()
const baseUrl = 'http://localhost:5000'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    address: '',
    birthdate: '',
    gender: '',
    national_id: '',
    proposal_description: '',
    budget_type_id: '',
  })

  const [clients, setClients] = useState([])
  const [proposals, setProposals] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const clientsRes = await api.get(`${baseUrl}/clients`)
      const proposalsRes = await api.get(`${baseUrl}/client_proposals`)

      if (!clientsRes.err && !proposalsRes.err) {
        setClients(clientsRes)
        setProposals(proposalsRes)
      } else {
        console.error('Error fetching data')
      }
    }

    fetchData()
  }, [])

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const currentDate = new Date().toISOString().split('T')[0]

    const clientData = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      birthdate: formData.birthdate,
      gender: formData.gender,
      national_id: formData.national_id
    }

    const clientRes = await api.post(`${baseUrl}/clients`, { body: clientData })

    if (clientRes.err) {
      console.error('Error adding client:', clientRes.err)
      alert('Error al agregar cliente. Por favor, intente de nuevo.')
      return
    }

    const proposalData = {
      client_id: clientRes.id,
      proposal_description: formData.proposal_description,
      proposal_date: currentDate,
      budget_type_id: formData.budget_type_id,
      status: 'Pending',
      comments: []
    }

    const proposalRes = await api.post(`${baseUrl}/client_proposals`, { body: proposalData })

    if (proposalRes.err) {
      console.error('Error adding proposal:', proposalRes.err)
      alert('Error al agregar propuesta. Por favor, intente de nuevo.')
      return
    }

    setFormData({
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      address: '',
      birthdate: '',
      gender: '',
      national_id: '',
      proposal_description: '',
      budget_type_id: '',
    })

    alert('Formulario enviado con éxito!')

    // Refresh the data
    const updatedClientsRes = await api.get(`${baseUrl}/clients`)
    const updatedProposalsRes = await api.get(`${baseUrl}/client_proposals`)

    if (!updatedClientsRes.err && !updatedProposalsRes.err) {
      setClients(updatedClientsRes)
      setProposals(updatedProposalsRes)
    }
  }

  return (
    <section id="contacto" className="py-5">
      <CContainer>
        <h2 className="text-center mb-5">Contáctanos</h2>
        <CRow>
          <CCol lg={8} className="mx-auto">
            <CCard>
              <CCardBody>
                <CForm onSubmit={handleSubmit}>
                  <CRow>
                    <CCol md={6}>
                      <CFormInput
                        type="text"
                        id="firstname"
                        label="Nombre"
                        placeholder="Tu nombre"
                        value={formData.firstname}
                        onChange={handleInputChange}
                        required
                        className="mb-3"
                      />
                    </CCol>
                    <CCol md={6}>
                      <CFormInput
                        type="text"
                        id="lastname"
                        label="Apellido"
                        placeholder="Tu apellido"
                        value={formData.lastname}
                        onChange={handleInputChange}
                        required
                        className="mb-3"
                      />
                    </CCol>
                  </CRow>
                  <CFormInput
                    type="email"
                    id="email"
                    label="Correo Electrónico"
                    placeholder="tucorreo@ejemplo.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="mb-3"
                  />
                  <CFormInput
                    type="tel"
                    id="phone"
                    label="Teléfono"
                    placeholder="Tu número de teléfono"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="mb-3"
                  />
                  <CFormInput
                    type="text"
                    id="address"
                    label="Dirección"
                    placeholder="Tu dirección"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="mb-3"
                  />
                  <CRow>
                    <CCol md={6}>
                      <CFormInput
                        type="date"
                        id="birthdate"
                        label="Fecha de Nacimiento"
                        value={formData.birthdate}
                        onChange={handleInputChange}
                        required
                        className="mb-3"
                      />
                    </CCol>
                    <CCol md={6}>
                      <CFormSelect
                        id="gender"
                        label="Género"
                        value={formData.gender}
                        onChange={handleInputChange}
                        required
                        className="mb-3"
                      >
                        <option value="">Selecciona...</option>
                        <option value="Male">Masculino</option>
                        <option value="Female">Femenino</option>
                        <option value="Other">Otro</option>
                      </CFormSelect>
                    </CCol>
                  </CRow>
                  <CFormInput
                    type="text"
                    id="national_id"
                    label="Documento de Identidad"
                    placeholder="Tu número de documento"
                    value={formData.national_id}
                    onChange={handleInputChange}
                    required
                    className="mb-3"
                  />
                  <CFormTextarea
                    id="proposal_description"
                    label="Descripción del Proyecto"
                    rows={3}
                    placeholder="Cuéntanos sobre tu proyecto de remodelación"
                    value={formData.proposal_description}
                    onChange={handleInputChange}
                    required
                    className="mb-3"
                  />
                  <CFormSelect
                    id="budget_type_id"
                    label="Tipo de Presupuesto"
                    value={formData.budget_type_id}
                    onChange={handleInputChange}
                    required
                    className="mb-3"
                  >
                    <option value="">Selecciona...</option>
                    <option value="1">Bajo</option>
                    <option value="2">Medio</option>
                    <option value="3">Alto</option>
                  </CFormSelect>
                  <div className="d-grid">
                    <CButton color="primary" type="submit">
                      Enviar Propuesta
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </section>
  )
}

export default ContactForm
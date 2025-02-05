import React, { useState, useEffect } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormTextarea,
  CRow,
  CFormRange,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CAlert,
} from '@coreui/react';
import { helpHttp } from '../../../helpers/helpHTTP';
import { baseUrl } from '../../../config';
import { adminToken } from '../../../config';

const api = helpHttp();

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    address: '',
    birthdate: '',
    national_id: '',
    proposal_description: '',
    budget_min: 1000,
    budget_max: 2000,
    client_email: '',
  });

  const [clients, setClients] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [showNewClientModal, setShowNewClientModal] = useState(false);
  const [showExistingClientModal, setShowExistingClientModal] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const fetchData = async () => {
      const clientsRes = await api.get(`${baseUrl}/clients`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      const proposalsRes = await api.get(`${baseUrl}/proposals`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });

      if (!clientsRes.err && !proposalsRes.err) {
        setClients(clientsRes);
        setProposals(proposalsRes);
      } else {
        console.error('Error fetching data');
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleRangeChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: Number(value)
    }));
  };

  const handleSubmitNewClient = async (e) => {
    e.preventDefault();
    
    const currentDate = new Date().toISOString().split('T')[0];
  
    const existingClient = clients.find(client => client.email === formData.email);
    if (existingClient) {
      setMessage({ type: 'danger', text: 'El correo electrónico ya está registrado. Por favor, use otro correo electrónico.' });
      return;
    }
  
    const clientData = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      birthdate: formData.birthdate,
      national_id: formData.national_id
    };
  
    const clientRes = await api.post(`${baseUrl}/clients`, {
      body: clientData,
      headers: { Authorization: `Bearer ${adminToken}` },
    });
  
  
    if (clientRes.err) {
      console.error('Error adding client:', clientRes.err);
      setMessage({ type: 'danger', text: 'Error al agregar cliente. Por favor, intente de nuevo.' });
      return;
    }
    
  
    const proposalData = {
      client_id: clientRes.client.id,
      proposal_description: formData.proposal_description,
      proposal_date: currentDate,
      budget_min: formData.budget_min,
      budget_max: formData.budget_max,
      status: 'Pending'
    };
  
    
    if ( !proposalData.proposal_description || proposalData.budget_min === undefined || proposalData.budget_max === undefined) {
      setMessage({ type: 'danger', text: 'Todos los campos son obligatorios. Por favor, complete todos los campos.' });
      return;
    }
  
    const proposalRes = await api.post(`${baseUrl}/proposals`, {
      body: proposalData,
      headers: { Authorization: `Bearer ${adminToken}` },
    });
  
    if (proposalRes.err) {
      console.error('Error adding proposal:', proposalRes.err);
      setMessage({ type: 'danger', text: 'Error al agregar propuesta. Por favor, intente de nuevo.' });
      return;
    }
  
    setFormData({
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      address: '',
      birthdate: '',
      national_id: '',
      proposal_description: '',
      budget_min: 1000,
      budget_max: 2000,
      client_email: '',
    });
  
    setMessage({ type: 'success', text: 'Formulario enviado con éxito!' });
    setShowNewClientModal(false);
  
    const updatedClientsRes = await api.get(`${baseUrl}/clients`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    const updatedProposalsRes = await api.get(`${baseUrl}/proposals`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
  
    if (!updatedClientsRes.err && !updatedProposalsRes.err) {
      setClients(updatedClientsRes);
      setProposals(updatedProposalsRes);
    }
  };

  const handleSubmitExistingClient = async (e) => {
    e.preventDefault();
    
    const currentDate = new Date().toISOString().split('T')[0];

    const client = clients.find(client => client.email === formData.client_email);

    if (!client) {
      setMessage({ type: 'danger', text: 'Cliente no encontrado. Por favor, verifique el correo electrónico.' });
      return;
    }

    const proposalData = {
      client_id: client.id,
      proposal_description: formData.proposal_description,
      proposal_date: currentDate,
      budget_min: formData.budget_min,
      budget_max: formData.budget_max,
      status: 'Pending'
    };

    const proposalRes = await api.post(`${baseUrl}/proposals`, {
      body: proposalData,
      headers: { Authorization: `Bearer ${adminToken}` },
    });

    if (proposalRes.err) {
      console.error('Error adding proposal:', proposalRes.err);
      setMessage({ type: 'danger', text: 'Error al agregar propuesta. Por favor, intente de nuevo.' });
      return;
    }

    setFormData({
      client_email: '',
      proposal_description: '',
      budget_min: 1000,
      budget_max: 2000,
    });

    setMessage({ type: 'success', text: 'Formulario enviado con éxito!' });
    setShowExistingClientModal(false);

    const updatedClientsRes = await api.get(`${baseUrl}/clients`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    const updatedProposalsRes = await api.get(`${baseUrl}/proposals`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });

    if (!updatedClientsRes.err && !updatedProposalsRes.err) {
      setClients(updatedClientsRes);
      setProposals(updatedProposalsRes);
    }
  };

  return (
    <section id="contacto" className="py-5">
      <CContainer>
        <h2 className="text-center mb-5">Contáctanos</h2>
        <CRow className="mb-4">
          <CCol className="text-center">
            <CButton color="primary" onClick={() => setShowNewClientModal(true)}>
              Nuevo Cliente
            </CButton>
            <CButton color="secondary" onClick={() => setShowExistingClientModal(true)} className="ms-3">
              Cliente Existente
            </CButton>
          </CCol>
        </CRow>
        <CModal visible={showNewClientModal} onClose={() => setShowNewClientModal(false)}>
          <CModalHeader onClose={() => setShowNewClientModal(false)}>
            <CModalTitle>Nuevo Cliente</CModalTitle>
          </CModalHeader>
          <CModalBody>
            {message.text && <CAlert color={message.type}>{message.text}</CAlert>}
            <CForm onSubmit={handleSubmitNewClient}>
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
              <CRow>
                <CCol md={6}>
                  <CFormRange
                    id="budget_min"
                    label="Presupuesto Mínimo"
                    min="0"
                    max="100000"
                    step="100"
                    value={formData.budget_min}
                    onChange={handleRangeChange}
                    required
                    className="mb-3"
                  />
                  <div>Presupuesto Mínimo: ${formData.budget_min}</div>
                </CCol>
                <CCol md={6}>
                  <CFormRange
                    id="budget_max"
                    label="Presupuesto Máximo"
                    min="0"
                    max="100000"
                    step="100"
                    value={formData.budget_max}
                    onChange={handleRangeChange}
                    required
                    className="mb-3"
                  />
                  <div>Presupuesto Máximo: ${formData.budget_max}</div>
                </CCol>
              </CRow>
              <div className="d-grid">
                <CButton color="primary" type="submit">
                  Enviar Propuesta
                </CButton>
              </div>
            </CForm>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setShowNewClientModal(false)}>
              Cerrar
            </CButton>
          </CModalFooter>
        </CModal>
        <CModal visible={showExistingClientModal} onClose={() => setShowExistingClientModal(false)}>
          <CModalHeader onClose={() => setShowExistingClientModal(false)}>
            <CModalTitle>Cliente Existente</CModalTitle>
          </CModalHeader>
          <CModalBody>
            {message.text && <CAlert color={message.type}>{message.text}</CAlert>}
            <CForm onSubmit={handleSubmitExistingClient}>
              <CFormInput
                type="email"
                id="client_email"
                label="Correo Electrónico del Cliente"
                placeholder="Ingresa el correo electrónico del cliente"
                value={formData.client_email}
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
              <CRow>
                <CCol md={6}>
                  <CFormRange
                    id="budget_min"
                    label="Presupuesto Mínimo"
                    min="0"
                    max="100000"
                    step="100"
                    value={formData.budget_min}
                    onChange={handleRangeChange}
                    required
                    className="mb-3"
                  />
                  <div>Presupuesto Mínimo: ${formData.budget_min}</div>
                </CCol>
                <CCol md={6}>
                  <CFormRange
                    id="budget_max"
                    label="Presupuesto Máximo"
                    min="0"
                    max="100000"
                    step="100"
                    value={formData.budget_max}
                    onChange={handleRangeChange}
                    required
                    className="mb-3"
                  />
                  <div>Presupuesto Máximo: ${formData.budget_max}</div>
                </CCol>
              </CRow>
              <div className="d-grid">
                <CButton color="primary" type="submit">
                  Enviar Propuesta
                </CButton>
              </div>
            </CForm>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setShowExistingClientModal(false)}>
              Cerrar
            </CButton>
          </CModalFooter>
        </CModal>
      </CContainer>
    </section>
  );
};

export default ContactForm;
import React, { useEffect, useState } from 'react';
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
  CInputGroup,
  CInputGroupText,
  CFormInput,
  CFormSelect,
  CBadge,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormTextarea,
  CFormCheck,
  CForm,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilSearch, cilPlus, cilPhone, cilEnvelopeClosed, cilPeople, cilNotes } from '@coreui/icons';
import { helpHttp } from '../../../helpers/helpHTTP';
import { baseUrl } from '../../../config';

const ClientInteractions = () => {
  const [interactions, setInteractions] = useState([]);
  const [clients, setClients] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [formData, setFormData] = useState({
    client_id: '',
    employee_id: '',
    type: 'Call',
    interaction_date: '',
    notes: '',
    follow_up: false,
  });

  const api = helpHttp();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const interactionsRes = await api.get(`${baseUrl}/notifications/interactions`);
    const clientsRes = await api.get(`${baseUrl}/clients`);
    const employeesRes = await api.get(`${baseUrl}/employees`);
    if (!interactionsRes.err && !clientsRes.err && !employeesRes.err) {
      setInteractions(interactionsRes);
      setClients(clientsRes);
      setEmployees(employeesRes);
    } else {
      console.error('Error fetching data');
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`${baseUrl}/notifications/interactions`, { body: formData });
      setShowModal(false);
      resetForm();
      fetchData();
    } catch (error) {
      console.error('Error saving interaction:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      client_id: '',
      employee_id: '',
      type: 'Call',
      interaction_date: '',
      notes: '',
      follow_up: false,
    });
  };

  const getClientName = (clientId) => {
    const client = clients.find(c => c.id === clientId);
    return client ? `${client.firstname} ${client.lastname}` : 'Unknown Client';
  };

  const getEmployeeName = (employeeId) => {
    const employee = employees.find(e => e.id === employeeId);
    return employee ? `${employee.firstname} ${employee.lastname}` : 'Unknown Employee';
  };

  const filteredInteractions = interactions.filter(interaction => 
    (getClientName(interaction.client_id).toLowerCase().includes(searchTerm.toLowerCase()) ||
     getEmployeeName(interaction.employee_id).toLowerCase().includes(searchTerm.toLowerCase()) ||
     interaction.notes.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (typeFilter === 'All' || interaction.type === typeFilter)
  );

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4 shadow-sm">
          <CCardHeader className="bg-transparent border-bottom-0">
            <h2 className="mb-0">Client Interactions</h2>
          </CCardHeader>
          <CCardBody>
            <CRow className="mb-4 align-items-end">
              <CCol md={3}>
                <CInputGroup>
                  <CInputGroupText className="bg-light">
                    <CIcon icon={cilSearch} />
                  </CInputGroupText>
                  <CFormInput
                    placeholder="Search interactions..."
                    className="border-start-0"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </CInputGroup>
              </CCol>
              <CCol md={2}>
                <CFormSelect
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <option value="All">All Types</option>
                  <option value="Call">Call</option>
                  <option value="Email">Email</option>
                  <option value="Meeting">Meeting</option>
                </CFormSelect>
              </CCol>
              <CCol md={3} className="text-end">
                <CButton color="primary" onClick={() => {resetForm(); setShowModal(true);}}>
                  <CIcon icon={cilPlus} className="me-2" />
                  New Interaction
                </CButton>
              </CCol>
            </CRow>
            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead>
                <CTableRow className="bg-light">
                  <CTableHeaderCell>Client</CTableHeaderCell>
                  <CTableHeaderCell>Employee</CTableHeaderCell>
                  <CTableHeaderCell>Type</CTableHeaderCell>
                  <CTableHeaderCell>Date</CTableHeaderCell>
                  <CTableHeaderCell>Notes</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Follow-up</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {filteredInteractions.map((interaction) => (
                  <CTableRow key={interaction.id}>
                    <CTableDataCell>{getClientName(interaction.client_id)}</CTableDataCell>
                    <CTableDataCell>{getEmployeeName(interaction.employee_id)}</CTableDataCell>
                    <CTableDataCell>
                      <CIcon icon={interaction.type === 'Call' ? cilPhone : interaction.type === 'Email' ? cilEnvelopeClosed : cilPeople} className="me-2" />
                      {interaction.type}
                    </CTableDataCell>
                    <CTableDataCell>{interaction.interaction_date}</CTableDataCell>
                    <CTableDataCell>{interaction.notes}</CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CBadge color={interaction.follow_up ? "warning" : "success"} shape="rounded-pill">
                        {interaction.follow_up ? "Follow-up" : "No Follow-up"}
                      </CBadge>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>

      <CModal visible={showModal} onClose={() => {setShowModal(false); resetForm();}}>
        <CModalHeader closeButton>
          <CModalTitle>New Interaction</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleSubmit}>
            <div className="mb-3">
              <CFormSelect
                label="Client"
                name="client_id"
                value={formData.client_id}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a client</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {`${client.firstname} ${client.lastname}`}
                  </option>
                ))}
              </CFormSelect>
            </div>
            <div className="mb-3">
              <CFormSelect
                label="Employee"
                name="employee_id"
                value={formData.employee_id}
                onChange={handleInputChange}
                required
              >
                <option value="">Select an employee</option>
                {employees.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {`${employee.firstname} ${employee.lastname}`}
                  </option>
                ))}
              </CFormSelect>
            </div>
            <div className="mb-3">
              <CFormSelect
                label="Type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
              >
                <option value="Call">Call</option>
                <option value="Email">Email</option>
                <option value="Meeting">Meeting</option>
              </CFormSelect>
            </div>
            <div className="mb-3">
              <CFormInput
                type="date"
                label="Date"
                name="interaction_date"
                value={formData.interaction_date}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <CFormTextarea
                label="Notes"
                name="notes"
                rows={3}
                value={formData.notes}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <CFormCheck
                label="Requires Follow-up"
                name="follow_up"
                checked={formData.follow_up}
                onChange={handleInputChange}
              />
            </div>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => {setShowModal(false); resetForm();}}>
            Cancel
          </CButton>
          <CButton color="primary" onClick={handleSubmit}>
            Save
          </CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  );
};

export default ClientInteractions;

import React, { useState, useEffect } from 'react'
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
  CBadge,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSearch, cilCheckCircle, cilXCircle, cilCommentSquare } from '@coreui/icons'
import { helpHttp } from '../../../helpers/helpHTTP'

const ReceivedProposals = () => {
  const [proposals, setProposals] = useState([])
  const [clients, setClients] = useState([])
  const [budgetTypes, setBudgetTypes] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProposal, setSelectedProposal] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const api = helpHttp()
  const baseUrl = 'http://localhost:5000'

  const getClientName = (clientId) => {
    const client = clients.find(c => c.id === clientId.toString())
    return client ? `${client.firstname} ${client.lastname}` : 'Unknown Client'
  }

  const getBudgetTypeName = (budgetTypeId) => {
    const budgetType = budgetTypes.find(bt => bt.id === budgetTypeId.toString())
    return budgetType ? budgetType.type_name : 'Unknown Budget Type'
  }

  useEffect(() => {
    const fetchData = async () => {
      const proposalsRes = await api.get(`${baseUrl}/client_proposals`)
      const clientsRes = await api.get(`${baseUrl}/clients`)
      const budgetTypesRes = await api.get(`${baseUrl}/budget_types`)

      if (!proposalsRes.err && !clientsRes.err && !budgetTypesRes.err) {
        setProposals(proposalsRes.filter(proposal => proposal.status === 'Pending'))
        setClients(clientsRes)
        setBudgetTypes(budgetTypesRes)
      } else {
        console.error('Error fetching data')
      }
    }

    fetchData()
  }, [])

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  const filteredProposals = proposals.filter(proposal =>
    getClientName(proposal.client_id).toLowerCase().includes(searchTerm.toLowerCase()) ||
    proposal.proposal_description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleViewProposal = (proposal) => {
    setSelectedProposal(proposal)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedProposal(null)
  }

  const handleApproveProposal = async () => {
    if (selectedProposal) {
      const updatedProposal = { ...selectedProposal, status: 'Accepted' }
      const res = await api.put(`${baseUrl}/client_proposals/${selectedProposal.id}`, { body: updatedProposal })
      if (!res.err) {
        setProposals(proposals.filter(p => p.id !== selectedProposal.id))
        handleCloseModal()
      } else {
        console.error('Error updating proposal. Please try again.')
      }
    }
  }

  const handleRejectProposal = async () => {
    if (selectedProposal) {
      const updatedProposal = { ...selectedProposal, status: 'Rejected' }
      const res = await api.put(`${baseUrl}/client_proposals/${selectedProposal.id}`, { body: updatedProposal })
      if (!res.err) {
        setProposals(proposals.filter(p => p.id !== selectedProposal.id))
        handleCloseModal()
      } else {
        console.error('Error updating proposal. Please try again.')
      }
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4 shadow-sm">
          <CCardHeader className="bg-transparent border-bottom-0">
            <h2 className="mb-0">Pending Proposals</h2>
          </CCardHeader>
          <CCardBody>
            <CRow className="mb-4">
              <CCol md={6}>
                <CInputGroup>
                  <CInputGroupText className="bg-light">
                    <CIcon icon={cilSearch} />
                  </CInputGroupText>
                  <CFormInput
                    placeholder="Search proposals..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="border-start-0"
                  />
                </CInputGroup>
              </CCol>
            </CRow>
            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead>
                <CTableRow className="bg-light">
                  <CTableHeaderCell>Client</CTableHeaderCell>
                  <CTableHeaderCell>Description</CTableHeaderCell>
                  <CTableHeaderCell>Date</CTableHeaderCell>
                  <CTableHeaderCell>Budget Type</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {filteredProposals.map((proposal) => (
                  <CTableRow key={proposal.id}>
                    <CTableDataCell>{getClientName(proposal.client_id)}</CTableDataCell>
                    <CTableDataCell>{proposal.proposal_description}</CTableDataCell>
                    <CTableDataCell>{proposal.proposal_date}</CTableDataCell>
                    <CTableDataCell>{getBudgetTypeName(proposal.budget_type_id)}</CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CButton 
                        color="info" 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewProposal(proposal)}
                      >
                        <CIcon icon={cilCommentSquare} /> View
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>

      <CModal visible={showModal} onClose={handleCloseModal}>
        <CModalHeader closeButton>
          <CModalTitle>Proposal Details</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {selectedProposal && (
            <>
              <p><strong>Client:</strong> {getClientName(selectedProposal.client_id)}</p>
              <p><strong>Description:</strong> {selectedProposal.proposal_description}</p>
              <p><strong>Date:</strong> {selectedProposal.proposal_date}</p>
              <p><strong>Budget Type:</strong> {getBudgetTypeName(selectedProposal.budget_type_id)}</p>
            </>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={handleCloseModal}>
            Close
          </CButton>
          <CButton color="success" onClick={handleApproveProposal}>
            <CIcon icon={cilCheckCircle} /> Approve
          </CButton>
          <CButton color="danger" onClick={handleRejectProposal}>
            <CIcon icon={cilXCircle} /> Reject
          </CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  )
}

export default ReceivedProposals
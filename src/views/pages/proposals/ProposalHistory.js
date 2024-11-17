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
  CForm,
  CFormTextarea,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSearch, cilCommentSquare, cilClock, cilTrash } from '@coreui/icons'
import { helpHttp } from '../../../helpers/helpHTTP'

const ProposalHistory = () => {
  const [proposals, setProposals] = useState([])
  const [clients, setClients] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProposal, setSelectedProposal] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [newComment, setNewComment] = useState('')

  const api = helpHttp()
  const baseUrl = 'http://localhost:5000'

  useEffect(() => {
    fetchProposals()
    fetchClients()
  }, [])

  const fetchProposals = async () => {
    const response = await api.get(`${baseUrl}/client_proposals`)
    if (!response.err) {
      const filteredProposals = response.filter(proposal => 
        proposal.status === 'Accepted' || proposal.status === 'Rejected'
      )
      setProposals(filteredProposals)
    } else {
      console.error('Error fetching proposals:', response.err)
    }
  }

  const fetchClients = async () => {
    const response = await api.get(`${baseUrl}/clients`)
    if (!response.err) {
      setClients(response)
    } else {
      console.error('Error fetching clients:', response.err)
    }
  }

  const getClientName = (clientId) => {
    const client = clients.find(c => c.id === clientId)
    return client ? `${client.firstname} ${client.lastname}` : 'Unknown Client'
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Accepted':
        return <CBadge color="success" shape="rounded-pill">{status}</CBadge>
      case 'Rejected':
        return <CBadge color="danger" shape="rounded-pill">{status}</CBadge>
      default:
        return <CBadge color="secondary" shape="rounded-pill">{status}</CBadge>
    }
  }

  const filteredProposals = proposals.filter(proposal =>
    proposal.proposal_description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getClientName(proposal.client_id).toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleViewDetails = (proposal) => {
    setSelectedProposal(proposal)
    setShowModal(true)
  }

  const handleAddComment = async (e) => {
    e.preventDefault()
    if (newComment.trim() !== '' && selectedProposal) {
      const updatedProposal = {
        ...selectedProposal,
        comments: [...(selectedProposal.comments || []), newComment.trim()]
      }
      const response = await api.put(`${baseUrl}/client_proposals/${selectedProposal.id}`, { body: updatedProposal })
      if (!response.err) {
        setProposals(proposals.map(p =>
          p.id === selectedProposal.id ? updatedProposal : p
        ))
        setSelectedProposal(updatedProposal)
        setNewComment('')
      } else {
        console.error('Error adding comment:', response.err)
      }
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this proposal?')) {
      const response = await api.del(`${baseUrl}/client_proposals/${id}`)
      if (!response.err) {
        setProposals(proposals.filter(p => p.id !== id))
      } else {
        console.error('Error deleting proposal:', response.err)
      }
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4 shadow-sm">
          <CCardHeader className="bg-transparent border-bottom-0">
            <h2 className="mb-0">Proposal History</h2>
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
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border-start-0"
                  />
                </CInputGroup>
              </CCol>
            </CRow>
            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead>
                <CTableRow className="bg-light">
                  <CTableHeaderCell>Client Name</CTableHeaderCell>
                  <CTableHeaderCell>Project Description</CTableHeaderCell>
                  <CTableHeaderCell>Date</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Status</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {filteredProposals.map((proposal) => (
                  <CTableRow key={proposal.id}>
                    <CTableDataCell>{getClientName(proposal.client_id)}</CTableDataCell>
                    <CTableDataCell>{proposal.proposal_description}</CTableDataCell>
                    <CTableDataCell>{proposal.proposal_date}</CTableDataCell>
                    <CTableDataCell className="text-center">
                      {getStatusBadge(proposal.status)}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CButton 
                        color="info" 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewDetails(proposal)}
                        className="me-2"
                      >
                        <CIcon icon={cilCommentSquare} /> View History
                      </CButton>
                      <CButton 
                        color="danger" 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDelete(proposal.id)}
                      >
                        <CIcon icon={cilTrash} /> Delete
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>

      <CModal visible={showModal} onClose={() => setShowModal(false)} size="lg">
        <CModalHeader closeButton>
          <CModalTitle>Proposal History</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {selectedProposal && (
            <>
              <h4>{selectedProposal.proposal_description}</h4>
              <p><strong>Client:</strong> {getClientName(selectedProposal.client_id)}</p>
              <p><strong>Date:</strong> {selectedProposal.proposal_date}</p>
              <p><strong>Status:</strong> {getStatusBadge(selectedProposal.status)}</p>
              <h5 className="mt-4">Comments:</h5>
              {selectedProposal.comments && selectedProposal.comments.map((comment, index) => (
                <div key={index} className="mb-2 p-2 bg-light rounded">
                  <CIcon icon={cilClock} className="me-2" />
                  {comment}
                </div>
              ))}
              <CForm onSubmit={handleAddComment} className="mt-4">
                <CFormTextarea
                  id="newComment"
                  label="Add a comment"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={3}
                ></CFormTextarea>
                <CButton type="submit" color="primary" className="mt-3">
                  Add Comment
                </CButton>
              </CForm>
            </>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowModal(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  )
}

export default ProposalHistory
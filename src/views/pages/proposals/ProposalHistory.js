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
import { cilSearch, cilCommentSquare, cilClock } from '@coreui/icons'

const ProposalHistory = () => {
  const [proposals, setProposals] = useState([
    { id: 1, client: 'John Doe', project: 'Kitchen Remodeling', date: '2023-05-15', status: 'Approved', comments: ['Great project!', 'Completed on time.'] },
    { id: 2, client: 'Jane Smith', project: 'Master Bathroom', date: '2023-05-16', status: 'Rejected', comments: ['Budget too high', 'Client went with another contractor.'] },
    { id: 3, client: 'Robert Johnson', project: 'Living Room Extension', date: '2023-05-17', status: 'Completed', comments: ['Excellent work', 'Client very satisfied.'] },
    { id: 4, client: 'Emily Brown', project: 'Terrace', date: '2023-05-18', status: 'In Progress', comments: ['Started on time', 'Minor delays due to weather.'] },
    { id: 5, client: 'Michael Wilson', project: 'Master Bedroom', date: '2023-05-19', status: 'Approved', comments: ['Awaiting materials', 'Start date confirmed.'] },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProposal, setSelectedProposal] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [newComment, setNewComment] = useState('')

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved':
        return <CBadge color="success" shape="rounded-pill">{status}</CBadge>
      case 'Rejected':
        return <CBadge color="danger" shape="rounded-pill">{status}</CBadge>
      case 'Completed':
        return <CBadge color="info" shape="rounded-pill">{status}</CBadge>
      case 'In Progress':
        return <CBadge color="warning" shape="rounded-pill">{status}</CBadge>
      default:
        return <CBadge color="secondary" shape="rounded-pill">{status}</CBadge>
    }
  }

  const filteredProposals = proposals.filter(proposal =>
    proposal.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    proposal.project.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleViewDetails = (proposal) => {
    setSelectedProposal(proposal)
    setShowModal(true)
  }

  const handleAddComment = (e) => {
    e.preventDefault()
    if (newComment.trim() !== '') {
      const updatedProposals = proposals.map(p =>
        p.id === selectedProposal.id
          ? { ...p, comments: [...p.comments, newComment.trim()] }
          : p
      )
      setProposals(updatedProposals)
      setSelectedProposal({ ...selectedProposal, comments: [...selectedProposal.comments, newComment.trim()] })
      setNewComment('')
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
                  <CTableHeaderCell>Client</CTableHeaderCell>
                  <CTableHeaderCell>Project</CTableHeaderCell>
                  <CTableHeaderCell>Date</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Status</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {filteredProposals.map((proposal) => (
                  <CTableRow key={proposal.id}>
                    <CTableDataCell>{proposal.client}</CTableDataCell>
                    <CTableDataCell>{proposal.project}</CTableDataCell>
                    <CTableDataCell>{proposal.date}</CTableDataCell>
                    <CTableDataCell className="text-center">
                      {getStatusBadge(proposal.status)}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CButton 
                        color="info" 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewDetails(proposal)}
                      >
                        <CIcon icon={cilCommentSquare} /> View History
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
              <h4>{selectedProposal.project}</h4>
              <p><strong>Client:</strong> {selectedProposal.client}</p>
              <p><strong>Date:</strong> {selectedProposal.date}</p>
              <p><strong>Status:</strong> {getStatusBadge(selectedProposal.status)}</p>
              <h5 className="mt-4">Comments:</h5>
              {selectedProposal.comments.map((comment, index) => (
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
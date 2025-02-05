import React, { useState, useEffect } from 'react'
import { CForm, CListGroup, CListGroupItem, CRow, CCol, CButton, CFormInput } from '@coreui/react'
import { helpHttp } from '../../../../helpers/helpHTTP'
import { baseUrl } from '../../../../config'

const api = helpHttp()

const ProjectForm = ({ newProject, setNewProject, handleCreateProject, updateProjectList}) => {
  const [pendingProposals, setPendingProposals] = useState([])
  const [selectedProposal, setSelectedProposal] = useState(null)
  const [projectName, setProjectName] = useState('')

  useEffect(() => {
    fetchPendingProposals()
  }, [])

  const fetchPendingProposals = async () => {
    try {
      const response = await api.get(`${baseUrl}/proposals/pending`)
      if (!response.err) {
        setPendingProposals(response)
      } else {
        throw new Error(response.err)
      }
    } catch (err) {
      console.error('Error fetching pending proposals:', err)
    }
  }

  const handleSelectProposal = (proposal) => {
    setSelectedProposal(proposal)
  }

  const handleAddProject = async () => {
    if (selectedProposal && projectName.trim() !== '') {
      try {
        const response = await api.post(`${baseUrl}/projects`, {
          body: {
            name: projectName,
            description: selectedProposal.proposal_description,
            start_date: selectedProposal.proposal_date,
            end_date: new Date().toISOString(),
            proposal_id: selectedProposal.id,
          },
          headers: { 'Content-Type': 'application/json' },
        })
        if (!response.err) {
          handleCreateProject(response)
          setSelectedProposal(null)
          setProjectName('')
          fetchPendingProposals()
          updateProjectList() 
        } else {
          throw new Error(response.err)
        }
      } catch (err) {
        console.error('Error creating project:', err)
      }
    }
  }

  return (
    <CForm onSubmit={(e) => e.preventDefault()}>
      <CRow className="mt-4">
        <CCol>
          <h5>Pending Proposals</h5>
          <CListGroup>
            {pendingProposals.map((proposal) => (
              <CListGroupItem
                key={proposal.id}
                active={selectedProposal?.id === proposal.id}
                onClick={() => handleSelectProposal(proposal)}
                style={{ cursor: 'pointer' }}
              >
                <div>
                  <strong>Client:</strong> {proposal.client_name}
                </div>
                <div>
                  <strong>Description:</strong> {proposal.proposal_description}
                </div>
                <div>
                  <strong>Date:</strong> {new Date(proposal.proposal_date).toLocaleDateString()}
                </div>
                <div>
                  <strong>Budget:</strong> ${proposal.budget_min} -{proposal.budget_max}
                </div>
                <div>
                  <strong>Status:</strong> {proposal.status}
                </div>
              </CListGroupItem>
            ))}
          </CListGroup>
        </CCol>
      </CRow>
      {selectedProposal && (
        <>
          <CRow className="mt-4">
            <CCol>
              <CFormInput
                type="text"
                id="projectName"
                label="Project Name"
                placeholder="Enter project name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                required
              />
            </CCol>
          </CRow>
          <CRow className="mt-4">
            <CCol>
              <CButton color="primary" onClick={handleAddProject}>
                Add Project
              </CButton>
            </CCol>
          </CRow>
        </>
      )}
    </CForm>
  )
}

export default ProjectForm
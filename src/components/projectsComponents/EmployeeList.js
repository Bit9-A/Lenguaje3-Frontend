import React, { useState } from 'react';
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CListGroup,
  CListGroupItem,
} from '@coreui/react';
import { helpHttp } from '../../helpers/helpHTTP';
import { baseUrl } from '../../config';

const api = helpHttp();

const EmployeeList = ({ projectId, availableEmployees, show, onClose, onAddEmployee }) => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleSelectEmployee = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleAddEmployee = async () => {
    if (selectedEmployee) {
      try {
        const response = await api.post(`${baseUrl}/projects/add-employee`, {
          body: { project_id: projectId, employee_id: selectedEmployee.id },
        });
        if (!response.err) {
          onAddEmployee(selectedEmployee);
          setSelectedEmployee(null);
        } else {
          throw new Error(response.err);
        }
      } catch (err) {
        console.error('Error adding employee to project:', err);
      }
    }
  };

  return (
    <CModal visible={show} onClose={onClose}>
      <CModalHeader onClose={onClose}>
        <CModalTitle>Select Employee</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CListGroup>
          {availableEmployees.map((employee) => (
            <CListGroupItem
              key={employee.id}
              active={selectedEmployee?.id === employee.id}
              onClick={() => handleSelectEmployee(employee)}
              style={{ cursor: 'pointer' }}
            >
              {employee.firstname} {employee.lastname}
            </CListGroupItem>
          ))}
        </CListGroup>
      </CModalBody>
      <CModalFooter>
        <CButton color="primary" onClick={handleAddEmployee} disabled={!selectedEmployee}>
          Add
        </CButton>
        <CButton color="secondary" onClick={onClose}>
          Close
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default EmployeeList;
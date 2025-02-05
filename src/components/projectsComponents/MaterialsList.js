import React, { useState, useEffect } from 'react';
import {
  CCard,
  CCardBody,
  CButton,
  CFormInput,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CListGroup,
  CListGroupItem,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilCart, cilPlus, cilTrash } from '@coreui/icons';
import { helpHttp } from '../../helpers/helpHTTP';
import { baseUrl } from '../../config';

const api = helpHttp();

const Materials = ({ projectId }) => {
  const [materials, setMaterials] = useState([]);
  const [editingMaterial, setEditingMaterial] = useState(null);
  const [materialQuantity, setMaterialQuantity] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [availableMaterials, setAvailableMaterials] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    fetchProjectMaterials();
    fetchAvailableMaterials();
    fetchTotalMaterialCost();
  }, []);

  const fetchProjectMaterials = async () => {
    try {
      const response = await api.get(`${baseUrl}/projects/materials/${projectId}`);
      if (!response.err) {
        setMaterials(response);
      } else {
        throw new Error(response.err);
      }
    } catch (err) {
      console.error('Error fetching project materials:', err);
    }
  };

  const fetchAvailableMaterials = async () => {
    try {
      const response = await api.get(`${baseUrl}/materials`);
      if (!response.err) {
        setAvailableMaterials(response);
      } else {
        throw new Error(response.err);
      }
    } catch (err) {
      console.error('Error fetching available materials:', err);
    }
  };

  const fetchTotalMaterialCost = async () => {
    try {
      const response = await api.get(`${baseUrl}/projects/total-material-cost/${projectId}`);
      if (!response.err) {
        setTotalCost(response.total_material_cost);
      } else {
        throw new Error(response.err);
      }
    } catch (err) {
      console.error('Error fetching total material cost:', err);
    }
  };

  const handleSelectMaterial = (material) => {
    setSelectedMaterial(material);
  };

  const handleAddNewMaterial = async () => {
    if (selectedMaterial && quantity > 0) {
      try {
        const response = await api.post(`${baseUrl}/projects/add-material`, {
          body: { project_id: projectId, material_id: selectedMaterial.id, quantity, is_paid: 'false'},
          headers: { 'Content-Type': 'application/json' },
        });
        if (!response.err) {
          setMaterials([...materials, { ...selectedMaterial, quantity }]);
          fetchTotalMaterialCost();
          setSelectedMaterial(null);
          setQuantity(0);
          setShowModal(false);
        } else {
          throw new Error(response.err);
        }
      } catch (err) {
        console.error('Error adding material to project:', err);
      }
    }
  };

  const handleUpdateMaterialQuantity = async (materialId, quantity) => {
  console.log(materialId, quantity);
  let quantityInt = parseInt(quantity);
  if (isNaN(quantityInt) || quantityInt <= 0) {
    setMaterialQuantity('');
    return
  }
  try {
    const response = await api.put(`${baseUrl}/projects/update-material-quantity/${projectId}/${materialId}`, {
      body: { quantity: quantityInt.toString() },
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.err) {
      setMaterials(materials.map((material) => {
        if (material.id === materialId) {
          return { ...material, quantity: quantityInt };
        }
        return material;
      }));
      fetchTotalMaterialCost();
      setEditingMaterial(null);
    } else {
      throw new Error(response.err);
    }
  } catch (err) {
    console.error('Error updating material quantity:', err);
  }

  
};

  const handleRemoveMaterial = async (materialId) => {
    try {
      const response = await api.del(`${baseUrl}/projects/remove-material/${projectId}/${materialId}`);
      if (!response.err) {
        setMaterials(materials.filter((material) => material.id !== materialId));
        fetchTotalMaterialCost();
      } else {
        throw new Error(response.err);
      }
    } catch (err) {
      console.error('Error removing material from project:', err);
    }
  };

  return (
    <>
      <CCard border-0 shadow-sm>
        <CCardBody>
          <h6 className="card-title d-flex align-items-center mb-4">
            <CIcon icon={cilCart} className="text-primary me-2" />
            Materials
          </h6>
          <div className="table-responsive">
            <CTable align="middle" className="mb-0" hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Material</CTableHeaderCell>
                  <CTableHeaderCell>Quantity</CTableHeaderCell>
                  <CTableHeaderCell>Unit Price</CTableHeaderCell>
                  <CTableHeaderCell>Total Price</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {materials.map((material) => (
                  <CTableRow key={material.id}>
                    <CTableDataCell>{material.name}</CTableDataCell>
                    <CTableDataCell>
                      {editingMaterial === material.id ? (
                        <CFormInput
                          type="number"
                          value={materialQuantity}
                          onChange={(e) => setMaterialQuantity(e.target.value)}
                          onBlur={() => handleUpdateMaterialQuantity(material.id, materialQuantity)}
                          autoFocus
                        />
                      ) : (
                        <span onClick={() => {
                          setEditingMaterial(material.id);
                          setMaterialQuantity(material.quantity.toString());
                        }}>
                          {material.quantity}
                        </span>
                      )}
                    </CTableDataCell>
                    <CTableDataCell>{material.price}</CTableDataCell>
                    <CTableDataCell>{(material.quantity * material.price).toFixed(2)}</CTableDataCell>
                    <CTableDataCell>
                      <CButton 
                        color="danger" 
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveMaterial(material.id)}
                      >
                        <CIcon icon={cilTrash} />
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </div>
          <div className="mt-4">
            <h6>Total Cost: ${totalCost}</h6>
          </div>
          <CButton 
            color="primary" 
            variant="ghost" 
            className="mt-3"
            onClick={() => setShowModal(true)}
          >
            <CIcon icon={cilPlus} className="me-2" />
            Add Material
          </CButton>
        </CCardBody>
      </CCard>

      <CModal visible={showModal} onClose={() => setShowModal(false)}>
        <CModalHeader onClose={() => setShowModal(false)}>
          <CModalTitle>Select Material</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CListGroup>
            {availableMaterials.map((material) => (
              <CListGroupItem
                key={material.id}
                active={selectedMaterial?.id === material.id}
                onClick={() => handleSelectMaterial(material)}
                style={{ cursor: 'pointer' }}
              >
                {material.name}
              </CListGroupItem>
            ))}
          </CListGroup>
          <CFormInput
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="mt-3"
          />
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={handleAddNewMaterial} disabled={!selectedMaterial || quantity <= 0}>
            Add
          </CButton>
          <CButton color="secondary" onClick={() => setShowModal(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default Materials;
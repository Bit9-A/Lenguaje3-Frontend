import React from 'react';
import {
  CCard,
  CCardBody,
  CButton,
  CFormInput,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilCloudUpload, cilTrash } from '@coreui/icons';

const Photos = ({ photos, handleRemovePhoto, handleFileChange }) => {
  return (
    <CCard border-0 shadow-sm>
      <CCardBody>
        <h6 className="card-title d-flex align-items-center mb-4">
          <CIcon icon={cilCloudUpload} className="text-primary me-2" />
          Project Photos
        </h6>
        <div className="row g-3">
          {photos?.map((photo, index) => (
            <div key={index} className="col-6 col-md-4 col-lg-3">
              <div className="position-relative">
                <img 
                  src={photo.url || "/placeholder.svg"} 
                  alt={`Project photo ${index + 1}`}
                  className="img-fluid rounded shadow-sm"
                  style={{ aspectRatio: '1', objectFit: 'cover' }}
                />
                <CButton
                  color="danger"
                  size="sm"
                  className="position-absolute top-0 end-0 m-2"
                  onClick={() => handleRemovePhoto(photo.id)}
                >
                  <CIcon icon={cilTrash} />
                </CButton>
              </div>
            </div>
          ))}
          <div className="col-6 col-md-4 col-lg-3">
            <div 
              className="border-dashed rounded d-flex align-items-center justify-content-center"
              style={{ aspectRatio: '1' }}
            >
              <div className="text-center">
                <CFormInput
                  type="file"
                  id="photoUpload"
                  className="d-none"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <CButton 
                  color="primary" 
                  variant="ghost"
                  onClick={() => document.getElementById('photoUpload').click()}
                >
                  <CIcon icon={cilCloudUpload} className="me-2" />
                  Upload Photo
                </CButton>
              </div>
            </div>
          </div>
        </div>
      </CCardBody>
    </CCard>
  );
};

export default Photos;
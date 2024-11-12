// PatientDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function PatientDetail() {
  const { id } = useParams(); // Obtenez l'ID du patient à partir de l'URL
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axios.get(`https://medlinkbackend3-production.up.railway.app/patient/${id}`);
        setPatient(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [id]); // Dépendance sur l'ID pour refaire la requête si l'ID change

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!patient) return <p>No data available.</p>;

  return (
    <div>
      <h2>Patient Details</h2>
      <p><strong>Name:</strong> {patient.first_name} {patient.last_name}</p>
      <p><strong>Date of Birth:</strong> {new Date(patient.date_of_birth).toLocaleDateString()}</p>
      <p><strong>Gender:</strong> {patient.gender}</p>

      <h3>Contact Information</h3>
      <p><strong>Phone:</strong> {patient.contact_information.phone_number || 'Not provided'}</p>
      <p><strong>Email:</strong> {patient.contact_information.email || 'Not provided'}</p>
      <p><strong>Address:</strong> {patient.contact_information.address || 'Not provided'}</p>

      <h3>Medical History</h3>
      {patient.medical_history && patient.medical_history.length > 0 ? (
        patient.medical_history.map((history, index) => (
          <div key={index}>
            <p><strong>Consultation Date:</strong> {new Date(history.consultation_date).toLocaleDateString()}</p>
            <p><strong>Diagnosis:</strong> {history.diagnosis}</p>
            <p><strong>Treatment:</strong> {history.treatment}</p>
          </div>
        ))
      ) : (
        <p>No medical history available.</p>
      )}
    </div>
  );
}

export default PatientDetail;

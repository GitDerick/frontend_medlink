import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';

const HospitalDetail = () => {
  const { id } = useParams(); // Get the hospital ID from the URL
  const [hospital, setHospital] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHospital = async () => {
      try {
        const response = await axios.get(`http://medlinkbackend3-production.up.railway.app/hospital/${id}`);
        setHospital(response.data);
      } catch (error) {
        setError(error.message);
        console.error('There was an error fetching the hospital information!', error);
      }
    };

    fetchHospital();
  }, [id]);

  if (error) {
    return <div className="container mt-5"><p className="text-danger">Error: {error}</p></div>;
  }

  if (!hospital) {
    return <div className="container mt-5"><p>Loading...</p></div>;
  }

  return (
    <div className="container mt-5">
      <h2>Hospital Information</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{hospital.name}</h5>
          <p className="card-text"><strong>Address:</strong> {hospital.address}</p>
          <p className="card-text"><strong>Phone Number:</strong> {hospital.contact_information?.phone_number || 'N/A'}</p>
          <p className="card-text"><strong>Email:</strong> {hospital.contact_information?.email || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default HospitalDetail;

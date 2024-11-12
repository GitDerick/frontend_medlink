import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, useNavigate } from 'react-router-dom';

const HospitalUpdate = () => {
  const { id } = useParams(); // Récupère l'ID de l'hôpital à partir des paramètres de l'URL
  const navigate = useNavigate();
  const [hospital, setHospital] = useState({
    name: '',
    address: '',
    contact_information: {
      phone_number: '',
      email: '',
    },
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHospital = async () => {
      try {
        const response = await axios.get(`http://medlinkbackend3-production.up.railway.app/hospital/${id}`);
        setHospital(response.data);
      } catch (error) {
        setError('Error fetching hospital data');
        console.error(error);
      }
    };

    fetchHospital();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [mainKey, subKey] = name.split('.');
    if (subKey) {
      setHospital((prevHospital) => ({
        ...prevHospital,
        [mainKey]: {
          ...prevHospital[mainKey],
          [subKey]: value,
        },
      }));
    } else {
      setHospital((prevHospital) => ({
        ...prevHospital,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`http://medlinkbackend3-production.up.railway.app/hospital/${id}`, hospital);
      console.log('Hospital updated successfully:', response.data);
      navigate('/hospitalList');
    } catch (error) {
      setError('There was an error updating the hospital!');
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Update Hospital</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={hospital.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={hospital.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone_number" className="form-label">Phone Number</label>
          <input
            type="text"
            className="form-control"
            id="phone_number"
            name="contact_information.phone_number"
            value={hospital.contact_information.phone_number}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="contact_information.email"
            value={hospital.contact_information.email}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Hospital</button>
      </form>
    </div>
  );
};

export default HospitalUpdate;

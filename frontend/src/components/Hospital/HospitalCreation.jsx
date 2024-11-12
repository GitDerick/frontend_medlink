import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const CreateHospital = () => {
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
      const response = await axios.post('https://medlinkbackend3-production.up.railway.app/hospital/', hospital);
      console.log('Hospital registered successfully:', response.data);
      // Reset form after successful submission
      setHospital({
        name: '',
        address: '',
        contact_information: {
          phone_number: '',
          email: '',
        },
      });
      navigate('/hospitalList');
    } catch (error) {
      setError(error.message);
      console.error('There was an error registering the hospital!', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register Hospital</h2>
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
        {error && <p className="text-danger">{error}</p>}
        <button type="submit" className="btn btn-primary">Register Hospital</button>
      </form>
    </div>
  );
};

export default CreateHospital;

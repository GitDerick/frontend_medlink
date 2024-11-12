import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const CreateStaff = () => {
  const navigate = useNavigate();
  const [staff, setStaff] = useState({
    hospital_id: '',
    first_name: '',
    last_name: '',
    role: '',
    department: '',
    contact_information: {
      phone_number: '',
      email: '',
      address: '',
    },
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStaff((prevStaff) => ({
      ...prevStaff,
      [name]: value,
    }));
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setStaff((prevStaff) => ({
      ...prevStaff,
      contact_information: {
        ...prevStaff.contact_information,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://medlinkbackend3-production.up.railway.app/staff/', staff);
      console.log('Staff registered successfully:', response.data);
      // Reset form after successful submission
      setStaff({
        hospital_id: '',
        first_name: '',
        last_name: '',
        role: '',
        department: '',
        contact_information: {
          phone_number: '',
          email: '',
          address: '',
        },
      });
      // Redirect to the desired page after successful registration
      navigate('/staffList');
    } catch (error) {
      console.error('There was an error registering the staff!', error);
      setError(error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Staff Registration</h2>
      {error && <p className="alert alert-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="hospital_id" className="form-label">Hospital ID</label>
          <input
            type="text"
            className="form-control"
            id="hospital_id"
            name="hospital_id"
            value={staff.hospital_id}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="first_name" className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            id="first_name"
            name="first_name"
            value={staff.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="last_name" className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="last_name"
            name="last_name"
            value={staff.last_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="role" className="form-label">Role</label>
          <input
            type="text"
            className="form-control"
            id="role"
            name="role"
            value={staff.role}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="department" className="form-label">Department</label>
          <input
            type="text"
            className="form-control"
            id="department"
            name="department"
            value={staff.department}
            onChange={handleChange}
            required
          />
        </div>
        <h3>Contact Information</h3>
        <div className="mb-3">
          <label htmlFor="phone_number" className="form-label">Phone Number</label>
          <input
            type="text"
            className="form-control"
            id="phone_number"
            name="phone_number"
            value={staff.contact_information.phone_number}
            onChange={handleContactChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={staff.contact_information.email}
            onChange={handleContactChange}
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
            value={staff.contact_information.address}
            onChange={handleContactChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Register Staff</button>
      </form>
    </div>
  );
};

export default CreateStaff;

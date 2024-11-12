import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const DoctorUpdate = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState({
    hospital_id: '',
    first_name: '',
    last_name: '',
    specialty: '',
    availability: [],
    contact_information: {
      phone_number: '',
      email: '',
      office_address: '',
    },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axios.get(`http://medlinkbackend3-production.up.railway.app/doctor/${doctorId}`);
        setDoctor(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [doctorId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctor((prevDoctor) => ({
      ...prevDoctor,
      [name]: value,
    }));
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setDoctor((prevDoctor) => ({
      ...prevDoctor,
      contact_information: {
        ...prevDoctor.contact_information,
        [name]: value,
      },
    }));
  };

  const handleAvailabilityChange = (index, e) => {
    const { name, value } = e.target;
    const newAvailability = [...doctor.availability];
    newAvailability[index] = { ...newAvailability[index], [name]: value };
    setDoctor((prevDoctor) => ({
      ...prevDoctor,
      availability: newAvailability,
    }));
  };

  const addAvailability = () => {
    setDoctor((prevDoctor) => ({
      ...prevDoctor,
      availability: [...prevDoctor.availability, { day: '', start_time: '', end_time: '' }],
    }));
  };

  const removeAvailability = (index) => {
    setDoctor((prevDoctor) => ({
      ...prevDoctor,
      availability: prevDoctor.availability.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://medlinkbackend3-production.up.railway.app/doctor/${doctorId}`, doctor);
      navigate('/doctorList');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mt-5">
      <h2>Edit Doctor</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="hospital_id" className="form-label">Hospital ID</label>
          <input
            type="text"
            className="form-control"
            id="hospital_id"
            name="hospital_id"
            value={doctor.hospital_id}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="first_name" className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            id="first_name"
            name="first_name"
            value={doctor.first_name}
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
            value={doctor.last_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="specialty" className="form-label">Specialty</label>
          <input
            type="text"
            className="form-control"
            id="specialty"
            name="specialty"
            value={doctor.specialty}
            onChange={handleChange}
            required
          />
        </div>
        <h3>Availability</h3>
        {doctor.availability.map((availability, index) => (
          <div key={index} className="mb-3">
            <label htmlFor={`day-${index}`} className="form-label">Day</label>
            <input
              type="text"
              className="form-control"
              id={`day-${index}`}
              name="day"
              value={availability.day}
              onChange={(e) => handleAvailabilityChange(index, e)}
              required
            />
            <label htmlFor={`start_time-${index}`} className="form-label">Start Time</label>
            <input
              type="time"
              className="form-control"
              id={`start_time-${index}`}
              name="start_time"
              value={availability.start_time}
              onChange={(e) => handleAvailabilityChange(index, e)}
              required
            />
            <label htmlFor={`end_time-${index}`} className="form-label">End Time</label>
            <input
              type="time"
              className="form-control"
              id={`end_time-${index}`}
              name="end_time"
              value={availability.end_time}
              onChange={(e) => handleAvailabilityChange(index, e)}
              required
            />
            <button type="button" onClick={() => removeAvailability(index)} className="btn btn-danger mt-2">Remove</button>
          </div>
        ))}
        <button type="button" onClick={addAvailability} className="btn btn-secondary mb-3">Add Availability</button>
        <h3>Contact Information</h3>
        <div className="mb-3">
          <label htmlFor="phone_number" className="form-label">Phone Number</label>
          <input
            type="text"
            className="form-control"
            id="phone_number"
            name="phone_number"
            value={doctor.contact_information.phone_number}
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
            value={doctor.contact_information.email}
            onChange={handleContactChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="office_address" className="form-label">Office Address</label>
          <input
            type="text"
            className="form-control"
            id="office_address"
            name="office_address"
            value={doctor.contact_information.office_address}
            onChange={handleContactChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Doctor</button>
      </form>
    </div>
  );
};

export default DoctorUpdate;

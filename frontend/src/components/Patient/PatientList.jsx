import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('https://medlinkbackend3-production.up.railway.app/patient');
        setPatients(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const deletePatient = async (id) => {
    try {
      await axios.delete(`http://medlinkbackend3-production.up.railway.app/patient/${id}`);
      setPatients(patients.filter(patient => patient.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mt-5">
      <h2>Patient List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Hospital ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Birth</th>
            <th>Gender</th>
            <th>Contact Information</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.hospital_id}</td>
              <td>{patient.first_name}</td>
              <td>{patient.last_name}</td>
              <td>{new Date(patient.date_of_birth).toLocaleDateString()}</td>
              <td>{patient.gender}</td>
              <td>
                <p><strong>Phone Number:</strong> {patient.contact_information.phone_number}</p>
                <p><strong>Email:</strong> {patient.contact_information.email}</p>
                <p><strong>Address:</strong> {patient.contact_information.address}</p>
              </td>
              <td>
                <Link to={`/patient/${patient.id}`} className="btn btn-info btn-sm mr-2">
                  Voir Info
                </Link>
                <Link to={`/patient/${patient.id}`} className="btn btn-primary">
                  Edit
                </Link>
                <button
                  onClick={() => deletePatient(patient.id)}
                  className="btn btn-danger ml-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientList;

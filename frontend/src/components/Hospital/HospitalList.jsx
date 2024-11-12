import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const HospitalList = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await axios.get('http://medlinkbackend3-production.up.railway.app/hospital');
        setHospitals(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  const deleteHospital = async (id) => {
    if (window.confirm("Are you sure you want to delete this hospital?")) {
      try {
        await axios.delete(`https://medlinkbackend3-production.up.railway.app/hospital/${id}`);
        setHospitals(hospitals.filter(hospital => hospital.id !== id));
      } catch (err) {
        setError("Failed to delete hospital: " + err.message);
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mt-5">
      <h2>Hospital List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {hospitals.map((hospital) => (
            <tr key={hospital.id}>
              <td>{hospital.name}</td>
              <td>{hospital.address}</td>
              <td>{hospital.contact_information.phone_number}</td>
              <td>{hospital.contact_information.email}</td>
              <td>
                <Link to={`/hospital/${hospital.id}`} className="btn btn-info btn-sm mr-2">
                  View
                </Link>
                <Link to={`/hospital/${hospital.id}/update`} className="btn btn-primary btn-sm mr-2">
                  Edit
                </Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteHospital(hospital.id)}
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

export default HospitalList;

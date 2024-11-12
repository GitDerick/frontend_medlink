import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const StaffList = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await axios.get('http://medlinkbackend3-production.up.railway.app/staff');
        setStaff(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, []);

  const deleteStaff = async (id) => {
    try {
      await axios.delete(`http://medlinkbackend3-production.up.railway.app/staff/${id}`);
      setStaff(staff.filter((staffMember) => staffMember.staff_id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mt-5">
      <h2>Staff List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Role</th>
            <th>Department</th>
            <th>Contact Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {staff.map((staffMember) => (
            <tr key={staffMember.id}>
              <td>{staffMember.first_name}</td>
              <td>{staffMember.last_name}</td>
              <td>{staffMember.role}</td>
              <td>{staffMember.department}</td>
              <td>{staffMember.contact_information.email}</td>
              <td>
                <Link to={`/staff/${staffMember.id}`} className="btn btn-info btn-sm mr-2">
                  View Info
                </Link>
                <Link to={`/staff/${staffMember.id}/update`} className="btn btn-primary btn-sm mr-2">
                  Edit
                </Link>
                <button
                  onClick={() => deleteStaff(staffMember.staff_id)}
                  className="btn btn-danger btn-sm"
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

export default StaffList;

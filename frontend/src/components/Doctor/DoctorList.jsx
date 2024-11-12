import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('https://medlinkbackend3-production.up.railway.app/doctor');
                setDoctors(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDoctors();
    }, []);

    const deleteDoctor = async (id) => {
        try {
            await axios.delete(`http://medlinkbackend3-production.up.railway.app/doctor/${id}`);
            setDoctors(doctors.filter(doctor => doctor.id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container mt-5">
            <h2>Doctor List</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Specialty</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {doctors.map((doctor) => (
                        <tr key={doctor.id}>
                            <td>{doctor.first_name}</td>
                            <td>{doctor.last_name}</td>
                            <td>{doctor.specialty}</td>
                            <td>
                                <Link to={`/doctor/${doctor.id}`} className="btn btn-info btn-sm mr-2">
                                    View Info
                                </Link>
                                <Link to={`/doctor/${doctor.id}/doctorUpdate`} className="btn btn-primary btn-sm mr-2">
                                    Edit
                                </Link>
                                <button
                                    onClick={() => deleteDoctor(doctor.id)}
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

export default DoctorList;

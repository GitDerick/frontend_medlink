import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const StaffDetail = () => {
    const { id } = useParams();
    const [staff, setStaff] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStaff = async () => {
            try {
                const response = await axios.get(`http://medlinkbackend3-production.up.railway.app/staff/${id}`);
                setStaff(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStaff();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!staff) return <p>No staff data available.</p>;

    return (
        <div className="container mt-5">
            <h2>Staff Details</h2>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Staff Information</h5>
                    <p><strong>Hospital ID:</strong> {staff.hospital_id}</p>
                    <p><strong>First Name:</strong> {staff.first_name}</p>
                    <p><strong>Last Name:</strong> {staff.last_name}</p>
                    <p><strong>Role:</strong> {staff.role}</p>
                    <p><strong>Department:</strong> {staff.department}</p>
                    <h5 className="card-title">Contact Information</h5>
                    <p><strong>Phone Number:</strong> {staff.contact_information.phone_number}</p>
                    <p><strong>Email:</strong> {staff.contact_information.email}</p>
                    <p><strong>Address:</strong> {staff.contact_information.address}</p>
                </div>
            </div>
        </div>
    );
};

export default StaffDetail;

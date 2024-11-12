import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const DoctorDetail = () => {
    const { id } = useParams();
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const response = await axios.get(`http://medlinkbackend3-production.up.railway.app/doctor/${id}`);
                setDoctor(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDoctor();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container mt-5">
            <h2>Doctor Details</h2>
            {doctor && (
                <div>
                    <p><strong>Hospital ID:</strong> {doctor.hospital_id}</p>
                    <p><strong>First Name:</strong> {doctor.first_name}</p>
                    <p><strong>Last Name:</strong> {doctor.last_name}</p>
                    <p><strong>Specialty:</strong> {doctor.specialty}</p>
                    <h3>Contact Information</h3>
                    <p><strong>Phone Number:</strong> {doctor.contact_information.phone_number}</p>
                    <p><strong>Email:</strong> {doctor.contact_information.email}</p>
                    <p><strong>Office Address:</strong> {doctor.contact_information.office_address}</p>
                    <h3>Availability</h3>
                    {doctor.availability.map((slot, index) => (
                        <div key={index}>
                            <p><strong>Day:</strong> {slot.day}</p>
                            <p><strong>Start Time:</strong> {slot.start_time}</p>
                            <p><strong>End Time:</strong> {slot.end_time}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DoctorDetail;

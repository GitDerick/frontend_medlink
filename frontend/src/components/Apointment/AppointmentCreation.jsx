import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const CreateAppointment = () => {
    const [formData, setFormData] = useState({
        hospital_id: '',
        patient_id: '',
        doctor_id: '',
        department_id: '',
        appointment_date: '',
        appointment_time: '',
        status: '',
        notes: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://medlinkbackend3-production.up.railway.app/appointment', formData);
            alert('Appointment created successfully!');
            console.log(response.data);
        } catch (error) {
            console.error('There was an error creating the appointment!', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Create New Appointment</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Hospital ID</label>
                    <input
                        type="text"
                        name="hospital_id"
                        value={formData.hospital_id}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Patient ID</label>
                    <input
                        type="text"
                        name="patient_id"
                        value={formData.patient_id}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Doctor ID</label>
                    <input
                        type="text"
                        name="doctor_id"
                        value={formData.doctor_id}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Department ID</label>
                    <input
                        type="text"
                        name="department_id"
                        value={formData.department_id}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Appointment Date</label>
                    <input
                        type="date"
                        name="appointment_date"
                        value={formData.appointment_date}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Appointment Time</label>
                    <input
                        type="time"
                        name="appointment_time"
                        value={formData.appointment_time}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Status</label>
                    <input
                        type="text"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Notes</label>
                    <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Create Appointment
                </button>
            </form>
        </div>
    );
};

export default CreateAppointment;

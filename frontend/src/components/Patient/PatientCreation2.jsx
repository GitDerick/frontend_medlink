import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const CreatePatientForm = () => {
    const [formData, setFormData] = useState({
        hospital_id: '',
        first_name: '',
        last_name: '',
        date_of_birth: '',
        gender: '',
        medical_history: [],
        phone_number: '',
        email: '',
        address: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleMedicalHistoryChange = (index, e) => {
        const { name, value } = e.target;
        const updatedMedicalHistory = [...formData.medical_history];
        updatedMedicalHistory[index][name] = value;
        setFormData({
            ...formData,
            medical_history: updatedMedicalHistory
        });
    };

    const handleContactInfoChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            contact_information: {
                ...formData.contact_information,
                [name]: value
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://medlinkbackend3-production.up.railway.app/patient', formData);
            console.log('Patient created:', response.data);
            // Reset form after successful submission
            setFormData({
                hospital_id: '',
                first_name: '',
                last_name: '',
                date_of_birth: '',
                gender: '',
                phone_number: '',
                email: '',
                address: ''

            });
        } catch (error) {
            console.error('There was an error creating the patient!', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Create New Patient</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Hospital ID</label>
                    <input type="text" className="form-control" name="hospital_id" value={formData.hospital_id} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">First Name</label>
                    <input type="text" className="form-control" name="first_name" value={formData.first_name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Last Name</label>
                    <input type="text" className="form-control" name="last_name" value={formData.last_name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Date of Birth</label>
                    <input type="date" className="form-control" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Gender</label>
                    <select className="form-select" name="gender" value={formData.gender} onChange={handleChange} required>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                
                <div className="mb-3">
                    <label className="form-label">Contact Information</label>
                    <div className="mb-3">
                        <label className="form-label">Phone Number</label>
                        <input type="text" className="form-control" name="phone_number" value={formData.contact_information.phone_number} onChange={handleContactInfoChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" name="email" value={formData.contact_information.email} onChange={handleContactInfoChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Address</label>
                        <input type="text" className="form-control" name="address" value={formData.contact_information.address} onChange={handleContactInfoChange} required />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Create Patient</button>
            </form>
        </div>
    );
};

export default CreatePatientForm;

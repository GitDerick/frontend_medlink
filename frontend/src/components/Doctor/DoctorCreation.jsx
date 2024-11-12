import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const CreateDoctor = () => {
    const navigate = useNavigate();
    const [doctor, setDoctor] = useState({
        hospital_id: '',
        first_name: '',
        last_name: '',
        specialty: '',
        availability: [{ day: '', start_time: '', end_time: '' }],
        contact_information: {
            phone_number: '',
            email: '',
            office_address: '',
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDoctor((prevDoctor) => ({
            ...prevDoctor,
            [name]: value,
        }));
    };

    const handleAvailabilityChange = (index, e) => {
        const { name, value } = e.target;
        const updatedAvailability = doctor.availability.map((avail, i) =>
            i === index ? { ...avail, [name]: value } : avail
        );
        setDoctor((prevDoctor) => ({
            ...prevDoctor,
            availability: updatedAvailability,
        }));
    };

    const handleAddAvailability = () => {
        setDoctor((prevDoctor) => ({
            ...prevDoctor,
            availability: [...prevDoctor.availability, { day: '', start_time: '', end_time: '' }],
        }));
    };

    const handleRemoveAvailability = (index) => {
        setDoctor((prevDoctor) => ({
            ...prevDoctor,
            availability: prevDoctor.availability.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://medlinkbackend3-production.up.railway.app/doctor', doctor);
            console.log('Doctor registered successfully:', response.data);
            // Reset form after successful submission
            setDoctor({
                hospital_id: '',
                first_name: '',
                last_name: '',
                specialty: '',
                availability: [{ day: '', start_time: '', end_time: '' }],
                contact_information: {
                    phone_number: '',
                    email: '',
                    office_address: '',
                },
            });
            navigate('/doctorList')
        } catch (error) {
            console.error('There was an error registering the doctor!', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Doctor Registration</h2>
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
                <div className="mb-3">
                    <label className="form-label">Availability</label>
                    {doctor.availability.map((avail, index) => (
                        <div key={index} className="mb-3">
                            <div className="row">
                                <div className="col">
                                    <input
                                        type="date"
                                        className="form-control"
                                        placeholder="Day"
                                        name="day"
                                        value={avail.day}
                                        onChange={(e) => handleAvailabilityChange(index, e)}
                                        required
                                    />
                                </div>
                                <div className="col">
                                    <input
                                        type="time"
                                        className="form-control"
                                        placeholder="Start Time"
                                        name="start_time"
                                        value={avail.start_time}
                                        onChange={(e) => handleAvailabilityChange(index, e)}
                                        required
                                    />
                                </div>
                                <div className="col">
                                    <input
                                        type="time"
                                        className="form-control"
                                        placeholder="End Time"
                                        name="end_time"
                                        value={avail.end_time}
                                        onChange={(e) => handleAvailabilityChange(index, e)}
                                        required
                                    />
                                </div>
                                <div className="col">
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => handleRemoveAvailability(index)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <button type="button" className="btn btn-secondary" onClick={handleAddAvailability}>
                        Add Availability
                    </button>
                </div>
                <div className="mb-3">
                    <label htmlFor="phone_number" className="form-label">Phone Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="phone_number"
                        name="phone_number"
                        value={doctor.contact_information.phone_number}
                        onChange={(e) =>
                            setDoctor((prevDoctor) => ({
                                ...prevDoctor,
                                contact_information: {
                                    ...prevDoctor.contact_information,
                                    phone_number: e.target.value,
                                },
                            }))
                        }
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
                        onChange={(e) =>
                            setDoctor((prevDoctor) => ({
                                ...prevDoctor,
                                contact_information: {
                                    ...prevDoctor.contact_information,
                                    email: e.target.value,
                                },
                            }))
                        }
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
                        onChange={(e) =>
                            setDoctor((prevDoctor) => ({
                                ...prevDoctor,
                                contact_information: {
                                    ...prevDoctor.contact_information,
                                    office_address: e.target.value,
                                },
                            }))
                        }
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Register Doctor</button>
            </form>
        </div>
    );
};

export default CreateDoctor;

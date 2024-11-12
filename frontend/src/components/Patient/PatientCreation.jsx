import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
 
const PatientSignup = () => {
  const [patient, setPatient] = useState({
    hospital_id: '66a2fda2453f1cf946911ef9',  // ID du hospital
    first_name: '',
    last_name: '',
    date_of_birth: '',
    gender: '',
    medical_history: [
      {
        consultation_date: '',
        doctor_id: '',
        diagnosis: 'Hidden diagnosis',  // Masqué mais présent
        treatment: 'Hidden treatment'  // Masqué mais présent
      }
    ],
    contact_information: {
      phone_number: '',
      email: '',
      address: ''
    }
  });
 
  const [doctors, setDoctors] = useState([]);
 
  useEffect(() => {
    // Récupérer la liste des docteurs via le proxy
    axios.get('http://medlinkbackend3-production.up.railway.app/doctor/')
      .then(response => {
        setDoctors(response.data);
      })
      .catch(error => {
        console.error('Error fetching doctors:', error);
      });
  }, []);
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('medical_history')) {
      const [field, index] = name.split('.').slice(1); // Extract field name and index
      setPatient((prevPatient) => {
        const updatedHistory = [...prevPatient.medical_history];
        updatedHistory[index] = {
          ...updatedHistory[index],
          [field]: value
        };
        return {
          ...prevPatient,
          medical_history: updatedHistory
        };
      });
    } else if (name.startsWith('contact_information')) {
      const key = name.split('.')[1];
      setPatient((prevPatient) => ({
        ...prevPatient,
        contact_information: {
          ...prevPatient.contact_information,
          [key]: value
        }
      }));
    } else {
      setPatient((prevPatient) => ({
        ...prevPatient,
        [name]: value
      }));
    }
  };
 
  const handleDateChange = (date, index) => {
    setPatient((prevPatient) => {
      const updatedHistory = [...prevPatient.medical_history];
      updatedHistory[index].consultation_date = date;
      return {
        ...prevPatient,
        medical_history: updatedHistory
      };
    });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://medlinkbackend3-production.up.railway.app/patient', patient);
      console.log('Patient created successfully:', response.data);
      // Réinitialiser le formulaire après soumission
      setPatient({
        hospital_id: '66a2fda2453f1cf946911ef9',  // Toujours masqué
        first_name: '',
        last_name: '',
        date_of_birth: '',
        gender: '',
        medical_history: [
          {
            consultation_date: '',
            doctor_id: '',
            diagnosis: 'Hidden diagnosis',  // Masqué mais présent
            treatment: 'Hidden treatment'  // Masqué mais présent
          }
        ],
        contact_information: {
          phone_number: '',
          email: '',
          address: ''
        }
      });
    } catch (error) {
      console.error('There was an error creating the patient!', error);
    }
  };
 
  return (
    <div className="container mt-5">
      <h2>Create Patient</h2>
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="hospital_id" value={patient.hospital_id} />
        <div className="mb-3">
          <label htmlFor="first_name" className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            id="first_name"
            name="first_name"
            value={patient.first_name}
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
            value={patient.last_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date_of_birth" className="form-label">Date of Birth</label>
          <input
            type="date"
            className="form-control"
            id="date_of_birth"
            name="date_of_birth"
            value={patient.date_of_birth}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="gender" className="form-label">Gender</label>
          <select
            className="form-control"
            id="gender"
            name="gender"
            value={patient.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label"><h4>Medical History</h4></label>
          {patient.medical_history.map((history, index) => (
            <div key={index} className="mb-3">
              <label htmlFor={`consultation_date.${index}`} className="form-label">Consultation Date</label>
              <input
                type="date"
                className="form-control"
                id={`consultation_date.${index}`}
                name={`medical_history.consultation_date.${index}`}
                value={history.consultation_date}
                onChange={(e) => handleDateChange(e.target.value, index)}
                required
              />
              <label htmlFor={`doctor_id.${index}`} className="form-label">Doctor</label>
              <select
                className="form-control"
                id={`doctor_id.${index}`}
                name={`medical_history.doctor_id.${index}`}
                value={history.doctor_id}
                onChange={handleChange}
                required
              >
                <option value="">Select Doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.first_name} {doctor.last_name} - {doctor.specialty}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
        <div className="mb-3">
          <label htmlFor="phone_number" className="form-label">Phone Number</label>
          <input
            type="text"
            className="form-control"
            id="phone_number"
            name="contact_information.phone_number"
            value={patient.contact_information.phone_number}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="contact_information.email"
            value={patient.contact_information.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="contact_information.address"
            value={patient.contact_information.address}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Create Patient</button>
      </form>
    </div>
  );
};
 
export default PatientSignup;
 
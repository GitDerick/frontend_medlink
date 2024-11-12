import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const AppointmentUpdate = () => {
  const { id } = useParams(); // ID du rendez-vous à mettre à jour
  const navigate = useNavigate(); // Pour rediriger après la mise à jour
  const [appointment, setAppointment] = useState({
    hospital_id: '',
    patient_id: '',
    doctor_id: '',
    department_id: '',
    appointment_date: '',
    appointment_time: '',
    status: '',
    notes: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    // Fonction pour obtenir les détails du rendez-vous
    const fetchAppointment = async () => {
      try {
        const response = await axios.get(`http://medlinkbackend3-production.up.railway.app/appointment/${id}`);
        setAppointment(response.data);
      } catch (err) {
        setError('Erreur lors de la récupération des détails du rendez-vous.');
      }
    };

    fetchAppointment();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointment(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://medlinkbackend3-production.up.railway.app/appointment/${id}`, appointment);
      navigate('/appointmentList'); // Rediriger vers la liste des rendez-vous après mise à jour
    } catch (err) {
      setError('Erreur lors de la mise à jour du rendez-vous.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Modifier le Rendez-vous</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="hospital_id" className="form-label">ID de l'Hôpital</label>
          <input
            type="text"
            id="hospital_id"
            name="hospital_id"
            className="form-control"
            value={appointment.hospital_id}
            onChange={handleChange}
            disabled
          />
        </div>
        <div className="mb-3">
          <label htmlFor="patient_id" className="form-label">ID du Patient</label>
          <input
            type="text"
            id="patient_id"
            name="patient_id"
            className="form-control"
            value={appointment.patient_id}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="doctor_id" className="form-label">ID du Médecin</label>
          <input
            type="text"
            id="doctor_id"
            name="doctor_id"
            className="form-control"
            value={appointment.doctor_id}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="department_id" className="form-label">ID du Département</label>
          <input
            type="text"
            id="department_id"
            name="department_id"
            className="form-control"
            value={appointment.department_id}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="appointment_date" className="form-label">Date du Rendez-vous</label>
          <input
            type="date"
            id="appointment_date"
            name="appointment_date"
            className="form-control"
            value={appointment.appointment_date.substring(0, 10)} // Format YYYY-MM-DD
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="appointment_time" className="form-label">Heure du Rendez-vous</label>
          <input
            type="time"
            id="appointment_time"
            name="appointment_time"
            className="form-control"
            value={appointment.appointment_time}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="status" className="form-label">Statut</label>
          <input
            type="text"
            id="status"
            name="status"
            className="form-control"
            value={appointment.status}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="notes" className="form-label">Notes</label>
          <textarea
            id="notes"
            name="notes"
            className="form-control"
            rows="3"
            value={appointment.notes}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Mettre à Jour</button>
      </form>
    </div>
  );
};

export default AppointmentUpdate;

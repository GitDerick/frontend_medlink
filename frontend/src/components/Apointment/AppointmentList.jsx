import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://medlinkbackend3-production.up.railway.app/appointment');
        setAppointments(response.data);
      } catch (error) {
        setError(error.message);
        console.error('There was an error fetching the appointments!', error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Appointment List</h2>
      {error && <p className="text-danger">{error}</p>}
      {appointments.length > 0 ? (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Hospital ID</th>
              <th>Patient ID</th>
              <th>Doctor ID</th>
              <th>Department ID</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.appointment_id}>
                <td>{appointment.hospital_id}</td>
                <td>{appointment.patient_id}</td>
                <td>{appointment.doctor_id}</td>
                <td>{appointment.department_id}</td>
                <td>{new Date(appointment.appointment_date).toLocaleDateString()}</td>
                <td>{appointment.appointment_time}</td>
                <td>{appointment.status}</td>
                <td>{appointment.notes || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No appointments found.</p>
      )}
    </div>
  );
};

export default AppointmentList;

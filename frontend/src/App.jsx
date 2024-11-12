import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'owl.carousel/dist/assets/owl.carousel.min.css';
import 'owl.carousel';
import "./App.css"
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ContactPage from './components/ContactPage';
import AboutPage from './components/AboutPage';
import PatientList from './components/Patient/PatientList';
import PatientUpdate from './components/Patient/PatientUpdate';
import CreateDoctor from './components/Doctor/DoctorCreation';
import DoctorList from './components/Doctor/DoctorList';
import DoctorUpdate from './components/Doctor/DoctorUpdate';
import CreateStaff from './components/Staff/StaffCreation';
import StaffList from './components/Staff/StaffList';
import StaffUpdate from './components/Staff/StaffUpdate';
import PatientDetail from './components/Patient/PatientInfo';
import DoctorDetail from './components/Doctor/DoctorInfo';
import CreateHospital from './components/Hospital/HospitalCreation';
import HospitalList from './components/Hospital/HospitalList';
import HospitalDetail from './components/Hospital/HospitalInfo';
import HospitalUpdate from './components/Hospital/HospitalUpdate';
import StaffDetail from './components/Staff/StaffInfo';
import AppointmentList from './components/Apointment/AppointmentList';
import DepartmentList from './components/Departement/DepartementList';
import DepartmentDetail from './components/Departement/DepartementInfo';
import CreateDepartment from './components/Departement/DepartementCreation';
import DepartementUpdate from './components/Departement/DepartementUpdate';
import CreateAppointment from './components/Apointment/AppointmentCreation';
import PatientSignup from './components/Patient/PatientCreation';


function Header() {
  return (
    <Router>
      <div className="Application">
        <header className="App-header bg-dark text-white p-3">
          <div className="container">
            <h1 className="display-4">Front</h1>
            <nav className="navbar navbar-expand-lg navbar-dark">
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/about">About</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/contact">Contact</Link>
                  </li>

                  <li className="nav-item dropdown custom-dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownPatients" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Patients
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdownPatients">
                      <li><Link className="dropdown-item" to="/createPatient">Create Patient</Link></li>
                      <li><Link className="dropdown-item" to="/PatientList">Patient List</Link></li>
                    </ul>
                  </li>

                  <li className="nav-item dropdown custom-dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownDoctors" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Doctors
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdownDoctors">
                      <li><Link className="dropdown-item" to="/createDoctor">Create Doctor</Link></li>
                      <li><Link className="dropdown-item" to="/doctorList">Doctor List</Link></li>
                    </ul>
                  </li>

                  <li className="nav-item dropdown custom-dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownStaff" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Staff
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdownStaff">
                      <li><Link className="dropdown-item" to="/createStaff">Create Staff</Link></li>
                      <li><Link className="dropdown-item" to="/staffList">Staff List</Link></li>
                    </ul>
                  </li>

                  <li className="nav-item dropdown custom-dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownStaff" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Hospital
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdownStaff">
                      <li><Link className="dropdown-item" to="/createHospital">Create Hospital</Link></li>
                      <li><Link className="dropdown-item" to="/hospitalList">Hospital List</Link></li>
                    </ul>
                  </li>

                  <li className="nav-item dropdown custom-dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownStaff" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Appointment
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdownStaff">
                      <li><Link className="dropdown-item" to="/createAppointment">Create Appointment</Link></li>
                      <li><Link className="dropdown-item" to="/appointmentList">Appointment List</Link></li>
                    </ul>
                  </li>

                  <li className="nav-item dropdown custom-dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownStaff" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Departement
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdownStaff">
                      <li><Link className="dropdown-item" to="/createDepartement">Create Departement</Link></li>
                      <li><Link className="dropdown-item" to="/departementList">Departement List</Link></li>
                    </ul>
                  </li>

                </ul>
              </div>
            </nav>
          </div>
        </header>
        <main className="container mt-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />

            <Route path="/createPatient" element={<PatientSignup />} />
            <Route path="/PatientList" element={<PatientList />} />
            <Route path="/patient/:patientId" element={<PatientUpdate />} />
            <Route path="/patient/:id" element={<PatientDetail />} />

            <Route path="/createDoctor" element={<CreateDoctor />} />
            <Route path="/doctorList" element={<DoctorList />} />
            <Route path="/doctor/:id" element={<DoctorDetail />} />
            <Route path="/doctor/:doctorId/doctorUpdate" element={<DoctorUpdate />} />

            <Route path="/createStaff" element={<CreateStaff />} />
            <Route path="/staffList" element={<StaffList />} />
            <Route path="/staff/:id" element={<StaffDetail />} />
            <Route path="/staff/:staffId/update" element={<StaffUpdate />} />

            <Route path="/createHospital" element={<CreateHospital />} />
            <Route path="/hospitalList" element={<HospitalList />} />
            <Route path="/hospital/:id" element={<HospitalDetail />} />
            <Route path="/hospital/:id/update" element={<HospitalUpdate />} />

            <Route path="/createAppointment" element={<CreateAppointment />} />
            <Route path="/appointmentList" element={<AppointmentList />} />
            <Route path="/appointment/:id" element={<AppointmentList />} />

            <Route path="/createDepartement" element={<CreateDepartment />} />
            <Route path="/departementList" element={<DepartmentList />} />
            <Route path="/departement/:id" element={<DepartmentDetail />} />
            <Route path="/departement/:id/update" element={<DepartementUpdate />} />

          </Routes>
        </main>
      </div>
    </Router>
  );
}

const HomePage = () => (
  <div className="text-center">
    <h2>Welcome to the Home Page</h2>
  </div>
);

export default Header;

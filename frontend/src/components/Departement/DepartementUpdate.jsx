import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

const DepartementUpdate = () => {
    const { id } = useParams();
    const [department, setDepartment] = useState(null);
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [beds, setBeds] = useState([]);
    const [bedId, setBedId] = useState('');
    const [bedStatus, setBedStatus] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDepartment = async () => {
            try {
                const response = await axios.get(`https://medlinkbackend3-production.up.railway.app/departement/${id}`);
                const data = response.data;
                setDepartment(data);
                setName(data.name);
                setLocation(data.location);
                setBeds(data.beds);
            } catch (error) {
                setError('Failed to fetch department.');
            }
        };

        fetchDepartment();
    }, [id]);

    const handleAddBed = () => {
        setBeds([...beds, { bed_id: bedId, status: bedStatus }]);
        setBedId('');
        setBedStatus('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`https://medlinkbackend3-production.up.railway.app/departement/${id}`, {
                name,
                location,
                beds
            });
            setSuccess('Department updated successfully!');
            setError(null);
            setTimeout(() => navigate('/departement'), 2000); // Redirect to departments list after 2 seconds
        } catch (error) {
            setError('Failed to update department.');
            setSuccess(null);
        }
    };

    if (!department) return <p>Loading...</p>;

    return (
        <Container>
            <h1 className="my-4">Edit Department</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formDepartmentName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter department name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formDepartmentLocation">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formBeds">
                    <Form.Label>Beds</Form.Label>
                    {beds.length === 0 && <Form.Text className="text-muted">No beds added.</Form.Text>}
                    <div>
                        {beds.map((bed, index) => (
                            <div key={index}>
                                <p>Bed ID: {bed.bed_id}, Status: {bed.status}</p>
                            </div>
                        ))}
                    </div>
                    <Form.Control
                        type="text"
                        placeholder="Bed ID"
                        value={bedId}
                        onChange={(e) => setBedId(e.target.value)}
                    />
                    <Form.Control
                        type="text"
                        placeholder="Bed Status"
                        value={bedStatus}
                        onChange={(e) => setBedStatus(e.target.value)}
                    />
                    <Button variant="secondary" onClick={handleAddBed} className="mt-2">
                        Add Bed
                    </Button>
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                    Update Department
                </Button>
            </Form>
        </Container>
    );
};

export default DepartementUpdate;

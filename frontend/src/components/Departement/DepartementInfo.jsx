import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, Container } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

const DepartmentDetail = () => {
    const { id } = useParams(); // Récupère l'ID du département depuis les paramètres de l'URL
    const [department, setDepartment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDepartment = async () => {
            try {
                const response = await axios.get(`https://medlinkbackend3-production.up.railway.app/departement/${id}`);
                setDepartment(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchDepartment();
    }, [id]);

    const handleEdit = () => {
        navigate(`/department/edit/${id}`);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`https://medlinkbackend3-production.up.railway.app/departement/${id}`);
            navigate('/department');
        } catch (error) {
            console.error('Failed to delete department:', error);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading department: {error.message}</p>;

    return (
        <Container>
            <h1 className="my-4">Department Detail</h1>
            {department ? (
                <Card>
                    <Card.Body>
                        <Card.Title>{department.name}</Card.Title>
                        <Card.Text>
                            <strong>Location:</strong> {department.location}
                        </Card.Text>
                        <Card.Text>
                            <strong>Hospital ID:</strong> {department.hospital_id}
                        </Card.Text>
                        <Card.Text>
                            <strong>Beds:</strong>
                        </Card.Text>
                        <ul>
                            {department.beds.map((bed) => (
                                <li key={bed.bed_id}>
                                    <strong>Bed ID:</strong> {bed.bed_id}, <strong>Status:</strong> {bed.status}
                                </li>
                            ))}
                        </ul>
                        <div className="d-flex justify-content-between">
                            <Button variant="warning" onClick={handleEdit}>
                                Edit
                            </Button>
                            <Button variant="danger" onClick={handleDelete}>
                                Delete
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            ) : (
                <p>Department not found</p>
            )}
        </Container>
    );
};

export default DepartmentDetail;

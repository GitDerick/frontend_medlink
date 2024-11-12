import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const DepartmentsList = () => {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await axios.get('https://medlinkbackend3-production.up.railway.app/departement');  // Remplacez l'URL par celle correspondant à votre API
                setDepartments(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchDepartments();
    }, []);

    const handleViewInfo = (id) => {
        navigate(`/departement/${id}`);
    };

    const handleEdit = (id) => {
        navigate(`/departement/${id}/update`);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://medlinkbackend3-production.up.railway.app/departement/${id}`);
            setDepartments(departments.filter((dpt) => dpt.id !== id));
        } catch (error) {
            console.error('Failed to delete department:', error);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading departments: {error.message}</p>;

    return (
        <Container>
            <h1 className="my-4">Departments List</h1>
            <Row>
                {departments.map((dpt) => (
                    <Col key={dpt.id} sm={12} md={6} lg={4} className="mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>{dpt.name}</Card.Title>
                                <Card.Text>
                                    <strong>Location:</strong> {dpt.location}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Beds:</strong>
                                    <ul>
                                        {dpt.beds.map((bed) => (
                                            <li key={bed.bed_id}>
                                                Bed ID: {bed.bed_id}, Status: {bed.status}
                                            </li>
                                        ))}
                                    </ul>
                                </Card.Text>
                                <div className="d-flex justify-content-between">
                                    <Button 
                                        variant="info" 
                                        onClick={() => handleViewInfo(dpt.id)}
                                    >
                                        Voir Info
                                    </Button>
                                    <Button 
                                        variant="warning" 
                                        onClick={() => handleEdit(dpt.id)}
                                    >
                                        Edit
                                    </Button>
                                    <Button 
                                        variant="danger" 
                                        onClick={() => handleDelete(dpt.id)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default DepartmentsList;

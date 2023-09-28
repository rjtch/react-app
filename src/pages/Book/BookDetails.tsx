import { Card } from 'react-bootstrap';
import React from 'react';

export const BookDetails = () => {
    // const { param } = useParams();
    // const identifier = param ?? "";
    return (
        <Card className="container">
            <h1>Details</h1>
            <Card.Body>This is some text for a book.</Card.Body>
        </Card>
    );
};

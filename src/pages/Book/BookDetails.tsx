import { Card } from 'react-bootstrap';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectAllBooks } from './BooksSlice';

export const BookDetails = () => {
    const param = useParams();
    const identifier = param.identifier ?? '';
    const books = useSelector(selectAllBooks);
    const book = books.map((content) =>
        content.bookResourceList).flat().find((value) =>
        value ? value.identifier === identifier : '');
    if (book) {
        if (book.borrowed) {
            return (
                <Card className="container content">
                    <h3>Details</h3>
                    <Card.Text>This book: <strong>{book.title}</strong> is no more available.</Card.Text>
                    <Card.Title>Description</Card.Title>
                    <Card.Body>{book.description}</Card.Body>
                    <Card.Footer>Borrowed by: {book.borrowedBy?.lastName} {book.borrowedBy?.firstName}</Card.Footer>
                </Card>
            );
        } else {
            return (
                <Card className="container content">
                    <h3>Details</h3>
                    <Card.Text>This book: <strong>{book.title}</strong> is still available.</Card.Text>
                    <Card.Title>Description</Card.Title>
                    <Card.Body>{book.description}</Card.Body>
                </Card>
            );
        }
    } else {
        return (
            <Card className="container content">
                <h3>Details</h3>
                <div>404 nothing to show here!!</div>
            </Card>
        );
    }

};

import { BookResource } from '../../api/generated';
import { Button, Container, ListGroup, Modal } from 'react-bootstrap';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
    book: BookResource;
    index: number;
}

export const BookContent = ({ book, index }: Props) => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    if (book && book.identifier) {
        return (
            <Container className="p-3">
                <ListGroup>
                    <Button variant="outline-dark" onClick={handleShow}>
                        <strong>{book.title}</strong> - By - {book.authors[0] }
                    </Button>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>{book.title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {book.description}
                            <br/>
                            <p>
                                This book was borrowed by - <strong>{book.borrowedBy?.firstName}
                                {book.borrowedBy?.lastName}</strong>
                            </p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="outline-dark" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="outline-dark" onClick={() => {
                                navigate(`details/${book.identifier}`);
                            }}>
                                details
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </ListGroup>
            </Container>
        );
    }
    return <></>;
};

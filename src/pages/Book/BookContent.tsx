import { BookResource } from '../../api/generated';
import { Button, Container, ListGroup, Modal } from 'react-bootstrap';
import { useState } from 'react';

interface Props {
    book: BookResource;
    index: number;
}

export const BookContent = ({ book, index }: Props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    if (book) {
        return (
            <Container className="p-3">
                <ListGroup>
                    <Button variant="info" onClick={handleShow}>
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
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </ListGroup>
            </Container>
        );
    }
    return <></>;
};

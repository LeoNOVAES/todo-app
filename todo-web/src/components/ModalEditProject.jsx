import React, { useEffect, useState } from 'react';
import {  Button, Form,  Modal } from 'react-bootstrap';

export default function ModalEditProject(props) {

    const [invalid, setInvalid] = useState(false);
    const [title, setTitle] = useState(props.project.title || null);

    useEffect(() => {
        setTitle(props.project.title);
    }, [props.project]);

    const editProject = () => {
        if(!title) {
            setInvalid(true);
            return;
        }

        setInvalid(false);
        props.handlerUpdateProject(props.project._id, title);
        props.handleClose();
    }

    return (
        <>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Body>
                    <Form style={{ width: '100%', padding: '20px' }} id="formEdit">
                        {
                            invalid && (
                                <p className="alert alert-danger">please fill in all required fields.</p>
                            )
                        }
                        <Form.Group controlId="editModel">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Title"
                                id="editTitle"
                                value={title}
                                onChange={(e) => setTitle(e.target.value )}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                    <Button 
                        variant="primary"
                        onClick={() => editProject()}
                    >
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

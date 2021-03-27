import React, { useEffect, useState } from 'react';
import {  Button, Form,  Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'
import http from '../utils/http'

export default function ModalAddTask(props) {

    const history = useHistory();
    const [task, setTask] = useState(props.task || {});
    const [invalid, setInvalid] = useState(false);

    useEffect(() => {
        props.task ? setTask(props.task): setTask({});
        
      }, [props.task]);

    return (
        <>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Body>
                    <Form style={{ width: '100%', padding: '20px' }}>
                        {
                            invalid && (
                                <p className="alert alert-danger">please fill in all required fields.</p>
                            )
                        }
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Title"
                                value={task.title}
                                // onChange={(e) => setForm({ ...form, email: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Date Start</Form.Label>
                            <Form.Control type="date" />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Date End</Form.Label>
                            <Form.Control type="date" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={props.handleClose}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

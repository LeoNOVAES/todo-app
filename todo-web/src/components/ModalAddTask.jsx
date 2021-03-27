import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import moment from "moment";

export default function ModalAddTask(props) {

    const [task, setTask] = useState(props.task || {});
    const [invalid, setInvalid] = useState(false);

    useEffect(() => {
        if(props.task)
            setTask(props.task);
    }, [props.task])

    const createOrUpdateTask = () => {

        if(!task.start || !task.end || !task.description || !task.title) {
            setInvalid(true);
            return;
        }

        task._id ? props.handlerUpdateTask(task) : props.handlerCreateTask(task);
        setTask({});
        setInvalid(false);
        props.handleClose();
    }

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
                                onChange={(e) => setTask({ ...task, title: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group controlId="edit">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={task.description}
                                onChange={(e) => setTask({ ...task, description: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="edit">
                            <Form.Label>Date Start</Form.Label>
                            <Form.Control
                                type="date"
                                value={task.start ? moment(task.start).format('YYYY-MM-DD') : null}
                                onChange={(e) => setTask({ ...task, start: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="edit">
                            <Form.Label>Date End</Form.Label>
                            <Form.Control
                                type="date"
                                value={task.end ? moment(task.end).format('YYYY-MM-DD') : null}
                                onChange={(e) => setTask({ ...task, end: moment(e.target.value) })}
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
                        onClick={() => createOrUpdateTask()}
                        disabled={!task.start || !task.end || !task.description || !task.title}
                    >
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

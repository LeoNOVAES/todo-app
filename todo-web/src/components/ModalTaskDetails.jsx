import React, { useEffect, useState } from 'react';
import { Button, Modal, ListGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';
import formatterEl from '../utils/elipsis';
import moment from "moment";

export default function ModalTaskDetails(props) {

    const [task, setTask] = useState(props.task || {});

    useEffect(() => {
        if (props.task)
            setTask(props.task);
    }, [props.task])

    return (
        <>
            <Modal show={props.show} onHide={() => props.handleClose(props.setShow)}>
                <Modal.Body>
                    <ListGroup>
                        <ListGroup.Item style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span className="ml-4"><b>Title:</b></span>
                            <OverlayTrigger
                                key={task.title}
                                placement={'left'}
                                overlay={
                                    <Tooltip id={`tooltip-${task.title}`}>
                                        {task.title}
                                    </Tooltip>
                                }
                            >
                                <span className="mr-4"> {formatterEl(task.title, 25)}</span>
                            </OverlayTrigger>
                        </ListGroup.Item>
                        <ListGroup.Item style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span className="ml-4"><b>Description:</b></span>
                            <OverlayTrigger
                                key={task.description}
                                placement={'left'}
                                overlay={
                                    <Tooltip id={`tooltip-${task.description}`}>
                                        {task.description}
                                    </Tooltip>
                                }
                            >
                            <span className="mr-4"> {formatterEl(task.description, 25)}</span>
                            </OverlayTrigger>
                        </ListGroup.Item>
                        <ListGroup.Item style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span className="ml-4"><b>Status:</b></span>
                            <span className="mr-4"> {task.done ? 'Done' : 'Not Done'}</span>
                        </ListGroup.Item>
                        <ListGroup.Item style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span className="ml-4"><b>Start:</b></span>
                            <span className="mr-4"> {moment(task.start).format('YYYY/MM/DD')}</span>
                        </ListGroup.Item>
                        <ListGroup.Item style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span className="ml-4"><b>End:</b></span>
                            <span className="mr-4"> {moment(task.end).format('YYYY/MM/DD')}</span>
                        </ListGroup.Item>
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => props.handleClose(props.setShow)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

import React, { useState } from 'react';
import { Card, Button, Form, Jumbotron, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'
import http from '../utils/http'
import { Create, DeleteForever } from '@material-ui/icons';
import ModalAddTask from './ModalAddTask';
import moment from 'moment';

export default function Task(props) {

    const history = useHistory();
    const [projectName, setProjectName] = useState(null);
    const [currentTask, setCurrentTask] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handlerCreateTask = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <div className="card bg-dark" style={{ width: '20rem' }}>
                <div className="card-header text-white d-flex justify-content-between">
                    <p className="m-0">{props.project.title}</p>
                    <div>
                        <Create
                            style={{ fontSize: '14pt', cursor: 'pointer' }}
                            onClick={() => {
                                props.showModalProject();
                                props.setCurrentProject(props.project);
                            }}
                        />
                        <DeleteForever
                            style={{ fontSize: '14pt', cursor: 'pointer' }}
                        />
                    </div>
                </div>
                <ul className="list-group list-group-flush">
                    {
                        props.tasks.map((task) => (
                            <OverlayTrigger
                                key={task.start}
                                placement={'top'}
                                overlay={
                                    <Tooltip id={`tooltip-${task._id}`}>
                                    Begin 
                                        <strong> {moment(task.start).format('YYYY-MM-DD')} </strong> 
                                    and finish in 
                                        <strong> {moment(task.end).format('YYYY-MM-DD')} </strong>.
                                </Tooltip>
                                }
                            >
                            <li className="list-group-item d-flex justify-content-between" key={task._id}>
                                <div className="ml-2">
                                    <input type="checkbox" className="form-check-input" id={task._id} />
                                    <label
                                        for={task._id}
                                        style={{ fontSize: '8pt', margin: 0 }}
                                    >
                                        {task.title}
                                    </label>
                                </div>
                                <div>
                                    <Create
                                        style={{ fontSize: '14pt', cursor: 'pointer' }}
                                        onClick={() => {
                                            handleShow();
                                            setCurrentTask(task);
                                        }}
                                    />
                                    <DeleteForever
                                        style={{ fontSize: '14pt', cursor: 'pointer' }}
                                    />
                                </div>
                            </li>
                            </OverlayTrigger>
                        ))
                    }
                    <li className="list-group-item d-flex justify-content-start bg-secondary text-white">
                        <div className="ml-2">
                            <p className="m-0">Done</p>
                        </div>
                    </li>
                    {
                        props.tasks.map((task) => (
                            <OverlayTrigger
                                key={task.start}
                                placement={'top'}
                                overlay={
                                <Tooltip id={`tooltip-${task._id}`}>
                                    Begin 
                                        <strong> {moment(task.start).format('YYYY-MM-DD')} </strong> 
                                    and finish in 
                                        <strong> {moment(task.end).format('YYYY-MM-DD')} </strong>.
                                </Tooltip>
                                }
                            >
                            <li className="list-group-item d-flex justify-content-start" key={task._id}>
                                <div className="ml-2">
                                    <input type="checkbox" className="form-check-input" id={task._id} checked />
                                    <label
                                        for={task._id}
                                        style={{ fontSize: '8pt', margin: 0 }}
                                    >
                                        {task.title}
                                    </label>
                                </div>
                            </li>
                            </OverlayTrigger>
                        ))
                    }
                    <li className="list-group-item">
                        <button 
                            className="btn btn-success" 
                            style={{ width: '100%' }} 
                            onClick={() => {
                                handleShow();
                                setCurrentTask(null);
                            }}
                        >
                            add a new task
                        </button>
                    </li>
                </ul>
            </div>
            <ModalAddTask
                handleClose={handleClose}
                show={show}
                task={currentTask}
            />
        </>
    );
}

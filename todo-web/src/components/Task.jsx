import React, { useEffect, useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import http from '../utils/http'
import { Create, DeleteForever, OpenInNew } from '@material-ui/icons';
import ModalAddTask from './ModalAddTask';
import ModalTaskDetails from './ModalTaskDetails';
import moment from 'moment';
import formatterEl from '../utils/elipsis';
import swal from 'sweetalert';

export default function Task(props) {

    const [currentTask, setCurrentTask] = useState(false);
    const [tasksDone, setTasksDone] = useState([]);
    const [tasksNotDone, setTasksNotDone] = useState([]);
    const [show, setShow] = useState(false);
    const [showDetails, setShowDetails] = useState(false);


    const handleClose = (modal) => {
        modal(false)
        setCurrentTask({})
    };

    const handleShow = (modal) => modal(true);

    useEffect(() => {
        getTasks();
    }, []);

    const getTasks = () => {
        http.get(`/tasks/${props.project._id}`).then((res) => {
            setTasksDone(res.data.tasksDone);
            setTasksNotDone(res.data.tasksNotDone);
        })
            .catch(() => {
                swal("Error!", "Error saving task! :(", "error");
            });
    }

    const checkTask = (task) => {
        task.done = !task.done;
        http.put(`/task/${task._id}`, task).then((res) => {
            if (task.done) {
                tasksDone.push(res.data.task);
                setTasksNotDone(tasksNotDone.filter((t) => t._id !== task._id));
            }
        })
            .catch(() => {
                swal("Error!", "Error updating task! :(", "error");
            });
    }

    const handlerCreateTask = (newTask) => {

        if (moment(newTask.start) > moment(newTask.end)) {
            swal("Error!", "Invalid Date!", "error");
            return;
        }

        newTask.project = props.project._id;
        newTask.done = false;
        http.post('/task', newTask).then((res) => {
            setTasksNotDone([...tasksNotDone, res.data.task]);
        })
            .catch((e) => {
                if (e.response.status === 409) {
                    swal("Error!", "Task already exists!", "error");
                } else {
                    swal("Error!", "Error saving task! :(", "error");
                }
            });
    }

    const handlerUpdateTask = (task) => {
        http.put(`/task/${task._id}`, task).then((res) => {
            setTasksNotDone(tasksNotDone.map((t) => {
                if (t._id === res.data.task._id) {
                    t = res.data.task;
                }

                return t;
            }));
        })
            .catch(() => {
                swal("Error!", "Error updating task! :(", "error");
            });
    }

    const deleteTask = (id) => {
        http.delete(`/task/${id}`).then((res) => {
            setTasksNotDone(tasksNotDone.filter((t) => t._id !== id));
        })
            .catch(() => {
                swal("Error!", "Error saving task! :(", "error");
            });
    }

    const confirmDelete = (id, handlerFunction) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this project!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    handlerFunction(id)
                }
            });
    }

    return (
        <>
            <div className="card bg-dark" style={{ width: '20rem' }}>
                <div className="card-header text-white d-flex justify-content-between">
                    <OverlayTrigger
                        key={props.project.title}
                        placement={'top'}
                        overlay={
                            <Tooltip id={`tooltip-${props.project.title}`}>
                                {props.project.title}
                            </Tooltip>
                        }
                    >
                        <p className="m-0">{formatterEl(props.project.title, 25)}</p>
                    </OverlayTrigger>
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
                            onClick={() => confirmDelete(props.project._id, props.handlerDeleteProject)}
                        />
                    </div>
                </div>
                <ul className="list-group list-group-flush">
                    {
                        (tasksNotDone && tasksNotDone.length) ? (
                            tasksNotDone.map((task) => (
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
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id={task._id}
                                                onChange={() => checkTask(task)}
                                            />
                                            <label
                                                for={task._id}
                                                style={{ fontSize: '8pt', margin: 0 }}
                                            >
                                                {formatterEl(task.title, 25)}
                                            </label>
                                        </div>
                                        <div>
                                            <Create
                                                style={{ fontSize: '14pt', cursor: 'pointer' }}
                                                onClick={() => {
                                                    handleShow(setShow);
                                                    setCurrentTask(task);
                                                }}
                                            />
                                            <DeleteForever
                                                style={{ fontSize: '14pt', cursor: 'pointer' }}
                                                onClick={() => confirmDelete(task._id, deleteTask)}
                                            />
                                            <OpenInNew
                                                style={{ fontSize: '14pt', cursor: 'pointer' }}
                                                onClick={() => {
                                                    handleShow(setShowDetails);
                                                    setCurrentTask(task);
                                                }}
                                            />
                                        </div>
                                    </li>
                                </OverlayTrigger>
                            ))
                        )
                            :
                            (
                                <li className="list-group-item d-flex justify-content-between">empty!</li>
                            )
                    }
                    <li className="list-group-item d-flex justify-content-start bg-secondary text-white">
                        <div className="ml-2">
                            <p className="m-0">Done</p>
                        </div>
                    </li>
                    {
                        (tasksDone && tasksDone.length) ? (
                            tasksDone.map((task) => (
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
                                            <input type="checkbox" className="form-check-input" id={task._id} checked />
                                            <label
                                                for={task._id}
                                                style={{ fontSize: '8pt', margin: 0 }}
                                            >
                                                {task.title}
                                            </label>
                                        </div>
                                        <div>
                                            <OpenInNew
                                                style={{ fontSize: '14pt', cursor: 'pointer' }}
                                                onClick={() => {
                                                    handleShow(setShowDetails);
                                                    setCurrentTask(task);
                                                }}
                                            />
                                        </div>
                                    </li>
                                </OverlayTrigger>
                            ))
                        )
                            :
                            (
                                <li className="list-group-item d-flex justify-content-between">empty!</li>
                            )

                    }
                    <li className="list-group-item">
                        <button
                            className="btn btn-success"
                            style={{ width: '100%' }}
                            onClick={() => {
                                setCurrentTask({});
                                handleShow(setShow);
                            }}
                        >
                            add a new task
                        </button>
                    </li>
                </ul>
            </div>
            <ModalAddTask
                handleClose={handleClose}
                setShow={setShow}
                show={show}
                task={currentTask}
                handlerCreateTask={handlerCreateTask}
                handlerUpdateTask={handlerUpdateTask}
            />

            <ModalTaskDetails
                handleClose={handleClose}
                setShow={setShowDetails}
                show={showDetails}
                task={currentTask}
            />
        </>
    );
}

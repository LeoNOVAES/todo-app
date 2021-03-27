import React, { useEffect, useState } from 'react';
import { Card, Button, Form, Jumbotron } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'
import Menu from './Menu';
import http from '../utils/http'
import Task from './Task';
import ModalEditProject from './ModalEditProject';


export default function Project() {

    const [project, setProject] = useState({});
    const [invalid, setInvalid] = useState(false);
    const [projects, setProjects] = useState([]);
    const [currentProject, setCurrentProject] = useState(false);
    const [show, setShow] = useState(false);

    useEffect(() => {
        getProjects();
    }, []);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getProjects = () => {
        http.get('/projects').then((res) => {
            setProjects(res.data.projects);
        })
        .catch(() => {

        })
    }

    const handlerCreateProject = (e) => {
        http.post('/project', project).then((res) => {
            projects.push(res.data.project);
        })
        .catch(() => {

        })
    }

    return (
        <>
            <Jumbotron className="container d-flex justify-content-center">
                <Form style={{ width: '40rem', padding: '20px' }}>
                    {
                        invalid && (
                            <p className="alert alert-danger">please fill in all required fields.</p>
                        )
                    }
                    <Form.Group controlId="formBasicEmail">
                        <h2>Create a new project</h2>
                        <Form.Control
                            type="text"
                            placeholder="Name"
                            onChange={(e) => setProject({title:e.target.value})}
                        />
                    </Form.Group>
                    <div class="d-flex justify-content-end">
                        <Button variant="primary" onClick={(e) => handlerCreateProject(e)}>Save</Button>
                    </div>
                </Form>
            </Jumbotron>
            <div className="container">
                <div className="row ml-3">
                    {
                        projects.map((project) => (
                            <div key={project._id} className="col-md-4">
                                <Task 
                                    project={project}
                                    tasks={project.tasks}
                                    setCurrentProject={setCurrentProject}
                                    showModalProject={handleShow}
                                />
                            </div>
                        ))
                    }
                </div>
            </div>
            <ModalEditProject
                project={currentProject}
                show={show}
                handleClose={handleClose}
            />
        </>
    );
}

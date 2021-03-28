import React, { useEffect, useState } from 'react';
import { Button, Form, Jumbotron } from 'react-bootstrap';
import http from '../utils/http'
import Task from './Task';
import ModalEditProject from './ModalEditProject';
import swal from 'sweetalert';
import ClipLoader from "react-spinners/ClipLoader";


export default function Project() {

    const [project, setProject] = useState({});
    const [invalid, setInvalid] = useState(false);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
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
                swal("Error!", "Unknown Error! :(", "error");
            });
    }

    const handlerCreateProject = () => {
        setLoading(true);
        http.post('/project', project).then((res) => {
            setProjects([...projects, res.data.project]);
            setProject({ title: '' });
            setLoading(false);
        })
            .catch((e) => {
                setLoading(false);
                
                if (e.response.status === 409) {
                    swal("Error!", "Project already exists!", "error");
                } else {
                    swal("Error!", "Error saving project! :(", "error");
                }
            });
    }

    const handlerUpdateProject = (id, title) => {
        console.log('data -> ', id)
        const body = {
            title,
            tasks: []
        }

        http.put(`/project/${id}`, body).then((res) => {
            getProjects();
        })
            .catch(() => {
                swal("Error!", "Error updating project! :(", "error");
            });
    }

    const handlerDeleteProject = (id) => {
        http.delete(`/project/${id}`).then((res) => {
            console.log('resz-.', res)
            setProjects(projects.filter((p) => p._id !== id));
        })
            .catch(() => {
                swal("Error!", "Error deleting project! :(", "error");
            });
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
                            value={project.title}
                            onChange={(e) => setProject({ title: e.target.value })}
                        />
                    </Form.Group>
                    <div className="d-flex justify-content-end">
                        <Button
                            variant="primary"
                            onClick={(e) => handlerCreateProject(e)}
                            disabled={!project.title}
                        >
                            {
                                loading ?
                                    <ClipLoader color={'white'} size={10} />
                                    :
                                    <span>Save</span>
                            }
                        </Button>
                    </div>
                </Form>
            </Jumbotron>
            <div className="container">
                <div className="row ml-3">
                    {
                        projects.map((project) => (
                            <div key={project._id} className="col-md-4 mt-3 mb-5">
                                <Task
                                    project={project}
                                    setCurrentProject={setCurrentProject}
                                    showModalProject={handleShow}
                                    handlerDeleteProject={handlerDeleteProject}
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
                setProject={setProject}
                handlerUpdateProject={handlerUpdateProject}
            />
        </>
    );
}

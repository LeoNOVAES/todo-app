import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'
import http from '../utils/http'
import swal from 'sweetalert';

export default function Login() {

    const history = useHistory();
    const [form, setForm] = useState({ email: '', password: '', name:'' });
    const [screen, setScreen] = useState('login');
    const [invalid, setInvalid] = useState(false);

    const registerUser = (e) => {
        e.preventDefault();
        if (!form.email || !form.password || !form.name) {
            setInvalid(true);
        }

        http.post('/user', form).then((res) => {
            login(e);
        })
        .catch(() => {
            swal("Error!", "User already exists!", "error");
        })
    }

    const login = (e) => {
        e.preventDefault();
        if (!form.email || !form.password) {
            setInvalid(true);
            return;
        }

        http.post('/auth', form).then((res) => {
            localStorage.setItem('token_todo', res.data.token);
            localStorage.setItem('username', res.data.user.name);
            history.push('/');
        })
        .catch(() => {
            swal("Error!", "Wrong email or password!", "error");
        })
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card style={{ width: '40rem' }}>
                <Card.Header className="bg bg-secondary text-white">Welcome TODO-LIST</Card.Header>
                <Form style={{ width: '40rem', padding: '20px' }} onSubmit={(e) => login(e)}>
                    {
                        invalid && (
                            <p className="alert alert-danger">please fill in all required fields.</p>
                        )
                    }
                    {
                        screen !== 'login' && (
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Name"
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                />
                            </Form.Group>
                        )
                    }

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                        />
                    </Form.Group>


                    {
                        screen !== 'login' ?
                            (
                                <div className="d-flex justify-content-between">
                                    <Button variant="link" onClick={()=> setScreen('login')}>back to login, click here</Button>
                                    <Button variant="primary" onClick={(e) => registerUser(e)}>Save</Button>
                                </div>
                            )
                            :
                            (
                                <div className="d-flex justify-content-between">
                                    <Button variant="link" onClick={()=> setScreen('register')}>Don't have a registration yet? Click here</Button>
                                    <Button 
                                        variant="primary" 
                                        onClick={(e) => login(e)}
                                        disabled={!form.email || !form.password}
                                        >
                                            Log In
                                    </Button>
                                </div>
                            )
                    }
                </Form>
            </Card>
        </div>
    );
}

import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'
import http from '../utils/http'


export default function Login() {

    const history = useHistory();
    const [form, setForm] = useState({ email: '', password: '' });
    const [invalid, setInvalid] = useState(false);

    const login = (e) => {
        e.preventDefault();
        if (!form.email || !form.password) {
            setInvalid(true);
        }

        http.post('/auth', form).then((res) => {
            localStorage.setItem('token_todo', res.data.token);
            history.push('/');
        })
        .catch(() => {
            alert("errou");
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
                    <div className="d-flex justify-content-end">
                        <Button variant="primary" type="submit">Log In</Button>
                    </div>
                </Form>
            </Card>
        </div>
    );
}

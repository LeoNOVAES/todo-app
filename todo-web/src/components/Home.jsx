import React, { useState } from 'react';
import { Card, Button, Form, Jumbotron } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'
import Menu from './Menu';
import ProjectForm from './Project';
import http from '../utils/http'


export default function Home() {

    const history = useHistory();
    const [invalid, setInvalid] = useState(false);

    const handlerCreateProject = (e) => {

    }

    return (
        <>
            <Menu />
            <div>
                <ProjectForm/>
            </div>
        </>
    );
}

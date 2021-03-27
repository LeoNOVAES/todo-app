import React from 'react';
import { Navbar, Dropdown } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'

export default function Menu() {

    const history = useHistory();

    const logout = () => {
        localStorage.clear();
        history.push('/');
    }

    return (
        <>
            <Navbar bg="dark" variant="dark" className="d-flex justify-content-between">
                <Navbar.Brand href="#home">
                    TODO List
                </Navbar.Brand>
                <Dropdown
                    className="mr-2"
                    drop={'down'}
                >
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        { localStorage.getItem('username') }
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={()=>logout()}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Navbar>
        </>
    );
}


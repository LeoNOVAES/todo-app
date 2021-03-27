import React, { useState } from 'react';
import { Card, Button, Form, Navbar } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'

export default function Menu() {

    const history = useHistory();

    const logout = (e) => {

    }

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">
                    {/* <img
                        alt=""
                        src="/logo.svg"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '} */}
                TODO List
                </Navbar.Brand>
            </Navbar>
        </>
    );
}


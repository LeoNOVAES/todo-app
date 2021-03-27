import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import Menu from './Menu';
import ProjectForm from './Project';

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

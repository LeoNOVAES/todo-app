import React from 'react';
import Menu from './Menu';
import ProjectForm from './Project';

export default function Home() {
    return (
        <>
            <Menu />
            <div>
                <ProjectForm/>
            </div>
        </>
    );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css'; // Importa o arquivo CSS

const Header = () => {
    const brandName = 'Você é um campeão na Central Sports';
    return (
        <Navbar expand="xl" className="navbar-custom">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
                <Navbar.Brand as={Link} to="/">
                    {brandName.split('').map((letter, index) => (
                        <span key={index}>{letter === ' ' ? '\u00A0' : letter}</span>
                    ))}
                </Navbar.Brand>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;

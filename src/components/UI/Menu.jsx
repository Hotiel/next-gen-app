import { useState } from "react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useOutsideClick } from '../../../public/data/utils/useOutsideClick.js'
import { useAuth } from "../utils/AuthContext.jsx";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LoginModal } from "./LoginModal.jsx";


export function Menu ({ setLoginModal }) {

    const location =  useLocation(); 
    const [expanded, setExpanded] = useState(false);
    const closeNav = () => setExpanded(false);
    const handleToggle = () => setExpanded(prevExpanded => !prevExpanded);;
    const navRef = useOutsideClick(closeNav);
    const { user } = useAuth();

    useEffect (() => {setExpanded(false)},[location]);

    const logout = async () => {
        await fetch(`${import.meta.env.VITE_API_URL}api/logout`, {
            method: "POST",
            credentials: "include"
        });
        // navigate("/");
            window.location.reload();
    };


    return (
        <Navbar ref={navRef} expand="lg" bg="dark" data-bs-theme="dark" sticky="top" className="align-top p-0 nav-exp" expanded={expanded} onToggle={handleToggle}>
            <Container className="navcont py-0 my-0 align-top">
                
                <Navbar.Brand href="/">
                <div className="navlogo-wrapper">
                    <img
                        src="/logopng.png"
                        alt="Home"
                        className="navlogo d-inline-block m-0 p-0"
                    />
                </div>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mobilenav rounded-2 p-2 m-0 gap-3 bg-dark">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/Table">Tabla</Nav.Link>
                        <Nav.Link as={Link} to="/Feed">Feed</Nav.Link>
                        <Nav.Link as={Link} to="/Fixture">Fixture</Nav.Link>
                        {user ? <Nav.Link as={Link} to="/Profile" className="nav-profile-button">Profile</Nav.Link> : ""}

                        <div className="login-logout">
                        {!user ? <button className="login-navbutton" onClick={() => {setLoginModal(prevLoginModal => !prevLoginModal), setExpanded(false)}}>Iniciar Sesión</button> : ""}
                        {user ? <button className="login-navbutton" onClick={logout}>Cerrar sesión</button> : ""}
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
import React, { useState } from "react";
import { useContext } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { DataContext } from "../contexts/DataContext";

export const NavbarComp = () => {
    const [search, setSearch] = useState("");

    const { getData } = useContext(DataContext);

    const getNews = async () => {
        let fetched = await fetch(
            `https://newsapi.org/v2/top-headlines?country=us`,
            {
                method: "GET",
                headers: {
                    Authorization: "Bearer 647f413c5b684642a1e520134c558037",
                },
            }
        );

        let data = await fetched.json();
        getData(data.articles);
    };

    const handleClick = async () => {
        let fetched = await fetch(
            `https://newsapi.org/v2/everything?q=${search}`,
            {
                method: "GET",
                headers: {
                    Authorization: "Bearer 647f413c5b684642a1e520134c558037",
                },
            }
        );

        let data = await fetched.json();
        getData(data.articles);
    };

    const handleChange = (e) => {
        const text = e.target.value;
        setSearch(text);
    };

    return (
        <Navbar bg="light" fixed="top" expand="lg">
            <Container fluid>
                <Navbar.Brand className="navbar-title">World News</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: "100px" }}
                        navbarScroll
                    >
                        <Nav.Link className="headlines-text" onClick={getNews}>
                            Top Headlines
                        </Nav.Link>
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            style={{ width: "300px" }}
                            onChange={handleChange}
                            type="search"
                            placeholder="Search"
                            className="me-4"
                            aria-label="Search"
                        />
                        <Button onClick={handleClick} variant="primary">
                            Search
                        </Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavbarComp;

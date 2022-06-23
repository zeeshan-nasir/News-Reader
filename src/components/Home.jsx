import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { useEffect } from "react";
import { useState } from "react";
import { DataContext } from "../contexts/DataContext";
import { useSearchParams } from "react-router-dom";

const Home = () => {
    const [category, setCategory] = useState("");
    const [country, setCountry] = useState("us");
    const [searchParams, setSearchParams] = useSearchParams();

    const categories = [
        "Business",
        "Entertainment",
        "General",
        "Health",
        "Science",
        "Sports",
        "Technology",
    ];

    const countries = [
        ["ar", "Argentina"],
        ["at", "Austria"],
        ["cu", "Cuba"],
        ["fr", "France"],
        ["nz", "New Zealand"],
        ["ro", "Romania"],
        ["in", "India"],
    ];

    const { getData, news } = useContext(DataContext);

    useEffect(() => {
        const getNews = async () => {
            let fetched = await fetch(
                `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}`,
                {
                    method: "GET",
                    headers: {
                        Authorization:
                            "Bearer 647f413c5b684642a1e520134c558037",
                    },
                }
            );

            let data = await fetched.json();
            getData(data.articles);

            setSearchParams({ country: country, category: category });
        };

        getNews();
    }, [category, country]);

    const handleChange = (e) => {
        const data = e.target.value;
        setCountry(data);
    };

    return (
        <div className="home-div">
            <div className="home-sidebar">
                <div className="sidebar-categories">
                    <p>Category:</p>
                    <div>
                        {categories.map((e) => {
                            return (
                                <p
                                    className="category-items"
                                    style={{ fontSize: "15px" }}
                                    key={e}
                                    onClick={() => {
                                        setCategory(e);
                                    }}
                                >
                                    {e}
                                </p>
                            );
                        })}
                    </div>
                    <p style={{ marginTop: "40px" }}>Country:</p>
                    <div>
                        <Form.Select
                            className="sidebar-country"
                            onChange={handleChange}
                            aria-label="Default select example"
                        >
                            <option>Select</option>
                            {countries.map((e, i) => {
                                return (
                                    <option key={i} value={e[0]}>
                                        {e[1]}
                                    </option>
                                );
                            })}
                        </Form.Select>
                    </div>
                </div>
            </div>
            <div className="home-newsfeed">
                {news.map((e, i) => {
                    return (
                        <Card
                            onClick={() => window.open(e.url, "_blank")}
                            key={i}
                            className="home-card"
                        >
                            <Card.Img
                                variant="top"
                                src={e.urlToImage}
                                style={{
                                    maxHeight: "220px",
                                    minHeight: "220px",
                                }}
                            />
                            <Card.Body className="home-card-body">
                                <Card.Text>Author: {e.author}</Card.Text>
                                <Card.Text>Source: {e.source.name}</Card.Text>
                            </Card.Body>
                            <Card.Body>
                                <Card.Title
                                    style={{
                                        minHeight: "70px",
                                    }}
                                >
                                    {e.title}
                                </Card.Title>
                                <Card.Text
                                    style={{
                                        minHeight: "100px",
                                    }}
                                >
                                    {e.description}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};

export default Home;

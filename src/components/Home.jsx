import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import { useEffect } from "react";
import { useState } from "react";
import { DataContext } from "../contexts/DataContext";

const Home = () => {
    const [category, setCategory] = useState("");

    const categories = [
        "Business",
        "Entertainment",
        "General",
        "Health",
        "Science",
        "Sports",
        "Technology",
    ];

    const { getData, news } = useContext(DataContext);

    useEffect(() => {
        const getNews = async () => {
            let fetched = await fetch(
                `https://newsapi.org/v2/top-headlines?country=us&category=${category}`,
                {
                    method: "GET",
                    headers: {
                        Authorization:
                            "Bearer a232ce819fcd4f47abd564b9762ecd9b",
                    },
                }
            );

            let data = await fetched.json();
            getData(data.articles);
        };

        getNews();
    }, [category]);

    return (
        <div className="home-div">
            <div className="home-sidebar">
                <div className="sidebar-categories">
                    <p>Categories:</p>
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

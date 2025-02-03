import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewsCard from '../components/NewsCard'; // Import NewsCard component
import { FaSpinner } from 'react-icons/fa'; // For the loading spinner icon
import { FaNewspaper } from 'react-icons/fa';
import API_ENDPOINTS from '../api';

const Home = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch news from the backend
    const fetchNews = async () => {
        setLoading(true);
        try {
            const response = await axios.get(API_ENDPOINTS.NEWS);
            setNews(response.data.articles || response.data);
        } catch (error) {
            console.error('Error fetching news:', error);
        } finally {
            setLoading(false);
        }
    };

    // Handle bookmarking a news article
    const handleBookmark = async (article) => {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("Please log in to save this for later.");
            return;
        }
        console.log("Article object:", article);
        console.log("Article URL:", article.url); 

        try {
            const res = await fetch("http://localhost:8080/api/bookmarks/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ url: article.url }), // Assuming title as the unique ID
            });

            const data = await res.json();
            if (res.ok) {
                alert("News Bookmarked! 📌");
            } else {
                console.log("Error Data:", data);
                alert(data.message);
            }
        } catch (err) {
            alert("Something went wrong.");
            console.error("Error while bookmarking:", err); 
        }
    };

    useEffect(() => {
        fetchNews(); // Fetch news on component mount
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
                    <FaNewspaper className="inline-block text-red-600 mr-2 animate-bounce" /> Latest News
                </h1>
            </div>

            {/* Loading spinner */}
            {loading ? (
                <div className="flex justify-center items-center">
                    <FaSpinner className="animate-spin text-4xl text-gray-600" />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {/* Map through the news and pass each article to NewsCard */}
                    {news.map((article, index) => (
                        <NewsCard key={index} article={article} onBookmark={handleBookmark} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;

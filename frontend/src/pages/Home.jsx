import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewsCard from '../components/NewsCard'; // Import NewsCard component
import { FaSpinner } from 'react-icons/fa'; // For the loading spinner icon
import { IoNewspaperOutline } from 'react-icons/io5'; // Newspaper icon
import { FaNewspaper } from 'react-icons/fa';

const Home = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state to manage the spinner

    const fetchNews = async () => {
        setLoading(true); // Set loading to true when fetching starts
        try {
            const response = await axios.get("http://localhost:8080/api/news");
            const data = response.data; // Axios automatically parses the JSON response

            const newsArticles = data.articles || data;

            setNews(newsArticles); // Update state with news articles
        } catch (error) {
            console.error('Error fetching news:', error);
        } finally {
            setLoading(false); // Set loading to false when the request is done
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
                    {/* Map through the news and pass each article to the NewsCard component */}
                    {news.map((article, index) => (
                        <NewsCard key={index} article={article} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSpinner, FaNewspaper } from "react-icons/fa";
import { MdOutlineSportsSoccer } from "react-icons/md";
import { GrTechnology } from "react-icons/gr";
import { MdOutlineScience } from "react-icons/md";
import { GiHealthNormal } from "react-icons/gi";
import { GiPopcorn, GiBriefcase } from "react-icons/gi";
import NewsCard from "../components/NewsCard";  // Import the NewsCard component
import API_ENDPOINTS from "../api";

const Categories = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("general");

  const categories = [
    { name: "general", icon: <FaNewspaper /> },
    { name: "business", icon: <GiBriefcase /> },
    { name: "entertainment", icon: <GiPopcorn /> },
    { name: "health", icon: <GiHealthNormal /> },
    { name: "science", icon: <MdOutlineScience /> },
    { name: "sports", icon: <MdOutlineSportsSoccer /> },
    { name: "technology", icon: <GrTechnology /> },
  ];

  const fetchNews = async (category) => {
    setLoading(true);
    setError("");
    setSelectedCategory(category);
    try {
     
      const response = await axios.get(API_ENDPOINTS.NEWS, {
        params: { category },
      });
      setArticles(response.data);
    } catch (err) {
      console.error("Error fetching news:", err.message);
      setError("Failed to load news. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const handleBookmark = async (article) => {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("Please log in to save this for later.");
        return;
    }

    try {
        const res = await fetch("http://localhost:8080/api/bookmarks/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ newsId: article.title }), // Assuming title as the unique ID
        });

        const data = await res.json();
        if (res.ok) {
            alert("News Bookmarked! 📌");
        } else {
            alert(data.message);
        }
    } catch (err) {
        alert("Something went wrong.");
    }
};

  useEffect(() => {
    fetchNews("general");
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
        <FaNewspaper className="inline-block text-red-600 mr-2 animate-bounce" />{" "}
        News Categories
      </h1>
      <div className="flex justify-center flex-wrap gap-4 mb-8">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => fetchNews(category.name)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow transition-all duration-200 ${
              selectedCategory === category.name
                ? "bg-red-600 text-white"
                : "bg-white text-gray-800 hover:bg-red-100 hover:text-red-600"
            }`}
          >
            {category.icon}
            {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center items-center">
          <FaSpinner className="text-red-600 animate-spin text-4xl" />
        </div>
      ) : error ? (
        <p className="text-center text-red-500 text-xl">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <NewsCard key={index} article={article} onReadMore={() => window.open(article.url, "_blank")} onBookmark={handleBookmark} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;

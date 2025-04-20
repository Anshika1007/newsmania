import React, { useState, useEffect } from "react";
import axios from "axios";
import LanguageIcon from "@mui/icons-material/Language"; // General world icon
import FlagIcon from "@mui/icons-material/Flag"; // General flag
import TempleBuddhistIcon from "@mui/icons-material/TempleBuddhist"; // Buddhist Temple (Japan)
import TempleHinduIcon from "@mui/icons-material/TempleHindu"; // Hindu Temple (India)
import TowerIcon from "@mui/icons-material/Tour"; // Eiffel Tower (France)
import BusinessIcon from "@mui/icons-material/Business"; // Brandenburg Gate (Germany)
import {  FaNewspaper } from "react-icons/fa";
import API_ENDPOINTS from "../api";
const countryOptions = [
  { value: "in", label: "India", icon: <TempleHinduIcon /> },  
  { value: "us", label: "USA", icon: <FlagIcon /> },        
  { value: "gb", label: "UK", icon: <LanguageIcon /> },        
  { value: "fr", label: "France", icon: <TowerIcon /> },    
  { value: "de", label: "Germany", icon: <BusinessIcon /> }, 
  { value: "jp", label: "Japan", icon: <TempleBuddhistIcon /> },  
];



const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const GeoNews = () => {
  const [news, setNews] = useState([]);
  const [country, setCountry] = useState("in");
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    fetchNews(country);
  }, []);

  const fetchNews = async (selectedCountry) => {
    setLoading(true);
    try {
      const response = await axios.get(API_ENDPOINTS.NEWS_BY_COUNTRY(selectedCountry));
      setNews(response.data || []);
    } catch (error) {
      console.error("Error fetching news:", error);
      setNews([]);
    }
    setLoading(false);
  };

  return (
    <div className="mt-6 px-4">
      {/* Country Selector Buttons */}
      <h2 className="text-2xl font-bold text-center text-white">
        🌍 Select Country
      </h2>
      <div className="flex justify-center flex-wrap gap-4 mt-4">
        {countryOptions.map((c) => (
          <button
            key={c.value}
            onClick={() => {
              setCountry(c.value);
              fetchNews(c.value);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow transition-all duration-200 ${
              country === c.value
                ? "bg-red-600 text-white scale-105 shadow-lg"
                : "bg-white text-gray-800 hover:bg-red-100 hover:text-red-600"
            }`}
          >
            {c.icon}
            {c.label}
          </button>
        ))}
      </div>

      {/* News Heading */}
      <h1 className="text-3xl font-bold mt-6 text-center text-red-600">
  <FaNewspaper className="inline-block text-white mr-2 animate-bounce" /> 
  Top News from {country.toUpperCase()}
</h1>


      {/* Loading Animation */}
      {loading ? (
        <div className="flex justify-center items-center mt-6">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-500"></div>
        </div>
      ) : news.length === 0 ? (
        <p className="text-center text-gray-500 mt-6">No news available.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {news.map((article, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow flex flex-col"
            >
              {/* Image */}
              {article.image_url ? (
                <img
                  src={article.image_url}
                  alt={article.title}
                  className="w-full h-40 object-cover rounded-md"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
                  No Image Available
                </div>
              )}

              {/* Source Info */}
              <div className="flex items-center mt-3">
                {article.source_icon && (
                  <img
                    src={article.source_icon}
                    alt={article.source_name}
                    className="h-6 w-6 rounded-full mr-2"
                  />
                )}
                <span className="text-gray-600 text-sm">{article.source_name}</span>
              </div>

              {/* Title */}
              <h4 className="mt-3 font-semibold text-gray-900">{article.title}</h4>

              {/* Published Date */}
              <p className="text-gray-500 text-xs mt-1">
                🗓️ {formatDate(article.pubDate)}
              </p>

              {/* Description */}
              <p className="text-sm text-gray-700 mt-2 flex-grow">
                {expanded[index] || (article.description || "").length < 120
                  ? article.description
                  : (article.description || "").slice(0, 120) + "..."}
              </p>

              {/* Read More Toggle */}
              {article.description && article.description.length > 120 && (
                <button
                  onClick={() =>
                    setExpanded((prev) => ({
                      ...prev,
                      [index]: !prev[index],
                    }))
                  }
                  className="text-blue-500 hover:underline mt-2 text-sm"
                >
                  {expanded[index] ? "Read Less" : "Read More"}
                </button>
              )}

              {/* Category */}
              {article.category && article.category.length > 0 && (
                <p className="text-gray-500 text-xs mt-1">📌 Category: {article.category[0]}</p>
              )}

              {/* Read Full Article */}
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 bg-gray-800 text-white py-2 text-center rounded-md hover:bg-gray-700 transition-all duration-300 ease-in-out shadow-md"
              >
                Read Full Article
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GeoNews;

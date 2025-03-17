import React, { useState, useEffect } from "react";
import axios from "axios";
import NewsCard from "../components/NewsCard"; // Import the NewsCard component
import { FaSpinner, FaBookmark } from "react-icons/fa";
import API_ENDPOINTS from "../api";

const Bookmarks = () => {
    const [bookmarks, setBookmarks] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch Bookmarked News from Backend
    const fetchBookmarks = async () => {
        setLoading(true);
        const token = localStorage.getItem("token"); // Get token from localStorage

        if (!token) {
            alert("Please log in to view your bookmarks.");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get(API_ENDPOINTS.GET_BOOKMARKS, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setBookmarks(response.data || []); // Ensure it's an array
        } catch (error) {
            console.error("Error fetching bookmarks:", error);
            alert("Failed to load bookmarks.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookmarks(); // Fetch bookmarks when component mounts
    }, []);
    const handleRemoveBookmark = async (bookmarkId) => {
      const token = localStorage.getItem("token");
  
      try {
          const response = await fetch(API_ENDPOINTS.REMOVE_BOOKMARK(bookmarkId), {
              method: "DELETE",
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          });
  
          const data = await response.json();
          if (!response.ok) {
              alert(data.message);
              return;
          }
  
          alert("Bookmark Removed! 🗑️");
          setBookmarks(bookmarks.filter((b) => b._id !== bookmarkId)); // Remove from UI
      } catch (error) {
          console.error("Error removing bookmark:", error);
      }
  };
  

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-6 text-gray-800">
                    <FaBookmark className="inline-block text-red-500 mr-2 animate-bounce" />
                    My Bookmarks
                </h1>
            </div>

            {/* Show Loading Spinner */}
            {loading ? (
                <div className="flex justify-center items-center">
                    <FaSpinner className="animate-spin text-4xl text-gray-600" />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {bookmarks.length > 0 ? (
                        bookmarks.map((article, index) => (
                          <NewsCard 
    key={index} 
    article={article} 
    bookmarkedArticles={bookmarks} 
    onRemoveBookmark={handleRemoveBookmark} // ✅ Pass this function
/>

                        ))
                    ) : (
                        <p className="text-center text-gray-500 text-lg col-span-3">
                            No bookmarks saved yet! 📌
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Bookmarks;

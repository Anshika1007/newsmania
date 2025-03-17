import React, { useState, useEffect } from "react";
import { FaRegBookmark, FaBookmark } from "react-icons/fa"; // Import Bookmark Icons

const NewsCard = ({ article, onReadMore, onBookmark, onRemoveBookmark, bookmarkedArticles = [] }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Check if the article is already bookmarked (Persistent State)
  useEffect(() => {
    if (bookmarkedArticles.some((item) => item.url === article.url)) {
      setIsBookmarked(true);
    }
  }, [bookmarkedArticles, article.url]);

  // Handle Bookmark Click
  const handleBookmark = () => {
    if (isBookmarked) {
      if (onRemoveBookmark) onRemoveBookmark(article._id); // Check before calling
    } else {
      if (onBookmark) onBookmark(article); // Check before calling
    }
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-[1.02] transition-transform duration-300 hover:shadow-xl max-w-sm mx-auto relative">
      {/* Image */}
      <div className="relative group">
        <img
          src={article.urlToImage || "https://via.placeholder.com/150"}
          alt={article.title || "Image for the news article"}
          className="w-full h-40 object-cover rounded-t-lg group-hover:opacity-90 transition-opacity duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-25 transition-all duration-300"></div>

        {/* Bookmark Button */}
        <button
          onClick={handleBookmark}
          className={`absolute top-2 right-2 p-2 rounded-full shadow-md transition-transform duration-200 ${
            isBookmarked
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-white hover:bg-gray-200 text-gray-500"
          }`}
        >
          {isBookmarked ? (
            <FaBookmark className="text-lg animate-pulse" /> // Filled icon when bookmarked
          ) : (
            <FaRegBookmark className="text-lg hover:text-blue-600" /> // Outline icon
          )}
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h2
          className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2 hover:text-blue-500 transition-colors duration-200 cursor-pointer"
          title={article.title?.length > 50 ? article.title : undefined}
        >
          {article.title || "No title available"}
        </h2>

        {/* Description */}
        <p className="text-gray-700 text-sm mb-4 line-clamp-3">
          {article.description ? article.description : "No description available."}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          {/* Source */}
          <span className="text-gray-500 text-xs italic">
  {typeof article.source === "object" 
    ? article.source?.name || "Unknown Source"  // ✅ If source is an object
    : article.source || "Unknown Source"}       
</span>

          {/* Read More Link */}
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gray-800 text-white px-4 py-2 rounded-md shadow-md hover:scale-105 hover:bg-gray-700 transition-all duration-300 ease-in-out"
            onClick={onReadMore}
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;

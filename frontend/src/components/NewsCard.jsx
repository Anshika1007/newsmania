// import React from "react";

// const NewsCard = ({ article, onReadMore, onBookmark }) => {
//   return (
//     <div className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 hover:shadow-2xl max-w-sm mx-auto">
//       {/* Image */}
//       <div className="relative group">
//         <img
//           src={article.urlToImage || "https://via.placeholder.com/150"}
//           alt={article.title}
//           className="w-full h-40 object-cover rounded-t-lg group-hover:opacity-90 transition-opacity duration-300"
//         />
//         <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-25 transition-all duration-300"></div>
//       </div>

//       {/* Content */}
//       <div className="p-4">
//         {/* Title */}
//         <h2
//           className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2 hover:text-blue-500 transition-colors duration-200 cursor-pointer"
//           title={article.title.length > 50 ? article.title : undefined}
//         >
//           {article.title}
//         </h2>

//         {/* Description */}
//         <p className="text-gray-700 text-sm mb-4 line-clamp-3">
//           {article.description || "No description available."}
//         </p>

//         {/* Footer */}
//         <div className="flex items-center justify-between">
//           {/* Source */}
//           <span className="text-gray-500 text-xs italic">
//             {article.source?.name || "Unknown Source"}
//           </span>

//           {/* Read More Link */}
//           <a
//             href={article.url}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="inline-block bg-gray-800 text-white px-4 py-2 rounded-md shadow-md hover:scale-105 hover:bg-gray-700 transition-all duration-300 ease-in-out"
//             onClick={onReadMore}
//           >
//             Read More
//           </a>
//         </div>

//         {/* Bookmark Button */}
//         <button
//           onClick={() => onBookmark(article)}
//           className="mt-3 w-full bg-blue-500 text-white py-2 rounded-md shadow-md hover:bg-blue-600 transition-all duration-300"
//         >
//           📌 Bookmark
//         </button>
//       </div>
//     </div>
//   );
// };

// export default NewsCard;
import React from "react";

const NewsCard = ({ article, onReadMore, onBookmark }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 hover:shadow-2xl max-w-sm mx-auto">
      {/* Image */}
      <div className="relative group">
        <img
          src={article.urlToImage || "https://via.placeholder.com/150"}
          alt={article.title || "Image for the news article"}
          className="w-full h-40 object-cover rounded-t-lg group-hover:opacity-90 transition-opacity duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-25 transition-all duration-300"></div>
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
            {article.source?.name || "Unknown Source"}
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

        {/* Bookmark Button */}
        
      </div>
    </div>
  );
};

export default NewsCard;

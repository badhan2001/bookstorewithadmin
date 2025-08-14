import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const getValidUrl = (url) => {
  if (!url) return "/fallback.jpg"; // Fallback image
  if (!url.startsWith("http")) {
    url = "https://m.media-amazon.com/images/I/" + url;
  }
  return encodeURI(url);
};

const BookCard = ({ data, favourite }) => {
  const imageUrl = getValidUrl(data.url);

  // Headers inside component where 'data' is defined
  const headers = {
    id: localStorage.getItem("userId"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id,
  };

  const handleRemoveBook = async () => {
    try {
      const response = await axios.delete(
      "http://localhost:1000/api/v1/favourite/remove-book-from-favourite",
      { headers }
    );
      alert(response.data.message);
    } catch (error) {
      console.error("Failed to remove book from favourite:", error);
    }
  };

  return (
    <div className="bg-zinc-800 rounded p-4 flex flex-col">
      <Link to={`/view-book-details/${data._id}`}>
        <div className="bg-zinc-900 rounded flex items-center justify-center h-[25vh] overflow-hidden">
          <img
            src={imageUrl}
            alt={data.title}
            className="object-contain h-full"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/fallback.jpg";
            }}
          />
        </div>
        <h2 className="mt-3 text-white font-semibold truncate">{data.title}</h2>
        <p className="text-sm text-zinc-400 truncate">by {data.author}</p>
        <p className="text-white font-semibold">৳{data.price}</p>
      </Link>
      {favourite && (
        <button
          className="bg-yellow-50 px-4 py-2 rounded border border-yellow-500 text-yellow-500 mt-4"
          onClick={handleRemoveBook}
        >
          Remove from favourite
        </button>
      )}
    </div>
  );
};

export default BookCard;



// import React from 'react';
// import { Link } from 'react-router-dom';

// // Helper function to fix image URLs if they are incomplete
// const encodeURL = (url) => {
//   try {
//     // This encodes only the path/query part, not the full URL protocol and domain
//     const urlObj = new URL(url);
//     urlObj.pathname = encodeURI(urlObj.pathname);
//     return urlObj.toString();
//   } catch {
//     return url; // fallback
//   }
// };

// const BookCard = ({ data }) => {
//   console.log("🖼️ Image URL:", data.url);

//   return (
//     <Link to={`/book/${data._id}`}>
//       <div className="bg-zinc-800 rounded p-4 hover:shadow-lg transition-shadow duration-300">
//         <div className="bg-zinc-900 rounded flex items-center justify-center">
//           <img
//   src={encodeURL(getValidUrl(data.url))}
//   alt={data.title}
//   className="h-[25vh] object-cover"
// />

//         </div>
//         <h3 className="text-white mt-2 font-semibold">{data.title}</h3>
//         <p className="text-gray-400 text-sm">{data.author}</p>
//       </div>
//     </Link>
//   );
// };

// export default BookCard;

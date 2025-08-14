import axios from "axios";
import React, { useState,useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
const UpdateBook = () => {
  const [data, setData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    language: ""
  });

  

   const { id } = useParams();
   const navigate=useNavigate();
   const headers = {
    id: localStorage.getItem("userId"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid:id
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        data.url === "" ||
        data.title === "" ||
        data.author === "" ||
        data.price === "" ||
        data.desc === "" ||
        data.language === ""
      ) {
        alert("All fields are required");
      } else {
        const response = await axios.put(
          "http://localhost:1000/api/v1/update-book",
          data,
          { headers }
        );
        setData({
          url: "",
          title: "",
          author: "",
          price: "",
          desc: "",
          language: ""
        });
        alert(response.data.message);
        navigate(`/view-book-details/${id}`)
      }
    } catch (error) {
      alert(error.response.data.message);
      
    }
  };

useEffect(() => {
    const fetch = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(
          `http://localhost:1000/api/v1/get-book-by-id/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
         console.log(response);
        setData(response.data.data); // ✅ Set only books data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetch();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-6">
      <div className="bg-zinc-800 text-white p-6 rounded-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6">Update Book</h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Image URL */}
          <div>
            <label className="block mb-1 text-sm">Image</label>
            <input
              type="text"
              name="url"
              placeholder="url of image"
              value={data.url}
              onChange={handleChange}
              className="w-full p-2 bg-zinc-900 rounded outline-none"
            />
          </div>

          {/* Title of book */}
          <div>
            <label className="block mb-1 text-sm">Title of book</label>
            <input
              type="text"
              name="title"
              placeholder="title of book"
              value={data.title}
              onChange={handleChange}
              className="w-full p-2 bg-zinc-900 rounded outline-none"
            />
          </div>

          {/* Author */}
          <div>
            <label className="block mb-1 text-sm">Author of book</label>
            <input
              type="text"
              name="author"
              placeholder="author of book"
              value={data.author}
              onChange={handleChange}
              className="w-full p-2 bg-zinc-900 rounded outline-none"
            />
          </div>

          {/* Language & Price in same row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm">Language</label>
              <input
                type="text"
                name="language"
                placeholder="language of book"
                value={data.language}
                onChange={handleChange}
                className="w-full p-2 bg-zinc-900 rounded outline-none"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm">Price</label>
              <input
                type="number"
                name="price"
                placeholder="price of book"
                value={data.price}
                onChange={handleChange}
                className="w-full p-2 bg-zinc-900 rounded outline-none"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 text-sm">Description of book</label>
            <textarea
              name="desc"
              placeholder="description of book"
              value={data.desc}
              onChange={handleChange}
              className="w-full p-2 bg-zinc-900 rounded outline-none"
              rows="3"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 hover:bg-blue-700 rounded font-semibold"
          >
            Update Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBook;

import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import BookCard from '../components/BookCard/BookCard';
const AllBooks = () => {
 
    const [Data, setData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-all-books",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setData(response.data.data); // ✅ Set only books data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetch();
  }, []);


  return (
    <div className="bg-zinc-900 h-auto px-12 py-8">
      {""}
      <h1 className="text-2xl font-bold text-white mb-4 px-4">All Books</h1>
      {!Data && (
        <div className="w-full h-[100%] flex items-center justify-center">
        <Loader />{" "}
        </div>
      )}

      <div className="my-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">

        {Array.isArray(Data) &&
          Data.map((item, i) => (
            <BookCard key={i} data={item} />
          ))}
      </div></div>
  )
}

export default AllBooks




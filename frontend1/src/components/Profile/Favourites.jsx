import React, { useEffect, useState } from 'react'
import axios from "axios";
import BookCard from '../BookCard/BookCard';
const Favourites = () => {
  const [FavouriteBooks,setFavouriteBooks]=useState([]);
  const headers={
    id:localStorage.getItem("userId"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
  }

useEffect(()=>{
 const fetch=async()=>{
  const response =await axios.get("http://localhost:1000/api/v1/favourite/get-favourite-books",
    {headers}

  );
  //console.log(response.data);
  setFavouriteBooks(response.data.data);
 }
 fetch();
},[FavouriteBooks]);

  return (
    <>
       {FavouriteBooks && FavouriteBooks.length === 0 && ( 
        <div className="text-5xl font-semibold h-[100%] text-zinc-500 flex items-center justify-center flex-col w-full">
        No Favourite Books
        {/* <img src="./star.jpg" alt="star" className="h-[20vh] my-8" /> */}
        </div>
        )}

        <div className="grid grid-cols-4 gap-4">
        {FavouriteBooks &&
         FavouriteBooks.map((items,i)=>(
         <div key={i}>
         <BookCard data={items} favourite={true}/>
         </div>
         ))}
    </div>
    </>
  )
}

export default Favourites





// import React, { useEffect, useRef } from 'react';
// import axios from 'axios';

// const Favourites = () => {
//   const logged = useRef(false); // tracks if logged already

//   useEffect(() => {
//     const fetchFavourites = async () => {
//       try {
//         const headers = {
//           id: localStorage.getItem("userId"),
//           authorization: `Bearer ${localStorage.getItem("token")}`,
//         };

//         const response = await axios.get(
//           "http://localhost:1000/api/v1/favourite/get-favourite-books",
//           { headers }
//         );

//         if (!logged.current) {
//           console.log(response.data); // log once
//           logged.current = true;
//         }
//       } catch (error) {
//         console.error("Error fetching favourites:", error);
//       }
//     };

//     fetchFavourites();
//   }, []);

//   return <div>Favourites</div>;
// };

// export default Favourites;

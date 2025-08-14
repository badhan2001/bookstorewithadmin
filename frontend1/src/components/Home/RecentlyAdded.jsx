// import React, {useState, useEffect } from 'react'
// import axios from "axios"
// const RecentlyAdded = () => {
//     const [Data,setData]=useState();
    
//     useEffect(()=>{
//         const fetch=async()=>{
//         const response = await axios.get(
//             "http://localhost:1000/api/v1/get-recent-books"
//         )
//         setData(response.data.data)
//         }
//           fetch();
//     },  [])


//   return (
//     <div className="mt-8 px-4">
//         <h4 className="text-3xl text-yellow-100">Recently Added Books</h4>
//         <div className="my-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
//           {Data &&
//             Data.map((items,i)=>(
//               <div key={i}>
//                 <BookCard data={items} />{" "}
//                 </div>
//             ))
//           }
//         </div>
//         </div>
//   )
// }

// export default RecentlyAdded




// import React, { useEffect, useRef, useState } from "react";
// import axios from "axios";
// import BookCard from "../BookCard/BookCard";

// const RecentlyAdded = () => {
//   const [Data,setData]=useState([]);
//   const fetchCount = useRef(0);

//   useEffect(() => {
//     const fetch = async () => {
//       const token = localStorage.getItem("token");

//       try {
//         const response = await axios.get(
//           "http://localhost:1000/api/v1/get-recent-books",
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         fetchCount.current += 1;

//         // Log full response every time
//         setData(response);

//         // Log books array only after second fetch (count === 2)
//         if (fetchCount.current === 2) {
//           setData( response.data.data);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetch();
//   }, []);

//   return (
//     <div>
//       <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Recently Added Books</h1>
//       <div className="my-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4"></div>
//       <div className="flex w-full justify-between px-4 mb-16">
//       {Array.isArray(Data) &&
//   Data.map((items, i) => (
//     <div key={i}>
//       <BookCard data={items} />
//     </div>
// ))}
// </div>

//     </div>
//   );
// };

// export default RecentlyAdded;




import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../BookCard/BookCard";
import Loader from "../Loader/Loader";

const RecentlyAdded = () => {
  const [Data, setData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const token = localStorage.getItem("token");
      console.log("🔐 Token from localStorage:", token); 

      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-recent-books",
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
    <div>
      <h1 className="text-2xl font-bold mb-4 px-4">Recently Added Books</h1>
      {!Data && (
        <div className="flex items-center justify-center my-8">
        <Loader />{" "}
        </div>
      )}

      <div className="my-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">

        {Array.isArray(Data) &&
          Data.map((item, i) => (
            <BookCard key={i} data={item} />
          ))}
      </div>
    </div>
  );
};

export default RecentlyAdded;

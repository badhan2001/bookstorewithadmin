// import React, { useEffect, useState } from 'react'
// import Sidebar from '../components/Profile/Sidebar'
// import { Outlet } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// import axios from "axios"
// import Loader from '../components/Loader/Loader'
// import MobileNav from '../components/Profile/MobileNav'
// const Profile = () => {
//  // const isLoggedIn=useSelector();
//  const[Profile,setProfile]=useState(null);
//   const headers={
//     id:localStorage.getItem("userId"),
//     authorization:`Bearer ${localStorage.getItem("token")}`,
//   }
//   useEffect(()=>{
//     const fetch=async()=>{
//        const response=await axios.get(
//          "http://localhost:1000/api/v1/get-user-information",
//         // `${process.env.REACT_APP_API_URL}/api/v1/get-user-information`,
//          {headers}
//        );
//        //console.log(response.data);
//        setProfile(response.data);
//     };
//     fetch();

//   },[]);
//   return (
//     <div className="bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row  py-8 gap-4 text-white">
//       {!Profile && (
//         <div className="w-full h-[100%] flex items-center justify-center">
//         <Loader />
//         </div>
//         )}
//       {Profile && <>
//       <div className="w-full md:w-1/6 h-auto lg:h-screen">
//         <Sidebar data={Profile} />
//         <MobileNav />
//       </div>
//       <div className="w-full md:w-5/6">
        
//         <Outlet />
//       </div>
//        </>}

//     </div>
//   )
// }

// export default Profile



import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Profile/Sidebar';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader/Loader';
import MobileNav from '../components/Profile/MobileNav';

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/get-user-information`,
          {
            headers: {
              id: userId,
              authorization: `Bearer ${token}`,
            },
            withCredentials: true, // important if backend uses cookies
          }
        );

        setProfile(response.data);
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row py-8 gap-4 text-white">
      {!profile ? (
        <div className="w-full h-[100%] flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <>
          <div className="w-full md:w-1/6 h-auto lg:h-screen">
            <Sidebar data={profile} />
            <MobileNav />
          </div>
          <div className="w-full md:w-5/6">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;

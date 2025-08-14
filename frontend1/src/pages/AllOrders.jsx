import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import { FaUserLarge } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { IoOpenOutline } from "react-icons/io5";
import SeeUserData from "./SeeUserData"
const AllOrders = () => {
  const [allOrders, setAllOrders] = useState(null);
  const [optionsIndex, setOptionsIndex] = useState(-1);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [userDiv,setuserDiv]=useState("hidden");
  const [userDivData,setuserDivData]=useState();
  const headers = {
    id: localStorage.getItem("userId"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-all-orders",
          { headers }
        );
        let orders = response.data.data || [];
        orders = orders.map((order) => ({
          ...order,
          status: "Order Placed",
        }));
        setAllOrders(orders.slice(0, orders.length - 1));
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };
    fetch();
  }, []);

  const handleOptionsButton = (index) => {
    if (optionsIndex === index) {
      setOptionsIndex(-1);
      setSelectedStatus("");
    } else {
      setOptionsIndex(index);
      setSelectedStatus(allOrders[index].status);
    }
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleStatusUpdate = async (orderId) => {
    try {
      await axios.put(
        `http://localhost:1000/api/v1/update-status/${orderId}`,
        { status: selectedStatus },
        { headers }
      );
      setAllOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: selectedStatus } : order
        )
      );
      setOptionsIndex(-1);
      setSelectedStatus("");

      setSuccessMessage("Status updated successfully");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Failed to update status");
    }
  };

  return (
    <>
      {successMessage && (
        <div
          className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50"
          role="alert"
        >
          {successMessage}
        </div>
      )}

      {!allOrders && (
        <div className="h-[100%] flex items-center justify-center">
          <Loader />
        </div>
      )}

      {allOrders && allOrders.length > 0 && (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            All Orders
          </h1>

          <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
            <div className="w-[3%]">
              <h1 className="text-center">Sr.</h1>
            </div>
            <div className="w-[40%] md:w-[22%]">
              <h1>Books</h1>
            </div>
            <div className="w-0 md:w-[45%] hidden md:block">
              <h1>Description</h1>
            </div>
            <div className="w-[17%] md:w-[9%]">
              <h1>Price</h1>
            </div>
            <div className="w-[30%] md:w-[16%]">
              <h1>Status</h1>
            </div>
            <div className="w-[10%] md:w-[5%]">
              <h1>
                <FaUserLarge />
              </h1>
            </div>
          </div>

          {allOrders.map((order, i) => (
            <div
              key={order._id}
              className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 hover:bg-zinc-900 hover:cursor-pointer transition-all duration-300"
            >
              <div className="w-[3%]">
                <h1 className="text-center">{i + 1}</h1>
              </div>

              <div className="w-[40%] md:w-[22%]">
                <Link
                  to={`view-book-details/${order.book._id}`}
                  className="hover:text-blue-300"
                >
                  {order.book.title}
                </Link>
              </div>

              <div className="w-0 md:w-[45%] hidden md:block">
                <h1>{order.book.desc.slice(0, 50)}...</h1>
              </div>

              <div className="w-[17%] md:w-[9%]">
                <h1>৳{order.book.price}</h1>
              </div>

              <div className="w-[30%] md:w-[16%]">
                <h1 className="font-semibold">
                  <button
                    className="hover:scale-105 transition-all duration-300"
                    onClick={() => handleOptionsButton(i)}
                  >
                    <div className="text-yellow-500">{order.status}</div>
                  </button>

                  <div
                    className={`${optionsIndex === i ? "flex" : "hidden"} gap-2 mt-2`}
                  >
                    <select
                      name="status"
                      className="bg-gray-800"
                      value={selectedStatus}
                      onChange={handleStatusChange}
                    >
                      {[
                        "Order Placed",
                        "Out for delivery",
                        "Delivered",
                        "Canceled",
                      ].map((status, idx) => (
                        <option value={status} key={idx}>
                          {status}
                        </option>
                      ))}
                    </select>
                    <button
                      className="text-green-500 hover:text-pink-600"
                      onClick={() => handleStatusUpdate(order._id)}
                      disabled={!selectedStatus}
                      title="Update Status"
                    >
                      <FaCheck />
                    </button>
                  </div>
                </h1>
              </div>

              <div className="w-[10%] md:w-[5%]">
                <button
                  className="text-xl hover:text-orange-500"
                  onClick={() => {
                    setuserDiv("fixed");
                    setuserDivData(order.user);
                    // Handle user info popup here if needed
                  }}
                >
                  <IoOpenOutline />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

       {userDivData &&(
        <SeeUserData
           userDivData={userDivData}
           userDiv={userDiv}
           setuserDiv={setuserDiv}
         />
       )}

    </>
  );
};

export default AllOrders;

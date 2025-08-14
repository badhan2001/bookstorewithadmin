import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader/Loader';
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [Cart, setCart] = useState();
  const [Total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      const headers = {
        id: localStorage.getItem("userId"),
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      try {
        const res = await axios.get(
          "http://localhost:1000/api/v1/get-user-cart",
          { headers }
        );
        setCart(res.data.data);
      } catch (error) {
        console.error(error);
        if (error.response && error.response.status === 401) {
          alert("Your session has expired. Please log in again.");
          navigate("/login");
        }
      }
    };

    fetchCart();
  }, [navigate]); // ✅ runs only on mount

  const deleteItem = async (bookid) => {
  try {
    const headers = {
      id: localStorage.getItem("userId"),
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    const response = await axios.delete(
      `http://localhost:1000/api/v1/remove-from-cart/${bookid}`,
      { headers }
    );

    alert(response.data.message);

    // Remove the deleted book from the cart in UI
    setCart((prevCart) => prevCart.filter(item => item._id !== bookid));
  } catch (error) {
    console.error("Error deleting item:", error);
  }
};

useEffect(()=>{
  if(Cart && Cart.length>0){
    let total =0;
    Cart.map((items)=>{
      total+=items.price;
    });
    setTotal(total);
    total=0;
  }
},[Cart]);


const PlaceOrder=async()=>{
  const headers = {
    id: localStorage.getItem("userId"),
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  try{
    const response=await axios.post(
      `http://localhost:1000/api/v1/place-order`,
      {order:Cart},
      {headers}
    );
    alert(response.data.message);
    navigate("/profile/orderHistory");
  } catch(error){
    console.log(error);
  }
}

  return (
    <div className="bg-zinc-900 px-12 h-screen py-8">
      {!Cart && (
        <div className="w-full h-[100%] flex items-center justify-center">
        <Loader />{" "}
        </div>
        )}
      {Cart && Cart.length === 0 && (
        <div className="h-screen">
          <div className="h-[100%] flex items-center justify-center flex-col">
            <h1 className="text-5xl lg:text-6xl font-semibold text-zinc-400">
              Empty Cart
            </h1>
          </div>
        </div>
      )}

      {Cart && Cart.length > 0 && (
        <>
          <h1 className="text-5xl font-semibold text-zinc-500 mb-8">
            Your Cart
          </h1>
          {/* {Cart.map((items, i) => (
            <div
              className="w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 items-start"
              key={i}
            >
              <img
                src={items.url}
                alt="/"
                className="h-[20vh] md:h-[10vh] object-cover"
              />

              <div className="w-full md:w-auto">
                <h1 className="text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0">
                  {items.title}
                </h1>
                <p className="text-normal text-zinc-300 mt-2 hidden lg:block">
                  {items.desc.slice(0, 100)}...
                </p>
                <p className="text-normal text-zinc-300 mt-2 hidden md:block lg:hidden">
                  {items.desc.slice(0, 65)}...
                </p>
              </div>

             



              <div className="flex mt-4 w-full md:w-auto items-center justify-between">
                <h2 className="text-zinc-100 text-3xl font-semibold flex">
                  ৳ {items.price}
                </h2>
                <button
                  className="bg-red-100 text-red-700 border border-x-red-700 rounded p-2 ms-12"
                  onClick={() => deleteItem(items.id)}
                >
                  <AiFillDelete />
                </button>
              </div>
            </div>
          ))} */}

         {Cart.map((items, i) => (
  <div
    key={i}
    className="w-full my-2 rounded flex flex-row p-3 bg-zinc-800 items-start justify-between"
    style={{ maxHeight: '110px' }}
  >
    {/* Left: Image + Text */}
    <div className="flex flex-row items-start gap-3">
      <img
        src={items.url}
        alt={items.title}
        className="w-[70px] h-[100px] object-cover rounded"
      />
      <div className="flex flex-col overflow-hidden" style={{ maxHeight: '100px' }}>
        <h1 className="text-xl text-zinc-100 font-semibold truncate">
          {items.title}
        </h1>
        <p className="text-sm text-zinc-300 mt-1">
          {items.desc.length > 100 ? items.desc.slice(0, 100) + "..." : items.desc}
        </p>
      </div>
    </div>

    {/* Right: Price + Delete in same row */}
    <div className="flex flex-row items-center gap-3">
      <h2 className="text-zinc-100 text-xl font-semibold">
        ৳ {items.price}
      </h2>
      <button
        className="bg-red-100 text-red-700 border border-red-700 rounded p-1 hover:bg-red-200"
        onClick={() => deleteItem(items._id)}
      >
        <AiFillDelete size={18} />
      </button>
    </div>
  </div>
))}







        </>
      )}


{Cart && Cart.length>0 && (
  <div className="mt-4 w-full flex items-center justify-end">
      <div className="p-4 bg-zinc-800 rounded">
        <h1 className="text-3xl text-zinc-200 font-semibold">
          Total Amount
        </h1>
        <div className="mt-3 flex items-center justify-between text-xl text-zinc-200">
          <h2>{Cart.length}books</h2> <h2>৳{Total}</h2>
          </div>
          <div className="w-[100%] mt-3">
            <button
            className="bg-zinc-100 rounded px-4 py-2 flex justify-center w-full font-semiboldhover:bg-zinc-200"
              onClick={PlaceOrder}
              >
                Place your order
            </button>
         </div>
      </div>
    </div>

)}




    </div>
  );
};

export default Cart;

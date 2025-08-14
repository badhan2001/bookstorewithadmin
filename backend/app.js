const express = require("express");
const mongoose=require("mongoose");
const app= express();
const cors=require("cors");

// app.use(cors());
// app.use(express.json());
require("dotenv").config();
require("./conn/conn");
 const UserRoutes=require("./routes/user");
 const BooksRoutes=require("./routes/book");
 const FavouriteRoutes=require("./routes/favourites")
 const CartRoutes=require("./routes/cart");
 const OrderRoutes=require("./routes/order");


// // app.get("/" ,(req,res) => {
// //     res.send("Hello from backend side");
// // });
app.use(cors());
app.use(express.json());


 app.use("/api/v1",UserRoutes);
 app.use("/api/v1",BooksRoutes);
 app.use("/api/v1/favourite",FavouriteRoutes);
 app.use("/api/v1",CartRoutes);
 app.use("/api/v1",OrderRoutes);
 
 
app.listen(process.env.PORT,()=>{
    console.log(`Server Started at port ${process.env.PORT}`);

});

// const router = express.Router();
const express = require("express");
const router = express.Router();
const User=require("../models/user");
const {authenticateToken}=require("./userAuth");


router.put("/add-book-to-favourite",authenticateToken,async(req,res)=>{
    try{
        const{bookid,id}=req.headers;
        const userData=await User.findById(id);
        const isBookFavourite=userData.favourites.includes(bookid);
     if(isBookFavourite){
        return res.status(200).json({message:"Book is already in favourite"});
     }
     await User.findByIdAndUpdate(id,{$push:{favourites:bookid}});
     return res.status(200).json({message:"Book added to favourite"});
    }
    catch(error){
        res.status(500).json({message:"Internal server error"});

    }
});



// router.put("/add-book-to-favourite", authenticateToken, async (req, res) => {
//   try {
//     const { bookid, id } = req.headers;
//     console.log("👉 bookid:", bookid);
//     console.log("👉 user id:", id);

//     const userData = await User.findById(id);
//     if (!userData) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const isBookFavourite = userData.favourites.includes(bookid);
//     if (isBookFavourite) {
//       return res.status(200).json({ message: "Book is already in favourite" });
//     }

//     await User.findByIdAndUpdate(id, { $push: { favourites: bookid } });
//     return res.status(200).json({ message: "Book added to favourite" });
//   } catch (error) {
//     console.error("🔥 Error in add-book-to-favourite:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });


router.delete("/remove-book-from-favourite",authenticateToken,async(req,res)=>{
    try{
        const{bookid,id}=req.headers;
        const userData=await User.findById(id);
        const isBookFavourite=userData.favourites.includes(bookid);
     if(isBookFavourite){
        await User.findByIdAndUpdate(id,{$pull:{favourites:bookid}});
     }
     
     return res.status(200).json({message:"Book removed from favourite"});
    }
    catch(error){
        res.status(500).json({message:"Internal server error"});

    }
});

// router.delete("/remove-from-cart", authenticateToken, async (req, res) => {
//   try {
//     const { bookid, id } = req.headers;
//     const userData = await User.findById(id);
//     const isInCart = userData.cart.includes(bookid);

//     if (isInCart) {
//       await User.findByIdAndUpdate(id, { $pull: { cart: bookid } });
//     }

//     return res.status(200).json({ message: "Book removed from cart" });
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// });



router.get("/get-favourite-books",authenticateToken,async(req,res)=>{
    try{
        const{id}=req.headers;
        const userData=await User.findById(id).populate("favourites");
        const favouriteBooks=userData.favourites;
     return res.json({
        status:"Sucess",
        data:favouriteBooks,
    });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message:"An error occured"});

    }
});

// router.get("/get-favourite-books", authenticateToken, async (req, res) => {
//   try {
//     const { id } = req.headers;
//     if (!id) {
//       return res.status(400).json({ message: "User ID missing in headers" });
//     }

//     const userData = await User.findById(id).populate("favourites");
//     if (!userData) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.json({ status: "success", data: userData.favourites });
//   } catch (error) {
//     console.error("Error fetching favourite books:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

module.exports=router;














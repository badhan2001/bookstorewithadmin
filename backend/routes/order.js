const express = require("express");
const router = express.Router();
const {authenticateToken}=require("./userAuth");
const Book=require("../models/book");
const Order=require("../models/order");
const User=require("../models/user");


router.post("/place-order",authenticateToken,async(req,res)=>{
    try{
       
        const{id}=req.headers;
        const{order}=req.body;
        for(const orderData of order){
            const newOrder=new Order({user:id,book:orderData._id});
            const orderDataFromDb=await newOrder.save();
            await User.findByIdAndUpdate(id,{
                    $push:{orders:orderDataFromDb._id},
                });
                await User.findByIdAndUpdate(id,{
                        $pull:{cart:orderData._id},
                    });
        }

     return res.json({
        status:"Success",
        message:"Order placed successfully",
    });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message:"An error occurred"});

    }
});



// router.get("/get-order-history",authenticateToken,async(req,res)=>{
//     try{
       
//         const{id}=req.headers;
//         const{order}=req.body;
//         const userData=await User.findById(id).populate({
//             path:"orders",
//             populate:{path:"book"},
//         });
//          const ordersData=userData.ordersreverse();
//      return res.json({
//         status:"Success",
//         data:ordersData,
//     });
//     }
//     catch(error){
//         console.log(error);
//         return res.status(500).json({message:"An error occurred"});

//     }
// });

router.get("/get-order-history", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;

    if (!id) {
      return res.status(400).json({ message: "User ID missing in headers" });
    }

    const userData = await User.findById(id).populate({
      path: "orders",
      populate: { path: "book" },
    });

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    const ordersData = userData.orders.reverse();  // <-- fixed typo here

    return res.json({
      status: "Success",
      data: ordersData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
});


// router.get("/get-all-orders",authenticateToken,async(req,res)=>{
//     try{
//         const userData=await Order.find()
//         .populate({
//             path:"book",
//         })
//         .populate({
//             path:"user",
//         })
//          .populate({createdAt:-1});
//      return res.json({
//         status:"Success",
//         data:userData,
//     });
//     }
//     catch(error){
//         console.log(error);
//         return res.status(500).json({message:"An error occurred"});

//     }
// });

router.get("/get-all-orders", authenticateToken, async (req, res) => {
    try {
        const userData = await Order.find()
            .populate({ path: "book" })
            .populate({ path: "user" })
            .sort({ createdAt: -1 }); // ✅ Correct sorting

        return res.json({
            status: "Success",
            data: userData,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred" });
    }
});


router.put("/update-status/:id",authenticateToken,async(req,res)=>{
    try{
        const {id}=req.params;
        await Order.findByIdAndUpdate(id,{status:req.body.status});
     return res.json({
        status:"Success",
        message:"Status updated successfully",
    });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message:"An error occurred"});

    }
});



module.exports=router;

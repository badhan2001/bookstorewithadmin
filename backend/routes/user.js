const router = require ("express").Router();
const User=require("../models/User");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
//const {authenticateToken}=require("./userAuth");
//const authenticateToken = require("../middleware/authenticateToken");
//const { authenticateToken } = require("../userAuth/authenticateToken");
const { authenticateToken } = require("./userAuth");

router.post("/sign-up",async(req,res)=>{
    try{
       const{username,email,password,address}=req.body;
       if(username.length<4){
        return res
        .status(400)

        .json({message:"Usrname length should be greater than 3"});
       }

       const existingUsername= await User.findOne({username:username});
       if(existingUsername){
        return res
        .status(400)
        .json({message:"Username already exists"});
       }
      
       const existingEmail= await User.findOne({email:email});
       if(existingEmail){
        return res
        .status(400)
        .json({message:"Email already exists"});
       }
       
       if(password.length<=5){
        return res
        .status (400)
        .json({message:"Password's length should be greater than 5"});
       }
        
        const hashPass=await bcrypt.hash(password,10);

       const newUser=new User({
        username:username,
        email:email,
        password:hashPass,
        address:address,
     });
  await newUser.save();
  return res.status(200).json({message:"SignUp Successfully"});
    }
    catch(error){
      res.status(500).json({message:"Internal server error"});
    }
});

// router.post("/sign-in",async(req,res)=>{

//     try{
//        const{username,password}=req.body;
//        const existingUser=await User.findOne({username});
//        if(!existingUser){
//         return res.status(400).json({message:"Invalid credentials"});
//        }
//        const isMatch= await bcrypt.compare(password,existingUser.password,(err,data)=>{
//           if(isMatch)
//           {
//             const authClaims=[
//               {name:existingUser.username},
//               {role:existingUser.role},

//             ];
//             const token=jwt.sign({authClaims},"bookstore123",{
//               expiresIn:"30d",
//             });
//             return res.status(200).json({
//               id: existingUser._id,
//               role:existingUser.role,
//               token:token,
          
//             });
//           }
//           else{
//              res.status(400).json({message:"Invalid credentials"});
//           }
//        });
//     }
//     catch(error){
//       return res.status(500).json({message:"Internal server error"});
//     }
// });


router.post("/sign-in", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("Login attempt:", username);

    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      console.log("User not found");
      return res.status(400).json({ message: "Invalid credentials (username)" });
    }
    console.log("User found:", existingUser.username);

    const isMatch = await bcrypt.compare(password, existingUser.password);
    console.log("Password match:", isMatch);

    if (!isMatch) {
      console.log("Password incorrect");
      return res.status(400).json({ message: "Invalid credentials (password)" });
    }

    const authClaims = {
      id: existingUser._id,
      username: existingUser.username,
      role: existingUser.role,
    };

    const token = jwt.sign(authClaims, "bookstore123", {
      expiresIn: "30d",
    });

    console.log("Login successful, sending token");

    return res.status(200).json({
      id: existingUser._id,
      role: existingUser.role,
      token: token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});


// router.get("/get-user-information",authenticateToken,async(req,res)=>{
//   //router.get('/somepath', (req, res) => {
//   try{
//      const{id}=req.userId;
//      const data=await User.findById(id).select("-password");
//      return res.status(200).json(data);
//   }
//   catch(error){
//     res.status(500).json({message:"Internal server error"});
//   }
// });

// ✅ Corrected route
// router.get("/get-user-information", authenticateToken, async (req, res) => {
//   try {
//     const user = await User.findById(req.userId).select("-password"); // 🛠️ Use userId from token

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     return res.status(200).json(user);
//   } catch (error) {
//     console.error("❌ Error fetching user info:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// });
router.get("/get-user-information", authenticateToken, async (req, res) => {
  try {
    const userId = req.userId;  // get userId from authenticated request
    if (!userId) {
      return res.status(400).json({ message: "User ID missing from token" });
    }

    const data = await User.findById(userId).select("-password");

    if (!data) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});


router.put("/update-address",authenticateToken,async(req,res)=>{
  try{
     const{id}=req.headers;
     const{address}=req.body;
     await User.findByIdAndUpdate(id,{address:address});
     return res.status(200).json({message: "Address updated successfully"});
  }
  catch(error){
    res.status(500).json({message:"Internal server error"});
  }
});

module.exports=router;

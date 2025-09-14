const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

require("./conn/conn");

const UserRoutes = require("./routes/user");
const BooksRoutes = require("./routes/book");
const FavouriteRoutes = require("./routes/favourites");
const CartRoutes = require("./routes/cart");
const OrderRoutes = require("./routes/order");

const app = express();

app.use(cors({
  origin: [
    'https://resonant-sherbet-4dd97f.netlify.app',
    'http://localhost:5173'
  ],
  credentials: true
}));

app.use(express.json());

app.use("/api/v1", UserRoutes);
app.use("/api/v1", BooksRoutes);
app.use("/api/v1/favourite", FavouriteRoutes);
app.use("/api/v1", CartRoutes);
app.use("/api/v1", OrderRoutes);

// Use PORT variable consistently
const PORT = process.env.PORT || 1000;

app.get("/", (req, res) => {
	return res.json({ message: "Hello, it's working..." });
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

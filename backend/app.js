const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

require("./conn/conn");

let UserRoutes, BooksRoutes, FavouriteRoutes, CartRoutes, OrderRoutes;
try {
  console.log('Requiring route modules...');
  UserRoutes = require("./routes/user");
  BooksRoutes = require("./routes/book");
  FavouriteRoutes = require("./routes/favourites");
  CartRoutes = require("./routes/cart");
  OrderRoutes = require("./routes/order");
  console.log('Route modules required successfully');
} catch (e) {
  console.error('Error while requiring route modules:', e && e.stack ? e.stack : e);
  throw e;
}

const app = express();

const corsOptions = {
  origin: [
    'https://resonant-sherbet-4dd97f.netlify.app',
    'http://localhost:5173', 
    'http://localhost:5175'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'Accept',
    'id', // Add id header
    'bookid', // Add bookid header for book operations
    'authorization' // Add lowercase authorization
  ],
  credentials: true,
  optionsSuccessStatus: 204,
  exposedHeaders: ['Authorization'] // Expose Authorization header
};

// Enable CORS for all routes with the above options
app.use(cors(corsOptions));

// Ensure preflight requests are handled for all routes
app.options('*', cors(corsOptions));

app.use(express.json());

console.log('Mounting route: /api/v1 -> UserRoutes');
try { app.use("/api/v1", UserRoutes); } catch (e) { console.error('Error mounting UserRoutes', e); throw e; }

console.log('Mounting route: /api/v1 -> BooksRoutes');
try { app.use("/api/v1", BooksRoutes); } catch (e) { console.error('Error mounting BooksRoutes', e); throw e; }

console.log('Mounting route: /api/v1/favourite -> FavouriteRoutes');
try { app.use("/api/v1/favourite", FavouriteRoutes); } catch (e) { console.error('Error mounting FavouriteRoutes', e); throw e; }

console.log('Mounting route: /api/v1 -> CartRoutes');
try { app.use("/api/v1", CartRoutes); } catch (e) { console.error('Error mounting CartRoutes', e); throw e; }

console.log('Mounting route: /api/v1 -> OrderRoutes');
try { app.use("/api/v1", OrderRoutes); } catch (e) { console.error('Error mounting OrderRoutes', e); throw e; }

// Use PORT variable consistently
const PORT = process.env.PORT || 1000;

app.get("/", (req, res) => {
	return res.json({ message: "Hello, it's working..." });
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

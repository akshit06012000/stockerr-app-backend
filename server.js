const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const contactRoute = require("./routes/contactRoute");
const errorHandler = require("./middleWare/errorMiddleware");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors())
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
/*app.use(
  cors({
    origin: ["http://localhost:3000","https://stockerr-app.vercel.app/"],
    credentials: true,
  })
);*/

//app.use(cors());


app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes Middleware
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/contactus", contactRoute);

// Routes
app.get("/", (req, res) => {
  res.send("Home Page");
});

// Error Middleware
app.use(errorHandler);
// Connect to DB and start server

const PORT = process.env.PORT || 5000;
mongoose
  .connect('mongodb+srv://akshitvyas_av:carpediem@cluster0.sbxvuce.mongodb.net/Stocker-app?retryWrites=true&w=majority')
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running on port 5000`);
    });
  })
  .catch((err) => console.log(err));

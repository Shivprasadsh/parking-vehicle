
const express = require("express");
const mongoose = require("mongoose");
const router = require("./router/router");
const dotenv = require("dotenv").config();
const cors = require('cors')
const bodyParse = require('body-parser')

const app = express();
const port = process.env.PORT || 4000;


app.use(express.json());
app.use(cors({
  origin:"https://parking-vehicle-ujes.vercel.app/",
  credentials:true
}));
app.use(bodyParse.json());


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); 
  }
};


connectDB();



app.use('/api',router)


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

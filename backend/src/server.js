import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";


const app = express();
dotenv.config();

const connectDB = async() => {
    try {
        mongoose.connect(process.env.MONGO_URI);
        console.log(" MongoDB is connected !");
    } catch(error) {
        console.log(error);
    }
};

connectDB();

app.listen(5000, ()=> {
    console.log("The server is running on port :", 5000);
});
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieparser from "cookie-parser";
import router from "./routes/transaction.js";
import cors from "cors";


const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended : false}));
app.use(cookieparser());
app.use('/', router);
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

app.listen(process.env.PORT, ()=> {
    console.log("The server is running on port :", 5000);
});
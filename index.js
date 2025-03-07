import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import productRouter from './routes/productRouter.js';
import userRouter from './routes/userRouter.js';
import jwt from "jsonwebtoken";

const app = express();

const mongoUrl = "mongodb+srv://admin:admin@fullstackdb.z6mcm.mongodb.net/?retryWrites=true&w=majority&appName=fullStackDB"

mongoose.connect(mongoUrl,{})

const connection = mongoose.connection;

connection.once("open",()=>{
    console.log("Database connected");
})

app.use(bodyParser.json())

app.use(
    (req, res, next)=>{

        const token = req.header("Authorization")?.replace("Bearer ", "")

        if(token != null ){
            jwt.verify(token, "cbc-secret-key-7973", (error, decoded)=>{
                if(!error){
                    req.user = decoded
                }
            })
        }
        next()
    }
)

app.use("/api/products", productRouter)
app.use("/api/users", userRouter)

app.listen(
    3000,
    ()=>{
        console.log("sever running port 3000");
    }
)
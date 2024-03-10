import express from 'express';

import { userRouter } from "./routes/userRoute";
import { AdminRouter } from './routes/adminRoute';
import {connectiondb} from "./config/dbconnect"


const app = express();
connectiondb();

app.use(express.json());

app.use("/", (req, res, next) => {
    res.send("Welcome to the server!");
}
)
app.use("/api/user", userRouter);
app.use("/api/admin",AdminRouter);


const port = 10000;
app.listen(port,
    ()=>{
        console.log("server started")
    }
);



import express from 'express';

import { router } from "./routes/userRoute";
import {connectiondb} from "./config/dbconnect"
import { protectedRoute } from './middlewares/auth';



const app = express();
connectiondb();

app.use(express.json());


app.use("/api", router);
const port = 3000;

app.listen(port,
    ()=>{
        console.log("server started")
    }
);



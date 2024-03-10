import {connect } from 'mongoose';
import { config } from "dotenv";
config()


export const connectiondb =()=>{
    connect(process.env.DB_URI??"mongodb://localhost:27017/test").then(
      ()=>{
       console.log(`connected to db`)
      }
     ).catch(
       (err)=>{
         console.log(`error occures : ${err}`)
       }
     )
  }


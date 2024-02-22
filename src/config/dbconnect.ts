import {connect } from 'mongoose';



export const connectiondb =()=>{
    connect('mongodb://127.0.0.1:27017/test').then(
      ()=>{
       console.log(`connected to db`)
      }
     ).catch(
       (err)=>{
         console.log(`error occures : ${err}`)
       }
     )
  }


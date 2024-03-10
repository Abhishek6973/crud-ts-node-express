import {connect } from 'mongoose';



export const connectiondb =()=>{
    connect('mongodb+srv://abhishek86649:Abhi1033%40@cluster0.wpfpsg9.mongodb.net/test?retryWrites=true&w=majority').then(
      ()=>{
       console.log(`connected to db`)
      }
     ).catch(
       (err)=>{
         console.log(`error occures : ${err}`)
       }
     )
  }


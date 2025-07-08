import express from "express";

const app = express();

app.get('/', (req,res)=>{
    res.send("server is running");
})

app.listen('6213',() => {
    console.log("server started!! listening on port 6213");
})
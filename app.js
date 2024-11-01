require('dotenv').config()
const express = require('express');
const cors=require('cors');
const { connecttoMDB } = require('./db/connect');
const {readdirSync} =require('fs');
const Port=process.env.PORT
const app = express();

//middlewares
app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.send("HELLO World");
})


connecttoMDB(process.env.MONGO_URL) 

//Routes
readdirSync('./routes').map((route)=>app.use('/api/v1',require('./routes/' + route)))


app.listen(Port, () => console.log(`APP STARTED ON PORT ${Port}`));

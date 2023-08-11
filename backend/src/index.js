const express = require("express");
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');

const PORT = 7070;
const HOST="0.0.0.0";

const app = express();

app.use(cors());
app.use(express.json())
app.use(express.static(path.join(__dirname,"../source")));

mongoose.connect('mongodb+srv://ghwjd32123:<password>@cluster0.tspiq2y.mongodb.net/?retryWrites=true&w=majority').then(()=>{
    console.log('연결완료');
  }).catch((err)=>{
    console.error(err);
  })

app.get("/",(req,res,next)=>{
  res.send('hello');
  next();
})

app.get('/map',(req,res)=>{
  const data = require('../source/myArray.json');
  res.json(data);
})

app.use('/users',require('./routes/users'));

app.listen(PORT,HOST);
console.log(`Running on http://${HOST}:${PORT}`);

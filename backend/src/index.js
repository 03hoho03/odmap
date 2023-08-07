const express = require("express");
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');

const PORT = 7070;
const HOST="0.0.0.0";

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname,"../source")));

app.get("/",(req,res,next)=>{
  res.send('hello');
  next();
})

app.get('/map',(req,res)=>{
  const data = require('../source/myArray.json');
  res.json(data);
})

app.listen(PORT,HOST);
console.log(`Running on http://${HOST}:${PORT}`);
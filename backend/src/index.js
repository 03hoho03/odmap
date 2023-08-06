const express = require("express");
const path = require('path');
const mongoose = require('mongoose');

const PORT = 7070;
const HOST="0.0.0.0";

const app = express();

app.get("/",(req,res,next)=>{
  res.send('hello');
  next();
})

app.listen(PORT,HOST);
console.log(`Running on http://${HOST}:${PORT}`);
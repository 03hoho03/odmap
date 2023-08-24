const express = require("express");
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const PORT = 7070;
const HOST = "0.0.0.0";

const app = express();

app.use(cors());
app.use(express.json())
app.use(express.static(path.join(__dirname, "../source")));

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('연결완료');
}).catch((err) => {
  console.error(err);
})

app.get("/", (req, res, next) => {
  res.send('hello');
  next();
})

app.get('/map', (req, res) => {
  const data = require('../source/myArray.json');
  res.json(data);
})

app.use('/image', require('./routes/image'));

app.use('/users', require('./routes/users'));

app.use((error, req, res, next) => {
  // res.status(err.status || 500);
  res.send(error.message || "서버에서 에러가 났습니다.");
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

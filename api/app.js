const express = require('express');
const cookieParser = require('cookie-parser')
const cors = require('cors');
const postRoute = require('./routes/post.route.js')
const authRoute = require('./routes/auth.route.js')
const testRoute = require('./routes/test.route.js')
const mongoose = require('mongoose')
require('dotenv').config();
const port = process.env.PORT || 3000;

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

//DB connectivity
mongoose.connect('mongodb://localhost:27017/CRUD')
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("MongoDB connection error:", err));

app.use('/api/post',postRoute)

app.use('/api/auth', authRoute)

app.use('/api/test', testRoute)

app.listen(port, ()=>{
    console.log(`The server Running on Port ${port}`);
})
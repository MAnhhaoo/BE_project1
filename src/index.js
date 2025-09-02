const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const routes = require("./routes");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

//load biến môi trường từ .env.
dotenv.config()
const app = express()

const port = process.env.PORT || 3001

// middleware cors
app.use(cors())


app.use(bodyParser.json())
app.use(cookieParser());

// Đây gọi toàn bộ router để mount vào app
// gọi module route, gắn các route vào app.
routes(app); 


console.log("first")
mongoose.connect(`${process.env.MONGO_DB}`)

.then(()=> {
    console.log("✅ Connected to MongoDB")
})
.catch((err)=>{
    console.error("❌ MongoDB connection error:", err)
})


app.listen(port , ()=>{
    console.log("serve is running prot 3001" , + port)
})

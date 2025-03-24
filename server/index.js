const express = require("express");
const ConnectDB = require('./Database/Db-Configorition.js')
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser")
require("dotenv").config()
app.use(cors({
    origin : "http://localhost:3000",
    credentials : true
}));
app.use(express.json());
app.use(cookieParser())

app.use(express.static('./uploads'))

app.use('/', require("./Routes/UserRoute.js"))

ConnectDB()

const port = process.env.PORT || 3000

app.listen(port, ()=>{
    console.log(`Server is Running on Port ${port}`);
});
const express = require("express")
const {connectMongoDb} = require("./connection")
const dotenv = require("dotenv")
const todo = require("./models/todo.models")
const todoRouter = require("./routes/todo.routes")

dotenv.config();

const port = 8000;
const app = express();

//connection
connectMongoDb(process.env.MONGO_URI)


//middlewears

app.use(express.urlencoded({extended:false}))
app.use(express.json())


//Routes
app.use("/todo", todoRouter)

//server start 
app.listen(port,()=>console.log("server started "))
const {dbConnection} = require('./database.js')
const express  =require('express');
const path  =require('path')
const dotenv =require('dotenv')
const cors  =require('cors')
const postRouter = require('./routes/posts.js')
const userRouter = require('./routes/users.js')
//config env
dotenv.config()
const PORT = process.env.PORT

const app = express();

//middleware 
app.use(express.json());
app.use(cors())
app.use('/uploads', express.static(path.join(__dirname,'uploads') ) )

//dbconnection
dbConnection() 

//routers
app.use('/social',postRouter)
app.use('/user',userRouter)



 
//listen the server
app.listen(PORT,()=>console.log(`server starting in localhost:${PORT}`))

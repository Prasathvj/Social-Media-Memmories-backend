import express from 'express'
import dbConnection from './database.js';
import postRouter from './routes/posts.js';
import userRouter from "./routes/users.js"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import dotenv from 'dotenv'
import cors from 'cors'

//config env
dotenv.config()
const PORT = process.env.PORT
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

//middleware 
app.use(express.json());
app.use(cors())
//routers
app.use('/social', postRouter)
app.use('/user',userRouter)
app.use('/uploads', express.static(path.join(__dirname,'uploads') ) )

//dbconnection
dbConnection() 
 
//listen the server
app.listen(PORT,()=>console.log(`server starting in localhost:${PORT}`))

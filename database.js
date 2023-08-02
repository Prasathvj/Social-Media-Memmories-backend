import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
const MongoURL = process.env.MongoURL
const dbConnection = ()=>{
    const params = {
        useNewUrlParser: true,
        useUnifiedTopology :true
    }
    try {
        mongoose.connect(MongoURL,params)
        console.log("Database Connected Successfully")
    } catch (error) {
        console.log(error)
    }
}
export default dbConnection; 
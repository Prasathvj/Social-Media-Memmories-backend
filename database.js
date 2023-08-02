const mongoose = require('mongoose');
const dotenv = require('dotenv');
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
module.exports = {dbConnection}
const mongoose=require('mongoose')
const dotenv=require('dotenv')

dotenv.config()

const connectDB=async()=>{
    try{
        const conn = await mongoose.connect(process.env.murl)
        console.log(`Mongo DB connected: ${conn.connection.host}`)
    }catch(err){
        console.log(`MongoDB Connection : ${err}`)
    }
}

module.exports = connectDB;

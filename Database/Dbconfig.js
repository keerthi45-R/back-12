const mongoose =require('mongoose')

require('dotenv').config()

mongoose.connect(process.env.Mongo_URL)
.then(()=>console.log('MongoDB Connected'))
.catch((err)=>console.log(err))

module.exports =mongoose
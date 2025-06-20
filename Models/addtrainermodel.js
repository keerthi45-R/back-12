const {Schema,model} =require('mongoose')

const SampleSchema = new Schema({
    name:{type:String},
    mobileno:{type:Number},
    email:{type:String},
    salary:{type:String},
   
})

module.exports =model('trainer',SampleSchema)
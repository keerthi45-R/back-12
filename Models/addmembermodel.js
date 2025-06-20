const {Schema,model} =require('mongoose')

const SampleSchema = new Schema({
    name:{type:String},
    age:{type:Number},
    weight:{type:Number},
    gender:{type:String},
    address:{type:String},
    image:{type:String}
})

module.exports =model('member',SampleSchema)
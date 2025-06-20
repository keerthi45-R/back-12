const {Schema,model} =require('mongoose')

const SampleSchema = new Schema({
    Dietid:{type:Number},
    name:{type:String},
    food:{type:String},
    calories:{type:String},
 
   
})

module.exports =model('diet',SampleSchema)
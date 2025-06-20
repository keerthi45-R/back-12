const { Schema, model } = require('mongoose');

const SampleSchema = new Schema({
    Trainername: { type: String },
    Membername: { type: String },
    Date: { type: Number },
});

module.exports = model('Allocate', SampleSchema);

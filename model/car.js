const mongoose = require('mongoose')
const Schema = mongoose.Schema

var Car = new Schema({
    carName: String,
    images: String,
    quantity: String,
    price:String,
    date: String,
})

module.exports = mongoose.model('Car', Car)
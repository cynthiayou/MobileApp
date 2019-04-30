var mongoose = require('mongoose');
var productSchema = new mongoose.Schema({
    "name": String,
    "brand": String,
    "memory": Number,
    "image": String,
    "price": Number,
    "inventory": Number,
    "description": String,
    "color": String
});
module.exports = mongoose.model('product', productSchema);
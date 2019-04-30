var mongoose = require('mongoose');

var mongoose_delete = require('mongoose-delete');

var productSchema = new mongoose.Schema({
    "name": String,
    "brand": String,
    "memory": Number,
    "image": String,
    "price": Number,
    "inventory": Number,
    "description": String,
    "color": String,
    "deleted": {
        type: Boolean,
        default: false
    }
});

productSchema.plugin(mongoose_delete);

module.exports = mongoose.model('product', productSchema);
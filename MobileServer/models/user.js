const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    // userId: {
    //     type: String,
    //     required: true
    // },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    userPwd: {
        type: String,
        required: true
    },
    orderList: {
        type: Array,
    },  
    cartList: [{
        _id: String,
        name: String,
        price: String,
        image: String,
        inventory: Number,
        checked: String,
        productNum:String
    }],
    addressList: {
        type: Array
    }
})
module.exports = mongoose.model('User', userSchema);
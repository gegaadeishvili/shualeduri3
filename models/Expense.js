const {Schema, model} = require('mongoose')

const schema = Schema({
    title: {
        type: String,
        required: true
    },
    money_amount: {
        type: Number,
        default: 1
    },
    category:{
        type: String
    }

})

module.exports = model('Expense', schema)
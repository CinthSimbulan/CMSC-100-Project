const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
    productId: { type: String, required: true },
    orderQuantity: { type: Number, required: true },
    orderStatus: { type: Number, enum: [0, 1, 2], required: true },
    email: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
})

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction
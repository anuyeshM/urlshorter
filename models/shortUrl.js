const mongoose = require('mongoose')
const shortId = require('shortid')

shortId.generate()
const shortUrlSchema = new mongoose.Schema({
    full:{
        type: 'string',
        required: true,


    },
    short:{
    type: String,
    required: true,
    default: shortId.generate()
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    }
})
module.exports = mongoose.model('shortUrl',shortUrlSchema)
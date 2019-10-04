const mongoose = require('mongoose');


const configs = require("../config/config");

const SpotSchema = new mongoose.Schema({
    thumbnail: String,
    company: String,
    techs: [String],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    toJSON: {
        virtuals: true
    }
})

SpotSchema.virtual('thumbnail_url').get(function () {
  return  `http://${configs.serverIP}:3333/files/${this.thumbnail}`
});
module.exports = mongoose.model('Spot', SpotSchema)
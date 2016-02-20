var mongoose = require('mongoose');

var thingSchema = new mongoose.Schema({
	desc: String
})

module.exports = mongoose.model('Thing', thingSchema);
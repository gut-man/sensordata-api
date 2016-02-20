var mongoose = require('mongoose');

var thingSchema = new mongoose.Schema({
	id: Number,
	desc: String
})

module.exports = mongoose.model('Thing', thingSchema);
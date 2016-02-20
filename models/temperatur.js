var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ThingId = Schema.ObjectId;

var temperaturSchema = new mongoose.Schema({
	thing_id: ThingId,
	sensor_id: int,
	value: float,
	date: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Temperatur', temperaturSchema);

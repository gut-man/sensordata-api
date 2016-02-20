var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ThingId = Schema.ObjectId;

var gyroSchema = new mongoose.Schema({
	thing_id: ThingId,
	sensor_id: Number,
	value_x: Number,
	value_y: Number,
	value_z: Number,
	date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Gyro', gyroSchema);
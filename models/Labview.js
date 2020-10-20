const mongoose = require('mongoose')

const labView = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    RestingHeartRate: String,
    BloodOxygenSaturation: String,
    BodyTemperature: String,
    timeStamp: Date
});

module.exports = mongoose.model("LabView", labView);
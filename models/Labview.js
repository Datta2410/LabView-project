const mongoose = require('mongoose')

const labView = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    UserId:String,
    RestingHeartRate: String,
    BloodOxygenSaturation: String,
    BodyTemperature: String,
    timeStamp: Date,
    condition:String,
});

module.exports = mongoose.model("LabView", labView);
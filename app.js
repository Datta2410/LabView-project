const express = require('express')
const Labview = require('./models/Labview')
const mongoose = require('mongoose')
    mongoose.connect("mongodb+srv://glitch:GlItCh@cluster0.tbjsd.mongodb.net/LABVIEW",{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify:false
})


const app = express()
app.use(express.json())//express.json() automatically parses the incoming JSON data
const port = process.env.PORT || 3000

    app.post('/labview', async (req, res) => {
        try{console.log(req.body)
        const labView = new Labview({
            _id: mongoose.Types.ObjectId(),
            RestingHeartRate: req.body.RestingHeartRate,
            BloodOxygenSaturation: req.body.BloodOxygenSaturation,
            BodyTemperature: req.body.BodyTemperature,
            timeStamp: Date.now()
        })
        await labView.save()
        res.json(labView)
        }catch(e){
            console.log(e)
            res.status(500).json(e)
        }
    })
app.get('/labview',async (req, res) => {
    try{const allReadings = await Labview.find({})
    res.status(200).json(allReadings)
    }
    catch(e){
        res.status(500).json(e)
    }
})
app.listen(port,()=>{
    console.log('sever is up on port '+ port)
}) 
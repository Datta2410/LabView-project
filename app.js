const express = require('express')
const Labview = require('./models/Labview')
const path = require('path')
const mongoose = require('mongoose')
    mongoose.connect("mongodb+srv://glitch:GlItCh@cluster0.tbjsd.mongodb.net/LABVIEW",{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify:false
})


const app = express()

const publicDir = path.join(__dirname,'./public')
app.use(express.static(publicDir))

const viewsDir = path.join(__dirname,'./views') 
app.set('view engine', 'ejs') 
app.set('views', viewsDir)

app.use(express.json())//express.json() automatically parses the incoming JSON data
const port = process.env.PORT || 3000
const between = (x, min, max) => {
    return (x > min && x <= max)
  }
const notBetween = (x, min, max) => {
return (x < min || x > max)
}
app.post('/labview', async (req, res) => {
    try{
        let condition
        if(between(req.body.RestingHeartRate, 70, 100) 
            && between(req.body.BloodOxygenSaturation, 95, 100)
            && between(req.body.BodyTemperature, 97, 99)){
            condition = 'Healthy'
        }
        if(notBetween(req.body.RestingHeartRate, 60, 100)
                ||(req.body.BloodOxygenSaturation <95)
                || notBetween(req.body.BodyTemperature, 97, 99)){
                    condition = 'Mild'
        }
        if( notBetween(req.body.RestingHeartRate, 45, 120) 
                || (req.body.BloodOxygenSaturation <85)
                || notBetween(req.body.BodyTemperature, 95, 100.4)){
                    condition = 'Severe'
        }
        const labView = new Labview({
        _id: mongoose.Types.ObjectId(),
        UserId:req.body.UserId,
        RestingHeartRate: req.body.RestingHeartRate,
        BloodOxygenSaturation: req.body.BloodOxygenSaturation,
        BodyTemperature: req.body.BodyTemperature,
        timeStamp: Date.now(),
        condition: condition
    })
    await labView.save()
    res.json(labView)
    }catch(e){
        console.log(e)
        res.status(500).json(e)
    }
})
app.get('/',async (req, res) => {
    try{const allReadings = await Labview.find({})
    res.render('home', {allReadings})
    }
    catch(e){
        console.log(e)
        res.status(500).json(e)
    }
})
app.get('/userRead',async (req, res) => {
    try{const allReadings = await Labview.find({UserId:req.query.UserId})
    res.render('home', {allReadings})
    }
    catch(e){
        console.log(e)
        res.status(500).json(e)
    }
})
app.listen(port,()=>{
    console.log('server is up on port '+ port)
}) 
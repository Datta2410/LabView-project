const mongoose = require('mongoose')


const Tasks = mongoose.model('tasks',{
    description: {
        type:String,
        required: true,
        trim: true
    },
    completed: {
        type : Boolean,
        default: false,

    }
})


module.exports = Tasks
const mongoose = require('mongoose')
//const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/LABVIEW',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify:false
})

//  //save the data in the db
// const datta = new user({
//     name: 'this is a test',
//     email: 'YAYATHI2000@gmail.com',
//     password: 'wordPAssRd123/'
// }).save().catch(error => console.log(error)).then(result => console.log(result))



// // to add a new document to the tasks collection
// new Tasks({
//     description: 'this is a task',
//     // completed: false
// }).save().catch(error => console.log(error)).then(result => console.log(result))
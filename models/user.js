const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//require('D:\js\tasks-app\src\db\mongoose.js')//makes sure that mongoose.js runs hance mongoose connects to the dbV

const userSchema = new mongoose.Schema({
    name:{//defines the data type of the name field in the db
        type: String,
        required: true,
        trim: true

    },
    age: {//defines the data type of the age field in the db
        type: Number,
        validate(value){
            if(value<0){
                throw new Error('age must be greater than 0')
            }
        }       
    },
    email:{
        type:String,
        required:true,
        trim: true,
        lowercase: true,
        unique: true,
        validate(value){
            if (!validator.isEmail(value)){
                throw new Error('invalid Email')
            }
        }
    },
    password: {
        type: String,
        required : true,
        trim : true,
        minlength: 7,
        validate(value){
           
             if(value.toLowerCase().includes('password')){//password temporarily made lower case to make a case isensitive match with "password"
               // console.log(validator.contains(value,'password'))
                throw new Error('password must not contain "password"')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]

})

userSchema.methods.generateAuthToken = async function () {
    const user = this 
    const token = jwt.sign({_id: user._id.toString()}, '0oeXIMqOQV00KQBRpND9fCkEutoaMuEAwcDoNCVr73RRfiPTScjI_ZKu5Y01VabmRDRGZ6yrEg0Y7-2hPBsS9IvrsuvPkAPtHPxSCqFaYeIbUEpqCoXzb_av-X_VGnO_r6Bv9NykIY8JbdJSD0yNFCQFBxVOdP_8-Y8D396tI6tG-eViFoPDk4xYiCRcu4HF9lX0gynL1mJSxDuvVngj0BLFlmrGgreIODwv8lHnhV43ueujWeVY7ltz2Vrpm5C1t5VXoqF22Han2id1g6ja7J3ZBtYWMRINNxQGYu9O7vb1nQlmEptu33YxlwC22CIpPqMhkZEO5vEMeSdQ')
    
    user.tokens = user.tokens.concat({token})

    await user.save()

    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user){
        throw new Error('No user Found')
    }

    const match = await bcrypt.compare(password, user.password)
    if(!match){
        throw new Error('Wrong Email or Password')
    }

    return user
}

userSchema.pre('save', async function (next) {
    
    const user = this
    
    if (user.isModified('password')){

        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})


const User = mongoose.model('Users', userSchema)

//  //save the data in the db
// const datta = new user({
//     name: 'meowwww',
//     email: 'yeeeeehaw2000@gmail.com',
//     password: 'wordPAssRd123/'
// }).save().catch(error => console.log(error)).then(result => console.log(result))

module.exports = User
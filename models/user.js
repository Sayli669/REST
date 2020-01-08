const mongoose = require('mongoose')
const validator = require('validator')
const Joi = require('joi');

const User = mongoose.model('User', {
    name: {
        type: String,
        required: false,
        trim: true
    },
    email: {
        type: String,
        required: false,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: false,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    age: {
        type: Number,
        required:false,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a postive number')
            }
        }
    }
})


// const schema = Joi.object().keys({
//     name: Joi.string().min(3).max(30).required(),
//     email: Joi.string().email({ minDomainAtoms: 2 }),
//     password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
//     age:  Joi.number()
// }).with('name', 'email','age').without('password');

// module.exports = schema
module.exports = User
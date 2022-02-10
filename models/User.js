// “_id”: j35nn35hjdksgjkdsgs”,
// “username”: “pritamworld”,
// “firstname”: “pritesh”,
// “lastname”: “Patel”,
// “password”: “What about covid19 vaccine?”
// “createon”: “01-28-2022 18:30 PM”

//Oliver Kmiec
//101247765
//Lab Test 1
//Full Stack Development II

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        index: {
            unique: true
        }
    },
    firstname: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    }
})


const User = mongoose.model("User", UserSchema);
module.exports = User;
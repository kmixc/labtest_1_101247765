// “_id”: 847het8nieigouy4v”,
// “from_user”: “pritamworld”,
// “room”: “covid19”,
// “message”: “What about covid19 vaccine?”
// “date_sent”: “01-28-2021 18:30 PM”

//Oliver Kmiec
//101247765
//Lab Test 1
//Full Stack Development II

const mongoose = require('mongoose');

const GroupMessageSchema = new mongoose.Schema({
    from_user: {
        type: String,
        required: true
    },
    room: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    message: {
        type: String,
        required: true
    },
    date_sent: {
        type: Date,
        default: Date.now
    }
})


const GroupMessage = mongoose.model("GroupMessage", GroupMessageSchema);
module.exports = GroupMessage;
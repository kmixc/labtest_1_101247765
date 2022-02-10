//Oliver Kmiec
//101247765
//Lab Test 1
//Full Stack Development II

const express = require('express')
const privateMessageModel = require('../models/PrivateMessage.js')
const groupMessageModel = require('../models/GroupMessage.js')

const router = express();

router.post('/private_message', async (req, res) => {
    try {
        const messages = await privateMessageModel.find({ fromUsername: req.params.fromUsername })
        res.send(messages)
    } catch (err) {
        res.status(500).send({ error: err.toString() })
    }
})

router.post('/send_private', async (req, res) => {
    const message = new privateMessageModel(req.body)

    try {
        await message.save()
        res.send(message)
    } catch (err) {
        res.status(500).send({ error: err.toString() })
    }
})

router.post('/send_room', async (req, res) => {
    const message = new groupMessageModel(req.body)

    try {
        await message.save()
        res.send(message)
    } catch (err) {
        res.status(500).send({ error: err.toString() })
    }
})

module.exports = router
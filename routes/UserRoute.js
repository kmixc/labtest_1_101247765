const express = require('express');
const userModel = require('../models/User')

const router = express();

router.get('/:username', async (req, res) => {
    const user = await userModel.findOne({ username: req.params.username })
    if (!user) {
        res.status(400).send({ error: "User Does not exist" })
    }

    res.send({ username: user.username, id: user._id, firstname: user.firstname, lastname: user.lastname })
})

router.post('/', async (req, res) => {
    const user = new userModel(req.body)

    try {
        await user.save()
        res.send(user)
    } catch (err) {
        res.status(500).send({ error: err.toString() })
    }
})


module.exports = router
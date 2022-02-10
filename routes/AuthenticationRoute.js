//Oliver Kmiec
//101247765
//Lab Test 1
//Full Stack Development II

const express = require('express');
const userModel = require('../models/User')

const router = express();

router.post('/validate_user', async (req, res) => {
    const user = await userModel.findOne({ username: req.body.username })
    console.log(req.body)
    if (!user) {
        res.status(400).send({ error: "User does not exist." })
        return
    }
    if (user.password != req.body.password) {
        res.status(401).send({ error: "Password incorrect." })
        return
    }

    res.send({ validated: true })
})

module.exports = router
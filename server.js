//Oliver Kmiec
//101247765
//Lab Test 1
//Full Stack Development II

//imports
const express = require('express')
const app = express()
const http = require('http').createServer(app)
const cors = require('cors')
const mongoose = require('mongoose')

//port number
const PORT = 3000

//socket server
const io = require('socket.io')(http)

app.use(cors())

app.use(express.json())

const dotenv = require('dotenv')
dotenv.config()

//routers
const authRouter = require('./routes/AuthenticationRoute.js')
const messageRouter = require('./routes/MessageRoute.js')
const userRouter = require('./routes/UserRoute.js')
const roomRouter = require('./routes/roomRoutes.js')

//using routes
app.use('/auth', authRouter)
app.use('/messages', messageRouter)
app.use('/users', userRouter)
app.use('/rooms', roomRouter)

//mongo connection
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//send user to index
app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

//send user to signup
app.get("/signup", (req, res) => {
    res.sendFile(__dirname + '/signUp.html')
})

io.on('connection', (socket) => {
    console.log('Socket IO connected')

    let roomName = 'General'

    socket.on('message', (data) => {
        console.log(data)
        io.to(roomName).emit('newMessage', data)
    })

    socket.on('writing', (user) => {
        console.log(user + " is writing")
        socket.broadcast.emit('isWriting', user)
    })

    socket.on('stopWriting', (user) => {
        console.log(user + " has stopped writing")
        socket.broadcast.emit('stopWriting', user)
    })

    socket.on('joinroom', (room) => {
        socket.join(room)
        roomName = room
    })

    //Disconnected
    socket.on('disconnect', () => {
        console.log(`${socket.id} disconnected`)
    })
})

//port connection
http.listen(PORT, () => {
    console.log(`Server started at ${PORT}`)
})
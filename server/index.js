const express = require('express')
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./config/connectDB')
const cookiesParser = require('cookie-parser')
const {app , server} = require('./socket/index')

const router = require('./routes/index')


// const app = express()

app.use(cors({
    credentials: true,
    origin: process.env.FRONTENT_URL,
}))

app.use(express.json())
app.use(cookiesParser())

const PORT = process.env.PORT || 8080

app.get('/', (request, response) => {
    response.json({
        massage: "server running"
    })
})

// api end point
app.use("/api",router)

connectDB().then(() => {
    server.listen(PORT, () => {
        console.log("sever running at", PORT)
    })
})



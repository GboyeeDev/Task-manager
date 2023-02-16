
const express = require('express')
const app = express()
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
require('dotenv').config()
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error.handler')



// middleware to receive data from frondend with JSON
app.use(express.static('./public'))
app.use(express.json())

// Routes
app.use('/api/v1/tasks', tasks)

// File Not Found
app.use(notFound)

app.use(errorHandlerMiddleware)


const port = 5000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server running on port ${port}!!`))
    }   catch (error) {
        console.log(error)
    }
}

start()
 

const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const connectDB = require('./config/db')
const { errorHandler } = require('./middleware/errorMiddleware')

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/languages', require('./routes/languageRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/sets', require('./routes/setRoutes'))
app.use('/api/cards', require('./routes/cardRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))

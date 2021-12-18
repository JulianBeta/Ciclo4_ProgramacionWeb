// dependencies
const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const helmet = require('helmet')
// local imports
const userRoutes = require('./routes/userRoutes')
const projectRoutes = require('./routes/projectRoutes')

// app
const app = express()

// middleware
app.use(express.json())
app.use(
  cors({
    origin: '*',
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
)
app.use(helmet())
app.use(
  express.urlencoded({
    extended: true,
  })
)
// DB connection
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) =>
    app.listen(process.env.PORT, () => {
      console.log(`localhost: ${process.env.PORT}`)
    })
  )
  .catch((err) => console.log(err))

// routes
app.get('/', (req, res) => res.send('set up'))
app.use(userRoutes)
app.use(projectRoutes)

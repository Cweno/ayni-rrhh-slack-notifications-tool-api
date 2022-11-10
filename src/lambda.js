const express = require('express')
const cors = require('cors')
require('dotenv').config()


const { birthdayRouter } = require('./routes/birthday/router')
const { announcementRouter } = require('./routes/announcement/router')
const { eventRouter } = require('./routes/event/router')
const { imageRouter } = require('./routes/image/router')

const app = express()

app.use(express.json());
app.use(cors())

// rutas
app.use('/birthdays',birthdayRouter)
app.use('/announcements',announcementRouter)
app.use('/events',eventRouter)
app.use('/imagess',imageRouter)


// app.listen(process.env.APP_PORT, () => {
//   console.log(`App listening on port ${process.env.APP_PORT}`)
// })

const serverless = require("serverless-http");
module.exports.handler = serverless(app);


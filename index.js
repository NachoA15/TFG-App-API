require('./db/mongoose')
const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')

const userRouter = require('./router/userRouter')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

app.use('/', userRouter)

const port = 5001

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
    console.log(`TFG-App-Api`)
})


const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./methods')
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
    response.json({ info: 'endpoint works yay' })
})

app.get('/users', db.getUsers)
app.post('/users', db.createUsers)
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
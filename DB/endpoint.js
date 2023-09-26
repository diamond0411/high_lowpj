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
app.get('/users/:id', db.getUserById)
app.put('/user/:id', db.updateUser)
app.delete('/user/:id', db.deleteUser)
app.post('/scores', db.createScore)
app.get('/scores', db.getScores)
app.get('/score/:id', db.getScores)
app.put('/score/:id', db.updateScore)
app.delete('/score/:id', db.deleteScore)
app.get('/words', db.getFrequency)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
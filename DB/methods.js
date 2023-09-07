const Pool = require('pg').Pool
const pool = new Pool({
  user: 'ethan',
  host: 'localhost',
  password: '12345',
  database: 'high',
  port: 5432,
})

const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
const createUsers = (request, response) => {
  try {
    const {username, icon, password} = request.body
    pool.query('INSERT INTO users(username, password, icon) VALUES ($1, $2, $3)', [username, password, icon], (error, results) => {
      response.status(200).json(results.rows)
    })
    //query (SQL COMMAND, VARIABLES YOUR IMPORTING INTO THE COMMAND)
  }
  catch (error) {
    console.log(error)
  }
}
module.exports = {
    getUsers,
    createUsers
}
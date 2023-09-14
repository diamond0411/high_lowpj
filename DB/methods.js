const Pool = require('pg').Pool
const pool = new Pool({
  user: 'ethan',
  host: 'localhost',
  password: '12345',
  database: 'high',
  port: 5432,
})

const getUsers = async (request, response) => {
  await pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
const getUserById = async (request, response) => {
  const id = request.params.id
  await pool.query('SELECT * FROM users where id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUsers =  async (request, response) => {
  try {
    const {username, icon, password} = request.body
    await pool.query('INSERT INTO users(username, password, icon) VALUES ($1, $2, $3)', [username, password, icon], (error, results) => {
      response.status(200).json(results.rows)
    })
    //query (SQL COMMAND, VARIABLES YOUR IMPORTING INTO THE COMMAND)
  }
  catch (error) {
    console.log(error)
  }
}

const updateUser = async (request, response) => {
  try {
    const id = request.params.id
    const {username, icon, password} = request.body
    await pool.query('UPDATE users SET username = $1, icon = $2, password = $3 where id = $4' , [username, icon, password, id], (error, results)=> {
      response.status(200).json(results.rows)
    })
  } catch(error) {
    console.log(error)
  }
}

const deleteUser = async (request, response) => {
  try {
    const id = request.params.id
    await pool.query('DELETE from users where id = $1', [id], (error, results) => {
      response.status(200).json(results.rows)
    })
  } catch (error) {
    console.log(error);
  }
}

const createScore =  async (request, response) => {
  try {
    const {userid, score} = request.body
    await pool.query('INSERT INTO scores(userid, time, score) VALUES ($1, now(), $2)', [userid, score], (error, results) => {
      response.status(200).json(results.rows)
    })
  }
  catch (error) {
    console.log(error)
  }
}

const getScores = async (request, response) => {
  await pool.query('SELECT * FROM scores ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getScoreById = async (request, response) => {
  const id = request.params.id
  await pool.query('SELECT * FROM scores where id= = $1',[id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}


module.exports = {
    getUsers,
    createUsers,
    getUserById,
    createScore,
    getScores,
    getScoreById,
    updateUser,
    deleteUser
}
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'ethan',
  host: 'localhost',
  password: '12345',
  database: 'high',
  port: 5432,
})
const axios = require('axios')

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
      response.status(200)
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

const updateScore = async (request, response) => {
  try {
    const id = request.params.id
    const {userid, score} = request.body
    await pool.query('UPDATE scores set userid = $1, time = now(), score = $2 where id = $3', [userid, score, id], (error, results) => {
      response.status(200).json(results.rows)
    })
  } catch (error) {
    console.log(error)
  }
}

const deleteScore = async(request, response) => {
  try {
    const id = request.params.id
    await pool.query('DELETE from scores where id = $1', [id], (error, results) => {
      response.status(200).json(results.rows)
    })
  } catch (error) {
    console.log(error)
  }
}
const regex = /{.*?"ngram":\s*"[^"]*",\s*"parent":\s*"[^"]*",\s*"type":\s*"NGRAM",\s*"timeseries":\s*\[.*?\]\s*}/gi;
const getFrequency = async(request, response) => {
  try {
    const {word1, word2, start, end} = request.body
    const words = word1 + ", " + word2
    const resp = await fetch(`https://books.google.com/ngrams/graph?content=${words}&year_start=${start}&year_end=${end}&corpus=en-2019&smoothing=0`);
    const responseText = await resp.text();
    const match = responseText.match(regex)
    const freq1 = JSON.parse(match[0])["timeseries"][0];
    const freq2 = JSON.parse(match[1])["timeseries"][end-start];
    const out = {freq1, freq2, "greater": (freq1>freq2)?"yes":"no"}
    response.status(200).json(out); 
    
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
    getUsers,
    createUsers,
    getUserById,
    createScore,
    getScores,
    getScoreById,
    updateUser,
    deleteUser,
    updateScore,
    deleteScore,
    getFrequency
}
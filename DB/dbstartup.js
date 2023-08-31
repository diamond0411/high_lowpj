const Pool = require('pg').Pool
const pool = new Pool({
  user: 'ethan',
  host: 'localhost',
  password: '12345',
  database: 'high',
  port: 5432,
})

async function a() {
  await pool.query('CREATE TABLE users(id serial primary key, username varchar(255) NOT NULL, password VARCHAR(255) NOT NULL, icon VARCHAR(255));', (error, results) => {
      if (error) {
          throw error
      }
      console.log(results.rows)
  })
}
a()

async function b() {
  await pool.query('CREATE TABLE scores(id serial primary key, userid int, time timestamp, score int, constraint a foreign key(userid) references users(id));', (error, results) => {
      if (error) {
          throw error
      }
      console.log(results.rows)
  })
}
b()
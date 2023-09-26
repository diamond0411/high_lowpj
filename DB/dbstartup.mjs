const Pool = require('pg').Pool
const pool = new Pool({
  user: 'ethan',
  host: 'localhost',
  database: 'high',
  password: '12345',
  port: 5432,
})

await pool.query('CREATE TABLE users(id int primary key, username varchar(255) NOT NULL, password VARCHAR(255) NOT NULL, icon VARCHAR(255);', (error, results) => {
    if (error) {
        throw error
    }
    print(resultss)
})
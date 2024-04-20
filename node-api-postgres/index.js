const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const { Pool } = require('pg')
const port = 3000

const pool = new Pool({//client
  user: 'me',
  host: 'localhost', //remote server
  database: 'api',
  password: 'password',
  port: 5432,//remote server port
},
);

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {

  getUsers(request, response)
  //getUserById(request, response)
    //response.json({ info: 'Node.js, Express, and Postgres API' })
  })

app.listen(3000, () => {
console.log(`App running on port ${port}.`)
})

app.get('/test', (request, response) => {
  
    response.json({ info: 'here is test'})
  })


console.log(555)



console.log(1111)

const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC',
   (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
   })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const db = require('./queries')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const { Pool } = require('pg')
const { response } = require('express')
const port = 3001

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

  //getUsers(request, response)

  response.send('<h1>Form</h1>'+
  "<form method='post' action='/users'>" +
  "Name:<input name='name'/>"+
  "email:<input name='email'/>"+
  "<input type='submit' name='submit'/>"+
  "</form>"
  );
  //getUserById( { params: { id: 1 }}, response);
    //response.json({ info: 'Node.js, Express, and Postgres API' })
  })


app.listen(port, () => {
console.log(`App running on port ${port}.`)
})

app.get('/test', (request, response) => {
  getUserById( { params: { id: 1 }}, response);
  
    //response.json({ info: 'here is test'})
  });
console.log(555)


app.post('/users', ( request, response) => {
console.log(request.body)
  createUser(request.body.name, request.body.email, response)
})
app.post('/updateusers', ( request, response) => {
  updateUser(request, response)
  })

app.get('/deleteusers', ( request, response) => {
  deleteUser(request, response)
  })
  


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



const createUser = (name, email, response) => {
  //const { name, email } = {name, email}
console.log( name, email )
  pool.query('INSERT INTO users (name, email) VALUES (\'' + name +'\', \'' + email +'\') ', (error, results) => {
    if (error) {
      //throw error
      console.error('Error executing query:', error);
    }
    response.status(200).send(`User added Success: `)
  })
}
const updateUser = (request, response) => {

  const id = request.body.id
  const name = request.body.name
  const email = request.body.email

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {

      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.query.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}
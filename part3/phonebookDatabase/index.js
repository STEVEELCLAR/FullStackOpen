const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

// Define custom Morgan token to log request body for POST requests
morgan.token('req-body', (req, res) => JSON.stringify(req.body));

// Create Morgan middleware instance with custom format for POST requests
const postLogger = morgan(':method :url :status :res[content-length] - :response-time ms :req-body');

// Apply Morgan middleware globally
app.use((req, res, next) => {
  // Conditionally use custom format for POST requests, otherwise use 'tiny' format
  if (req.method === 'POST') {
    postLogger(req, res, next);
  } else {
    morgan('tiny')(req, res, next);
  }
});

//database
if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.urucgsa.mongodb.net/Persons?retryWrites=true&w=majority&appName=Cluster0`

  mongoose.set('strictQuery',false)

  mongoose.connect(url)
  
  const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    id: String
  })
  
  const Person = mongoose.model('Person', personSchema)


  app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
      response.json(persons)
    })
  })

  // app.get('/info', (request, response) => {
  //   const currentTime = new Date().toString()

  //   response.send(`
  //       <p>Phonebook has infor for ${persons.length} person</p>
  //       <p>${currentTime}</p>
  //   `)
  //   console.log(formattedTime)
  // })

  app.get('/api/persons/:id', (request, response) => {

    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })


  app.post('/api/persons', (request, response) => {
    const body = request.body
     
    const person = new Person({
      name: `${body.name}`,
      number: `${body.number}`,
      id: Math.random(),
    })
      
    person.save().then(result => {
      console.log(`Add ${body.name} number ${body.number} to phonebook`)
      // mongoose.connection.close()
      response.json(person)
    })
  
  })



  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
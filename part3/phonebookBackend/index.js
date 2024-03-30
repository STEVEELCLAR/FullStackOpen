const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

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
let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

  
  app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

  app.get('/info', (request, response) => {
    const currentTime = new Date().toString()

    response.send(`
        <p>Phonebook has infor for ${persons.length} person</p>
        <p>${currentTime}</p>
    `)
    console.log(formattedTime)
  })

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
    const personName = persons.find(person => person.name === body.name)
    if (!body.name || !body.number) {
      return response.status(400).json({ 
        error: 'Both name and number are required' 
      })
    }    
    else if (personName) {
        return response.status(400).json({ 
          error: 'name must be unique' 
        })
      }   
    
  
    const person = {
      name: body.name,
      number: body.number,
      id: Math.random(),
    }
  
    persons = persons.concat(person)
  
    response.json(person)
  })



  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
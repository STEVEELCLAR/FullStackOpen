require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./models/person')

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))


morgan.token('req-body', (req, res) => JSON.stringify(req.body));

const postLogger = morgan(':method :url :status :res[content-length] - :response-time ms :req-body');

app.use((req, res, next) => {
  if (req.method === 'POST') {
    postLogger(req, res, next);
  } else {
    morgan('tiny')(req, res, next);
  }
});

//database


  app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
      response.json(persons)
    })
  })

  app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id)
      .then(person => {
  
        if (person) {
          response.json(person)
        } else {
          response.status(404).end()
        }
      })
  
      .catch(error => {
        console.log("error",error)
        response.status(400).send({ error: 'malformatted id' })
      })
  })

  app.delete('/api/persons/:id', (request, response, next) => {
    console.log("id", request.params.id)
    Person.findByIdAndDelete(request.params.id)
      .then(document =>{
        console.log("document", document)
        response.status(204).end()
      })
      .catch(error => {
        console.error("Error deleting person:", error);
        next(error);
      })
      
  })


  app.get('/info', (request, response) => {
    const currentTime = new Date().toString()
    console.log("person", Person)

    response.send(`
        <p>Phonebook has information for ${Person.length-1} person</p>
        <p>${currentTime}</p>
    `)
  })

  app.post('/api/persons', (request, response, next) => {
    const body = request.body
     
    const person = new Person({
      name: `${body.name}`,
      number: `${body.number}`,
    })
      
    person.save().then(result => {
      console.log(`Add ${body.name} number ${body.number} to phonebook`)
      response.json(person)
    })
    .catch(error => next(error))
  
  })

  app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
  
    const person = {
      name: body.name,
      number: body.number,
    }
  
    Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true, context: 'query' })
      .then(updatedPerson => {
        response.json(updatedPerson)
      })
      .catch(error => next(error))
  })


  const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    }
   
  
    next(error)
  }
  
  // this has to be the last loaded middleware, also all the routes should be registered before this!
  app.use(errorHandler)

  const PORT = process.env.PORT
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
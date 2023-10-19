require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const app = express()

morgan.token('post-body', (req, res) => JSON.stringify(req.body))

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :post-body"))

app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then(resp => {
      res.json(resp)
    })
    .catch(err => next(err))
})

app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person.findById(id)
    .then(note => {
      if (note) {
        console.log(note);
        res.json(resp)
      } else {
        res.status(404).end()
      }
    })
    .catch(err => next(err))
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "Cannot have empty name or number fields"
    })
  }
  const person = new Person({
    name: body.name,
    number: body.number
  })
  person.save()
    .then(resp => {
      console.log(resp);
      res.status(201).json(resp)
    })
    .catch(err => next(err))
})

app.put('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  const body = req.body
  const person = {
    name: body.name,
    number: body.number
  }
  Person.findByIdAndUpdate(id, person, {new: true})
    .then(resp => {
      res.json(resp)
    })
    .catch(err => next(err))
})

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person.findByIdAndRemove(id)
    .then(resp => {
      res.status(214).end()
    })
    .catch(err => next(err))
})

const unknownEndPoint = (req, res, next) => {
  res.status(404).send({error: 'Unknown endpoint'})
}

app.use(unknownEndPoint)

const errorHandler = (err, req, res, next) => {
  if (err.name === 'CastError') {
    return res.status(400).send({error: 'malformatted id'})
  }
  next(err)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Listening on port ${PORT}`);


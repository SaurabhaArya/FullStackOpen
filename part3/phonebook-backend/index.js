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

app.get('/api/persons', (req, res) => {
  Person.find({})
    .then(resp => {
      res.json(resp)
    })
    .catch(err => console.log(err))
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  Person.findById(id)
    .then(resp => {
      res.json(resp)
    })
    .catch(err => {
      console.log(err);
      res.status(404).end()
    })
})

app.post('/api/persons', (req, res) => {
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
    .catch(err => console.log(err))
})

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  Person.findByIdAndRemove(id)
    .then(resp => {
      res.status(214).end()
    })
    .catch(err => console.log(err))
})

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Listening on port ${PORT}`);

